// node renderbp.js <w> <h> <outdir> [times...]   (default: every frame 0..3.72 at 24fps)
const { chromium } = require('playwright')
const fs = require('fs')
const [w, h, out, ...ts] = process.argv.slice(2)
;(async () => {
  const b = await chromium.launch()
  const p = await b.newPage({ viewport: { width: +w, height: +h } })
  p.on('pageerror', e => console.error('PAGEERR', e.message))
  await p.goto(`http://localhost:4630/opening/blueprint.html?w=${w}&h=${h}`)
  await p.waitForFunction(() => window.ready)
  fs.mkdirSync(out, { recursive: true })
  const times = ts.length ? ts.map(Number) : Array.from({ length: Math.round(3.72 * 24) }, (_, i) => i / 24)
  for (let i = 0; i < times.length; i++) {
    const url = await p.evaluate(t => window.renderAt(t), times[i])
    fs.writeFileSync(`${out}/b${String(i).padStart(4, '0')}.png`, Buffer.from(url.split(',')[1], 'base64'))
  }
  await b.close()
})()
