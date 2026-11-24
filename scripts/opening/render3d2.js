// node render3d.js <w> <h> <outdir> [times...]   (times in seconds; default: every frame 0..7.8 at 24fps)
const { chromium } = require('playwright')
const fs = require('fs')
const [w, h, out, ...ts] = process.argv.slice(2)
;(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] })
  const p = await b.newPage({ viewport: { width: +w, height: +h } })
  p.on('pageerror', e => console.error('PAGEERR', e.message))
  p.on('console', m => { if (m.type() === 'error') console.error('CONSOLE', m.text()) })
  await p.goto(`http://localhost:4630/opening/${process.env.PAGE || 'scene.html'}?w=${w}&h=${h}&ss=${process.env.SS || 1}&mode=${process.env.MODE || ""}`)
  await p.waitForFunction(() => window.ready || window.failed, null, { timeout: 120000 })
  const failed = await p.evaluate(() => window.failed)
  if (failed) { console.error('FAILED', failed); process.exit(1) }
  fs.mkdirSync(out, { recursive: true })
  const times = ts.length ? ts.map(Number) : Array.from({ length: Math.round((+process.env.DUR || 7.8) * 24) + 1 }, (_, i) => i / 24)
  const t0 = Date.now()
  for (let i = 0; i < times.length; i++) {
    const url = await p.evaluate(t => window.renderAt(t), times[i])
    fs.writeFileSync(`${out}/f${String(i).padStart(4, '0')}.png`, Buffer.from(url.split(',')[1], 'base64'))
    if (i % 24 === 0) console.log('frame', i, ((Date.now() - t0) / (i + 1) / 1000).toFixed(2) + 's/frame')
  }
  await b.close()
})()
