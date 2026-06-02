#!/usr/bin/env python3
"""
WordPress portfolio data extractor for Approach Media.

Two modes:
  1. --xml   : Parse a WordPress WXR export file (Tools → Export from WP Admin)
  2. --url   : Crawl the live WordPress site via REST API + HTML scraping

Output: project_import_template.csv  (ready to feed into import_projects.py)

Usage (WXR export — RECOMMENDED):
    python wp_scraper.py --xml wordpress-export.xml --post-type portfolio

Usage (live site crawl — use only if you cannot access WP Admin):
    pip install requests beautifulsoup4 lxml
    python wp_scraper.py --url https://your-wordpress-site.com

Tips:
  - In WordPress Admin go to Tools → Export → select "Portfolio" (or "Posts" if
    your projects are regular posts) → Download Export File
  - The WXR approach is faster and more complete than web scraping
  - After generating the CSV, manually fill in image URLs and any missing fields
    before running import_projects.py
"""

import argparse
import csv
import json
import os
import re
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    requests = None
    BeautifulSoup = None


# ── helpers ────────────────────────────────────────────────────────────────────

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    return "exhibition-stall-design-" + text.strip("-")


def strip_html(html: str) -> str:
    if not html:
        return ""
    class _Parser(HTMLParser):
        def __init__(self):
            super().__init__()
            self.chunks = []
        def handle_data(self, data):
            self.chunks.append(data)
    p = _Parser()
    p.feed(html)
    return " ".join(p.chunks).strip()


CSV_FIELDS = [
    "title", "slug", "client_name", "exhibition_name", "venue_name",
    "city", "country", "stall_area_sqm", "stall_area_sqft",
    "stall_height_m", "floors", "build_year",
    "description", "design_brief", "ai_summary", "design_style",
    "materials_used", "special_features", "awards",
    "industries", "stall_types",
    "status", "is_featured", "display_order",
    "meta_title", "meta_description", "og_title", "og_description",
    "hero_image_url", "hero_image_alt", "hero_image_caption",
    "gallery_images",
]


def blank_row() -> dict:
    return {f: "" for f in CSV_FIELDS}


# ── WXR parser ─────────────────────────────────────────────────────────────────

WP_NS = {
    "wp":      "http://wordpress.org/export/1.2/",
    "content": "http://purl.org/rss/1.0/modules/content/",
    "excerpt": "http://wordpress.org/export/1.0/excerpt/",
    "dc":      "http://purl.org/dc/elements/1.1/",
}

def parse_wxr(xml_path: str, post_type: str) -> list[dict]:
    tree = ET.parse(xml_path)
    root = tree.getroot()
    channel = root.find("channel")
    rows = []

    for item in channel.findall("item"):
        pt = item.findtext("wp:post_type", namespaces=WP_NS)
        if pt != post_type:
            continue
        status = item.findtext("wp:status", namespaces=WP_NS)
        if status not in ("publish", "draft"):
            continue

        title   = item.findtext("title") or ""
        wp_slug = item.findtext("wp:post_name", namespaces=WP_NS) or slugify(title)
        content = item.findtext("content:encoded", namespaces=WP_NS) or ""
        excerpt = item.findtext("excerpt:encoded", namespaces=WP_NS) or ""

        # Custom fields
        meta = {}
        for pm in item.findall("wp:postmeta", namespaces=WP_NS):
            key = pm.findtext("wp:meta_key",   namespaces=WP_NS) or ""
            val = pm.findtext("wp:meta_value",  namespaces=WP_NS) or ""
            meta[key] = val

        # Featured image (stored as _thumbnail_id, needs second pass — skip for now)
        hero_url = meta.get("_thumbnail_url") or meta.get("hero_image_url") or ""

        row = blank_row()
        row.update({
            "title":       title,
            "slug":        slugify(wp_slug),
            "description": strip_html(content),
            "design_brief":strip_html(excerpt),
            # Common ACF / custom field names — adjust to match your WP site
            "client_name":      meta.get("client_name")    or meta.get("_client") or "",
            "exhibition_name":  meta.get("exhibition")     or meta.get("_show")   or "",
            "venue_name":       meta.get("venue")          or "",
            "city":             meta.get("city")            or "",
            "country":          meta.get("country")         or "India",
            "stall_area_sqm":   meta.get("stall_area_sqm") or meta.get("area_sqm") or "",
            "stall_area_sqft":  meta.get("stall_area_sqft") or "",
            "stall_height_m":   meta.get("stall_height_m") or meta.get("height_m") or "",
            "floors":           meta.get("floors")          or "1",
            "build_year":       meta.get("build_year")      or meta.get("year")    or "",
            "design_style":     meta.get("design_style")    or "",
            "materials_used":   meta.get("materials_used")  or "",
            "special_features": meta.get("special_features") or "",
            "hero_image_url":   hero_url,
            "status":           "published" if status == "publish" else "draft",
            "is_featured":      meta.get("is_featured") or "false",
        })
        rows.append(row)
        print(f"  Found: {title}")

    return rows


# ── REST API / HTML scraper ───────────────────────────────────────────────────

def crawl_wp_rest(base_url: str, post_type: str = "portfolio") -> list[dict]:
    if requests is None:
        sys.exit("Install requests + beautifulsoup4: pip install requests beautifulsoup4 lxml")

    base_url = base_url.rstrip("/")
    rows = []
    page  = 1

    while True:
        api_url = f"{base_url}/wp-json/wp/v2/{post_type}?per_page=100&page={page}&_embed"
        try:
            resp = requests.get(api_url, timeout=20)
        except Exception as e:
            print(f"  Request failed: {e}")
            break

        if resp.status_code == 404:
            # Try 'posts' as fallback
            if post_type == "portfolio":
                print("  /portfolio endpoint not found, trying /posts...")
                return crawl_wp_rest(base_url, "posts")
            print(f"  REST API not available or post type '{post_type}' not found.")
            break

        if resp.status_code != 200:
            print(f"  HTTP {resp.status_code} — stopping.")
            break

        items = resp.json()
        if not items:
            break

        for item in items:
            title   = item.get("title", {}).get("rendered", "")
            wp_slug = item.get("slug", slugify(title))
            content = strip_html(item.get("content", {}).get("rendered", ""))
            excerpt = strip_html(item.get("excerpt", {}).get("rendered", ""))

            # Featured image from _embedded
            hero_url = ""
            embedded = item.get("_embedded", {})
            wp_media = embedded.get("wp:featuredmedia", [{}])
            if wp_media and isinstance(wp_media[0], dict):
                hero_url = wp_media[0].get("source_url", "")

            # ACF fields (Advanced Custom Fields plugin)
            acf = item.get("acf", {}) or {}

            row = blank_row()
            row.update({
                "title":            title,
                "slug":             slugify(wp_slug),
                "description":      content,
                "design_brief":     acf.get("design_brief") or excerpt,
                "client_name":      acf.get("client_name")    or "",
                "exhibition_name":  acf.get("exhibition")     or "",
                "venue_name":       acf.get("venue")          or "",
                "city":             acf.get("city")            or "",
                "country":          acf.get("country")         or "India",
                "stall_area_sqm":   str(acf.get("stall_area_sqm",  "")) or "",
                "stall_area_sqft":  str(acf.get("stall_area_sqft", "")) or "",
                "stall_height_m":   str(acf.get("stall_height_m",  "")) or "",
                "floors":           str(acf.get("floors", "1")),
                "build_year":       str(acf.get("build_year", "")) or "",
                "design_style":     acf.get("design_style") or "",
                "materials_used":   acf.get("materials_used") or "",
                "hero_image_url":   hero_url,
                "hero_image_alt":   title + " exhibition stall",
                "status":           "published" if item.get("status") == "publish" else "draft",
                "is_featured":      "true" if item.get("sticky") else "false",
                "display_order":    str(item.get("menu_order", 0)),
            })

            # Gallery images from ACF gallery field
            gallery_items = acf.get("gallery") or acf.get("photo_gallery") or []
            if isinstance(gallery_items, list) and gallery_items:
                gallery_parts = []
                for g in gallery_items:
                    if isinstance(g, dict):
                        url = g.get("url") or g.get("sizes", {}).get("large", "")
                        alt = g.get("alt") or g.get("title") or title
                        cap = g.get("caption") or ""
                        gallery_parts.append(f"{url}|{alt}|{cap}")
                row["gallery_images"] = ";;".join(gallery_parts)

            rows.append(row)
            print(f"  Found: {title}")

        total_pages = int(resp.headers.get("X-WP-TotalPages", 1))
        if page >= total_pages:
            break
        page += 1

    return rows


# ── main ───────────────────────────────────────────────────────────────────────

def write_csv(rows: list[dict], out_path: str):
    with open(out_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=CSV_FIELDS)
        writer.writeheader()
        writer.writerows(rows)
    print(f"\nWrote {len(rows)} row(s) to {out_path}")
    print("Next step: review the CSV, fill any blank fields, then run:")
    print("  python import_projects.py --csv project_data_from_wp.csv --env ../.env")


def main():
    parser = argparse.ArgumentParser(description="Extract WordPress portfolio data to CSV")
    g = parser.add_mutually_exclusive_group(required=True)
    g.add_argument("--xml", help="Path to WordPress WXR export .xml file")
    g.add_argument("--url", help="Live WordPress site URL (uses REST API)")
    parser.add_argument("--post-type", default="portfolio",
                        help="WordPress post type slug (default: portfolio)")
    parser.add_argument("--out", default="project_data_from_wp.csv",
                        help="Output CSV filename")
    args = parser.parse_args()

    rows: list[dict] = []

    if args.xml:
        print(f"Parsing WXR file: {args.xml}")
        rows = parse_wxr(args.xml, args.post_type)
    else:
        print(f"Crawling WordPress REST API: {args.url}")
        rows = crawl_wp_rest(args.url, args.post_type)

    if not rows:
        print("No items found. Check --post-type matches your WordPress post type slug.")
        sys.exit(1)

    write_csv(rows, args.out)


if __name__ == "__main__":
    main()
