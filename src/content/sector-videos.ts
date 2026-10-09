/**
 * Every video on the industry pages, from the owner's own export of the
 * channel's playlists (Approach_Media_YouTube_Playlist_Links.xlsx, 2 Oct
 * 2026), "All Videos (Filter)" sheet.
 *
 * Ids and titles are transcribed exactly; nothing here is written or guessed.
 *
 * DUPLICATES. The export carried 190 rows for 179 distinct videos. Ten were
 * the same video listed twice inside one category and are dropped. One,
 * dsplkMd2e6s, appears under both Engineering and Solar — a video genuinely
 * in two playlists — so it is kept on both pages, as the owner has it.
 *
 * A category can feed two pages: Hardware/Doors & Windows/Lighting feeds both
 * Building Materials and Electrical & Lighting, and Cosmetic & Packaging
 * feeds both Cosmetics and Printing & Packaging. A page can be fed by two
 * categories: Machinery takes Engineering plus Ceramic Raw Material, and
 * Building Materials takes Hardware plus Ceramic Tiles.
 *
 * This is the source the pages render. src/lib/youtube.ts can read the same
 * playlists live from the YouTube Data API and takes precedence when
 * YOUTUBE_API_KEY is set, so new uploads appear without another export; with
 * no key, these lists are what shows, and that needs nothing configured.
 */

export type SectorVideo = { id: string; title: string }

/** Industry page slug -> its videos, in the owner's own order. */
export const SECTOR_VIDEOS: Record<string, SectorVideo[]> = {
  // 8 videos
  "pharmaceuticals": [
    { id: "TPJ3vF5_ZDs", title: "iPHEX 2026 Delhi | 9 Exhibition Stalls Delivered | Approach Media" },
    { id: "uDDiogrjLvo", title: "Pharmatech Exhibition Stall Design Agency" },
    { id: "CzpbG6DpsLo", title: "Pharmatech Expo Stall Designer" },
    { id: "5YHF-3_BEVI", title: "Pharmatech Exhibition Stall Deign and Fabrication Agency" },
    { id: "HlHl7w_LHBs", title: "Zeon Pharma Tech Client Review" },
    { id: "LIqsDe1zCSA", title: "Pharma Tech Stall Design And Fabrication Agency  India" },
    { id: "WZkiiIBjQxg", title: "Exhibition Stall Design Agency Pharma Tech India" },
    { id: "ei6akmg0Eig", title: "Pharma tech & Labtech Exhibition Stall Design Agency" },
  ],
  // 10 videos
  "architecture-building-materials": [
    { id: "zgPAqR2L-Jc", title: "Vibrant Ceramics Exhibition Stall Design and Development" },
    { id: "3FJw7Bwh-14", title: "Bluezone Ceramic vibrant ceramics expo" },
    { id: "ZSB8Q-pm9q0", title: "Exhibition Stall Design and Fabrication Agency Vibrant Ceramics" },
    { id: "Sh5DYFGP00w", title: "Exhibition Stall Design and Fabrication Seron wall & vitrified vibrant ceramic expo" },
    { id: "9zQrt28EFm8", title: "Exhibtion Stall Designer Vibrant Ceramics" },
    { id: "giL9GMIWW7w", title: "Exhibition Stall Design Company in Ahmedabad | BNI Symposium 2026 Setup" },
    { id: "IPAUTUdq2ds", title: "ACETECH Exhibition Stall Design & Fabrication for Virtual Lights | Approach Media" },
    { id: "UnG3B_s2HdE", title: "Zak Doors & Windows 2025 | Hiwik | Stall Design & Fabrication" },
    { id: "7dss1stCBFE", title: "IFSEC - Voltaic Cable  - Exhibition Stall Design & Fabrication Agency" },
    { id: "_yhIpxJhixo", title: "Approach Media Pvt. Ltd.  Exhibition Stall Design Agency" },
  ],
  // 46 videos
  "real-estate": [
    { id: "1s67kAnv5Tg", title: "Modern Property Expo Stall Design Ahmedabad | Serenity Status Booth by Approach Media" },
    { id: "EzJWiIQwliA", title: "Luxury Property Expo Stall Design Ahmedabad | BR Ekayan Exhibition Booth by Approach Media" },
    { id: "36dzFZNs1CI", title: "Property Expo Stall Design Ahmedabad | Premium Exhibition Booth by Approach Media" },
    { id: "b29nF6wo86E", title: "GIHED 2026 | Shafalya | Stall Design & Fabrication" },
    { id: "TGnDx2EKcTo", title: "🌿 GIHED 2026 | Birdsong by Ratnaakar | Stall Design & Fabrication 🌿" },
    { id: "7yu4_pO6s04", title: "9 Yard GIHED Exhibition Stall Design 2026" },
    { id: "n2UvaUWI0kg", title: "Exhibition Stall Design and Fabrication Property Show Ahmedabad" },
    { id: "LNg8yXIIyVE", title: "Property Expo - Exhibition Stall Design and Fabrication -  Epic Elevator" },
    { id: "F56zwrysd_4", title: "Branding + Exhibition Stall Design" },
    { id: "MSNFOBO6mnM", title: "No 1 Exhibition Stall Design Agency" },
    { id: "L8uXXVmgZXo", title: "Award Winning Exhibition Stall Design Agency" },
    { id: "hQ2AD1tpj-E", title: "Venus GIHED Stall Design And Fabrication Agency" },
    { id: "7HqJOAn8NSA", title: "GIHED Stall Design and Fabrication Agency" },
    { id: "xIpACDoiBQA", title: "Property Expo Stall Design and Fabrication Agency" },
    { id: "CwyvwP4vwFQ", title: "Stall Design and Fabrication Agency" },
    { id: "cIO9TvKJEyg", title: "Award Winning Exhibition Stall Design and Fabrication Agency India" },
    { id: "6rKPteJVxXs", title: "Award Winning Exhibition Stall Design and Fabrication Agency" },
    { id: "Y9AX1wl8SVs", title: "Exhibition Stall Design and Fabrication Agency Bangalore" },
    { id: "KaMUUWIXj50", title: "Exhibition Stand Design and Fabrication Agency Ahmedabad" },
    { id: "kxMPDdnZz38", title: "Exhibition Stand Design and Fabrication Agency Delhi" },
    { id: "l1vNJWr13mM", title: "Exhibition Stand Design and Fabrication Agency India" },
    { id: "l4j1wb4m4VQ", title: "Award Winning Stall Design and Fabrication Agency" },
    { id: "NGBJcVR3wmk", title: "Property Show Surat, Rajkot, Ahmedabad, Mumbai, Delhi, Hyderabad, Bangalore, Kolkata Stall Design" },
    { id: "8yy7DkqgjQA", title: "Exhibition Booth Design Agency Rajkot" },
    { id: "8Tz5XQYW1I4", title: "Exhibition Stall Designers Kolkata" },
    { id: "UWObqOW-O3A", title: "Exhibition Stall Design agency Bangalore" },
    { id: "1uEg9VnEpX4", title: "Exhibition Stall Design Agency Hyderabad" },
    { id: "Fd0_10YYD9Q", title: "Mumbai Stall Design Agency" },
    { id: "QKWDrkDU9DU", title: "No 1 Stall Design Agency In Ahmedabad" },
    { id: "6FYqhH7E5Q4", title: "Stall Design Agency Or Company In Ahmedabad" },
    { id: "RnO4nHRfX_I", title: "Exhibition Stall Design Agency Delhi" },
    { id: "9SMhw7h0Bz0", title: "Exhibition Stall Design Company In India" },
    { id: "agPRD0ahzZk", title: "Exhibition Stall Design Agency India" },
    { id: "dYB7BGLez8Q", title: "Exhibition stall design company Mumbai" },
    { id: "KVasilSANsU", title: "Award Winning Exhibition Stall Design Company" },
    { id: "Z3ewo7Xqf2s", title: "Approach Media Pvt. Ltd. Exhibition Stall Design Company India" },
    { id: "khrmIFWDMzg", title: "Pramukh Omkar Group - Exhibition Stall Design & Fabrication Agency - Gandhinagar" },
    { id: "xh9hUhmS9Wc", title: "Exhibition Stall Designing Services In Ahmedabad" },
    { id: "NSpOvFANoFE", title: "Exhibition Stall Design Agency Mumbai" },
    { id: "uX20acjLPGE", title: "no one exhibition stall designer agency 1080p" },
    { id: "cg0SeCGI58c", title: "Property Show Stall Designer or Stall Fabrication Agency In India" },
    { id: "UQw3Clhl9hA", title: "Exhibition Stall Design Company Ahmedabad" },
    { id: "2aL0QGTWZ0I", title: "Award Winning Exhibition Stall Design Agency in India" },
    { id: "-HWZt9QIXnE", title: "Exhibition Stall Design and Fabrication Agency Ahmedabad, Gujarat , India." },
    { id: "BCdkb4MsG2I", title: "Exhibition Stall Design Agency Mumbai" },
    { id: "S0dxXSRzyHc", title: "Exhibition Stall Design and Fabrication GIHED 2015" },
  ],
  // 7 videos
  "healthcare-medical-devices": [
    { id: "09Mjh5TbbMQ", title: "Medical Expo Mumbai | Shreeji Mediquip | Stall Design & Fabrication" },
    { id: "3fDJOvIz0VE", title: "Medical Expo Mumbai | PMT Industries Pvt. Ltd. | Stall Design & Fabrication" },
    { id: "PEo-q7rqCSA", title: "Medical Expo Mumbai | Steri Techno Fab | Stall Design & Fabrication" },
    { id: "b8gZecfJnu0", title: "SS Innovation Exhibition Stall Design Agency MEDTECH" },
    { id: "NFhcMd2AlJE", title: "Exhibition Stall Design Agency MEDTECH" },
    { id: "PasEGpyaZX8", title: "Exhibition Stall Design Agency MEDTECH" },
    { id: "r7IWpg83a0Q", title: "Award Winning Stall Design Agency India - Criticacare 2022" },
  ],
  // 5 videos
  "electrical-lighting": [
    { id: "giL9GMIWW7w", title: "Exhibition Stall Design Company in Ahmedabad | BNI Symposium 2026 Setup" },
    { id: "IPAUTUdq2ds", title: "ACETECH Exhibition Stall Design & Fabrication for Virtual Lights | Approach Media" },
    { id: "UnG3B_s2HdE", title: "Zak Doors & Windows 2025 | Hiwik | Stall Design & Fabrication" },
    { id: "7dss1stCBFE", title: "IFSEC - Voltaic Cable  - Exhibition Stall Design & Fabrication Agency" },
    { id: "_yhIpxJhixo", title: "Approach Media Pvt. Ltd.  Exhibition Stall Design Agency" },
  ],
  // 6 videos
  "water-treatment": [
    { id: "uV8WSC6A3_o", title: "WAPTAG Water Expo 2026 Gandhinagar | Exhibition Stall Design & Fabrication by Approach Media" },
    { id: "7a9ZNDO9JRs", title: "WAPTAG EXHIBITION STALL DESIGN AGENCY" },
    { id: "zkt9YRgxnCA", title: "Stall Design and Fabrication Agency" },
    { id: "QBxFyM-63y0", title: "exhibition stall fabricators in delhi" },
    { id: "PAFEQi_sMxw", title: "Stall Fabrication and Design Agency Ahmedabad" },
    { id: "O_cAAiMXf3k", title: "creative stall design agency in India" },
  ],
  // 22 videos
  "textiles-apparel": [
    { id: "46Q5LiXknFY", title: "IGTF MFW 2026 | Exhibition Stall Design & Fabrication Mumbai | mad-off Denim" },
    { id: "9vHJZM6nKJc", title: "Bharat Tex 2026 Stall Design & Fabrication | Sagar Manufacturers & Smart Knitwear | Delhi" },
    { id: "cA541a94O00", title: "GATE 2026 Ahmedabad | Jade Blue Premium Exhibition Stall Design | Approach Media" },
    { id: "YigZ0FjqZXo", title: "Best exhibition stall design and fabrication company" },
    { id: "ujpki-iJkoQ", title: "Booth Designer Stall Fabrication company" },
    { id: "4E2LhXvTd3w", title: "Children Garment Exhibition Stand Designers" },
    { id: "uGDUqqZ5lb4", title: "ITMACH India Exhibition Design Agency Gandhinagar, Stall Designer ITMACH" },
    { id: "c1dajQWutTc", title: "Exhibition Stall Design Agency India International Garment Fair Noida, IIGF Stall Designer" },
    { id: "DSG801i33mg", title: "Stall Design & Fabrication Agency BIOFACH India, Garfab-TX Surat, techtextil India, WeaveKniTT Expo" },
    { id: "d-VyGIhvvOM", title: "Garment Stall Designer & Fabrication Agency" },
    { id: "rw7Z4mnMSNI", title: "Elevating Textile and Garment Experiences: Textile and Garment Exhibition Stall Deign Company" },
    { id: "4-eCJw6Hm9Y", title: "Shaping Extraordinary Brand Experiences in the World of Exhibitions, Exhibition Stall Design GGMA" },
    { id: "jL7YWMgxNsY", title: "Unveiling Excellence: GGMA Exhibition Stall Design ft. Approach Media Pvt. Ltd." },
    { id: "lidkhu66-0Y", title: "Elevating Garment Exhibition Experiences: Approach Media's Stand Design Excellence" },
    { id: "2Go7Aj8Cl0Q", title: "Exhibition Stall Design Agency Garment Show" },
    { id: "bL9CV_atF6Q", title: "Stand Design And Stall Design Agency India" },
    { id: "vXUG1Sggvyw", title: "GGMA Stall Design Creative Agency" },
    { id: "K4f7NNqq7mw", title: "GGMA Exhibition Stand Builder Agency or Company" },
    { id: "_XqkKOtDgJk", title: "Exhibition Stall Design Agency AMPL GGMA" },
    { id: "bHLjhe1HGKE", title: "Exhibition Design Agency GGMA" },
    { id: "1xxAxrhLPb0", title: "Best Stall Design Agency In India" },
    { id: "W5lxhVOOLdQ", title: "GGMA Stall Fabrication and Design Agency" },
  ],
  // 14 videos
  "machinery-engineering": [
    { id: "uZ88nKwM1no", title: "Stall Design and Fabrication Excellence Unveiled: Shree Automation at ENGIMACH 2023" },
    { id: "jXKE-fuE0oo", title: "Precision Redefined Exhibition Stall Design and Farbication: Preksha Precision at ENGIMACH 2023" },
    { id: "UULG2m56XlM", title: "Crafting Exhibition Stall Design and Fabrication Excellence: SANGHVI FASTENERS at ENGIMACH 2023" },
    { id: "lzxeAqeK8yI", title: "Exhibition Stall Design and Fabrication Revolutionizing Automation: ROBOLOGIC INDIA at ENGIMACH 2023" },
    { id: "DZ6vERrV0EU", title: "Expo Design Innovation Unleashed at ENGIMACH 2023: Durga Mechatronics' Showcase" },
    { id: "vwYzJbY6An4", title: "Wendt India Unveils Future Tech: AI-Designed Booth at ENGIMACH 2023!" },
    { id: "nlgpXY22Kig", title: "Engineering Expo Exhibition Stall Design Agency for Sapt Engineering" },
    { id: "6YauQUZeLgI", title: "ENGIMACH | Automation & Manufacturing Technology Expo Exhibition Stall Design Agency" },
    { id: "007K6_IhDj4", title: "Engimach Stall Design and Fabrication Company" },
    { id: "dsplkMd2e6s", title: "Renewable Energy India REI Expo Exhibition Stand Specialist" },
    { id: "7ECwT51nYEE", title: "Modern Exhibition Stall Design for Jay Ganesh Minerals | Indian Ceramics Asia 2026" },
    { id: "_eJ1W3aalmY", title: "Premium Exhibition Stall Design for Neptune | Indian Ceramics Asia 2026" },
    { id: "8UojfbOPOc4", title: "HXG   Indian Ceramics 2026   Exhibition Booth Design & Setup Agency" },
    { id: "zYh98PxtcaE", title: "Donghai Technology   Indian Ceramics 2026   Exhibition Booth Design & Setup Agency" },
  ],
  // 24 videos
  "solar-renewable-energy": [
    { id: "-WjB0EZsonI", title: "Themis Automation   REI 2025 Stall Design and Fabrication Agency   Approach Media Pvt Ltd" },
    { id: "D71N5XAC7dM", title: "Contender   REI 2025 Stall Design and Fabrication Agency   Approach Media Pvt Ltd" },
    { id: "lXk9lpzaKY0", title: "Solnext   REI 2025 Stall Design and Fabrication Agency   Approach Media Pvt Ltd" },
    { id: "7AvI-sjm5uQ", title: "GMP   REI 2025 Stall Design and Fabrication Agency   Approach Media Pvt Ltd" },
    { id: "rPVI9VzlVe4", title: "Citizen Solar  REI 2025 Stall Design and Fabrication Works" },
    { id: "Ab40-V39--Y", title: "Valeo   REI  2025 Stall Design and Fabrication" },
    { id: "bEQRayQIlQw", title: "Top Exhibition Stall Design & Fabrication Agency in Delhi | Rayzon @ REI 2025" },
    { id: "ea5gpItQNh0", title: "Top Exhibition Stall Design & Fabrication Agency in Delhi | Rayzon @ REI 2025" },
    { id: "aimiZZ_Nt4s", title: "The smarter E India 2026 | Exhibition Stall Design & Fabrication | Solar Expo Booth Projects" },
    { id: "4g2jfCbKu_Y", title: "Inter Solar Trae Show Exhibition Stall Design and Fabrication Agency for Vertex Solar" },
    { id: "lIbZQJSoFy8", title: "Inter Solar Gujarat Exhibition Stall Design and Fabrication Agency for Aatmanirbhar Solar Pvt. Ltd." },
    { id: "ozUASI66r1w", title: "Inter Solar Exhibition Stall Designer and Fabrication Agency for Solmech" },
    { id: "ZpLSpMIGnMk", title: "Inter Solar Exhibition Stall Design and Fabrication Company - Project Solar Yaan" },
    { id: "-s7MHQKlSRs", title: "Inter Solar Exhibition Stall Design Company India, Working for Sunora Solar" },
    { id: "CTR3gUq9wwQ", title: "Inter Solar Exhibition Stall Design And Fabrication work - Samptel" },
    { id: "xSlGF9GcS9w", title: "InterSolar Exhibition Stall Fabrication for Matrix Intersolar India 2024 Unveiling Solar Excellence!" },
    { id: "K2XfIZoxxxQ", title: "AMPL Inter Solar Exhibition Stall Design Agency-Rayzon Solar Shines Bright at Intersolar India 2024!" },
    { id: "b4vkIBbcfU8", title: "Inter Solar Exhibition Stall Design Agency" },
    { id: "iO1Bjne0MfQ", title: "No 1 Exhibition Stall Design Agency REI" },
    { id: "TxQEStqP-Ro", title: "REI Exhibition Stall Designing Services" },
    { id: "Cnm-S_9qGxc", title: "REI Expo Stall Fabrication Pan India" },
    { id: "cjvdZiQ4rMQ", title: "Renewable Energy Exhibition Stall Designer in India" },
    { id: "jrmVGyhug4o", title: "Exhibition Stall Fabricator   Best Stall Design Company" },
    { id: "dsplkMd2e6s", title: "Renewable Energy India REI Expo Exhibition Stand Specialist" },
  ],
  // 12 videos
  "food-beverage-fmcg": [
    { id: "2fd70Ssawaw", title: "Premium Award Winning Booth Design at Aahar 2026 | OHH! Potato by Approach Media" },
    { id: "v-lyFkcq_lM", title: "Aahar 2026 Delhi Pragati Maidan | EitBit Exhibition Stall Design & Fabrication" },
    { id: "bQXNv5423T4", title: "Aahar 2026 Delhi | Equipsol Exhibition Booth Design & Fabrication" },
    { id: "f-1QVOPBkt0", title: "Premium Exhibition Booth Design at Aahar 2026 | Vimal Healthy Oil by Approach Media" },
    { id: "CNST4h1jTG0", title: "GATE 2026 | Sarthak Satvik A2 Cow's Ghee Exhibition Stall Design | Approach Media" },
    { id: "sSM55E026No", title: "Tatsav Food - Indus Food - Exhibition Stall Design & Fabrication Agency" },
    { id: "aFtXL4RHEKQ", title: "RDR - Indus Food 2026 - Exhibition Stall Design & Fabrication Agency" },
    { id: "008MP5NHhuw", title: "Indus Food Stall Design and Fabrication Agency" },
    { id: "iKtGghkaQOI", title: "Exhibition Stall Design and Fabrication Khadhya Khorak Food Expo Gandhinagar" },
    { id: "_-vvekyqu6g", title: "Food Expo Exhibition Stall Design and Fabrication Company" },
    { id: "r0zCV1PybyQ", title: "Food Exhibition Award Winning Stall Design and Fabrication Agency" },
    { id: "ZAqbofrXAOk", title: "Award Winning Stall Design and Fabrication Agency in Food Expo Aahar Indus Food Khadhya Khorak" },
  ],
  // 2 videos
  "cosmetics-personal-care": [
    { id: "ccpgNu9e9xA", title: "CMPL Mumbai | Bhavya Packaging Exhibition Stall Design & Fabrication | Approach Media" },
    { id: "378ra1tbpYU", title: "CMPL Exhibition Stall & Fabrication - Bhavya Packaging Pvt. Ltd. & AICO Foods Ltd." },
  ],
  // 2 videos
  "printing-packaging": [
    { id: "ccpgNu9e9xA", title: "CMPL Mumbai | Bhavya Packaging Exhibition Stall Design & Fabrication | Approach Media" },
    { id: "378ra1tbpYU", title: "CMPL Exhibition Stall & Fabrication - Bhavya Packaging Pvt. Ltd. & AICO Foods Ltd." },
  ],
  // 1 video
  "industrial-automation": [
    { id: "f0l5JI9hN6g", title: "Automation Expo Exhibition Stall Design Agency" },
  ],
  // 2 videos
  "plastics": [
    { id: "tcqfxLuHfPY", title: "Hiplex 2026 Stall Design & Fabrication | Shubham Extrusion & Sumitek Natraj | Hyderabad" },
    { id: "EPPShN0xPFc", title: "Plast India 2026   Exhibition Stall Design & Fabrication Agency" },
  ],
  // 4 videos
  "pumps-valves-gears": [
    { id: "A52QnHS4gdg", title: "Prawaas 2026 | Exhibition Stall Design & Fabrication Gandhinagar | Bondzil" },
    { id: "QDFsHLdDDh0", title: "Chemtech 2026 Stall Design | Mackwell Pumps Exhibition Booth by Approach Media" },
    { id: "-BTd-F_IkcE", title: "Chemtech 2026 Exhibition Stall Design | Suntrack Energy Booth by Approach Media" },
    { id: "m28IMXy6j4U", title: "Chemtech 2026 Stall Design | My Rangoli Exhibition Booth by Approach Media Pvt. Ltd." },
  ],
}

/**
 * Client testimonials. Not an industry, so on no sector page. The owner has
 * placed these on the home page (a six-video row inside "Client voices") and
 * on /about (all of them, as the act before the close).
 */
export const TESTIMONIAL_PLAYLIST_ID = 'PLDhx4H8blbcY'

export const TESTIMONIAL_VIDEOS: SectorVideo[] = [
  { id: "3DLofk-gNws", title: "Client Review - Nice Industries - Creative Stall Design WAPTAG" },
  { id: "5E38_FTUBRk", title: "Client Review - Cosmos - Stall Design WAPTAG" },
  { id: "yMKfx7ocXSg", title: "Client Review - Cloud International - Exhibition Stall Design WAPTAG" },
  { id: "Hog9_LmiD-Y", title: "Client Review - ZEDTECH - Exhibition Booth Design - WAPTAG" },
  { id: "RtJpmy9Rl6M", title: "Client Review -  Girivar Group - Exhibition Booth Design  ABA Property Show" },
  { id: "Y5ZaRhqWklg", title: "Client Review- Infinity- Stall Design WAPTAG" },
  { id: "akupa3vGh4E", title: "Client Review - Swapnil Group - Exhibition Booth Design - ABA Property Show" },
  { id: "juW8xZER3Ps", title: "Client Review - BHAGWAT Group - Exhibition Booth Design - ABA Property Show" },
  { id: "8UI8VDZIeNg", title: "Client Review Reditap Exhibition Booth Design WAPTAG" },
  { id: "kj8dUALYcQM", title: "PCS Client Review" },
  { id: "9mJRZ3DbQkA", title: "Vishwakarma    Pharma Tech   Review" },
  { id: "A1gav8bsT6w", title: "Best Stall Design Agency By Fredi Kasad form Federal Engineers" },
  { id: "H8-DWy4TxQw", title: "Samor Review - Real Estate Stall Design Agency" },
  { id: "ognLaJToCz0", title: "Sanghvi Review - Exhibition Booth Design Agency" },
  { id: "LlYDADOATv8", title: "VENUS Review  Stall Design Agency Approach Media Pvt Ltd" },
  { id: "6jxMRz3RDuI", title: "IFEX -  ACI  Automation - Client Testimonial - Exhibition Stall Design Agency Approach Media Pvt Ltd" },
  { id: "OWdCqFgRd7k", title: "IFEX  -   RSJ  - Client Testimonial  - Exhibition Stall Design Agency Approach Media Pvt  Ltd" },
  { id: "RhaJ9Q4xqH8", title: "IFex   Kanthal   Client Testimonial   Exhibition Stall Design Agency Approach Media Pvt  Ltd" },
  { id: "Iai7oeQFPLY", title: "Exhibition Stall Design Agency - Inter Solar - Citizen Solar (Inter Solar)" },
  { id: "amGLaUkvysY", title: "Award-Winning Stall Design Agency" },
  { id: "e9L_dYX2vIM", title: "Exhibition Stall Design Agency In India" },
  { id: "LwhDwmO0I2Q", title: "BNI CHENNAI NORTH TESTIMONIALS" },
]
