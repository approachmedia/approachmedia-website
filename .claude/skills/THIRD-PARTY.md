# Third-party skills

Copied verbatim (no edits) on 2026-11-23. Both MIT; each folder carries its LICENSE.

| Source | Commit | Installed as |
|---|---|---|
| https://github.com/emilkowalski/skills | 64eb3de | animate animate-expo animation-performance animation-vocabulary apple-design ask-emil ask-sonner break-ui choreograph emil-design-eng find-animation-opportunities gestures improve-animations learn-taste mobile-native pick-ui-library prototype remove-animations review-animations write-swift  |
| https://github.com/leonxlnx/taste-skill | 6c0b5c7 | design-taste-frontend (from skills/taste-skill) |
| https://github.com/microsoft/playwright-cli | c872a33 | playwright-cli (Apache-2.0; skill only) |

To update, re-copy from the source repo at a newer commit and update this table.

Note: design-taste-frontend declares a Stop hook in its SKILL.md frontmatter that runs
its scripts/gate.mjs with Node when a session using the skill ends. It exits quietly
when there is no taste-skill build to check.

playwright-cli is a skill plus a command-line tool. The skill lives here; the tool itself
is not in the repo and must be installed per machine or session:
`npm install -g @playwright/cli@latest`.
