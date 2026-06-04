import { generateURI } from 'otplib'
import QRCode from 'qrcode'

export const dynamic = 'force-dynamic'

export default async function Setup2FAPage() {
  const secret = process.env.ADMIN_TOTP_SECRET ?? ''
  const configured = !!secret

  let qrDataUrl = ''
  if (configured) {
    const uri = generateURI({
      label:  'admin@approachmedia.in',
      issuer: 'Approach Media Admin',
      secret,
    })
    qrDataUrl = await QRCode.toDataURL(uri, { width: 240, margin: 1 })
  }

  return (
    <div className="max-w-md mx-auto py-12 space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Two-Factor Authentication Setup</h1>
        <p className="text-sm text-slate-400 mt-2">
          Scan the QR code with Google Authenticator to register this admin panel.
        </p>
      </div>

      {!configured ? (
        <div className="rounded-xl border border-red-700 bg-red-900/20 p-6 space-y-3">
          <p className="text-red-400 font-semibold text-sm">ADMIN_TOTP_SECRET is not set</p>
          <p className="text-red-300/80 text-sm">
            Run the command below in your terminal to generate a secret, then add it to your Railway environment variables:
          </p>
          <pre className="rounded-lg bg-slate-900 border border-slate-700 p-4 text-xs text-green-400 overflow-x-auto whitespace-pre-wrap">
            {`node -e "const {generateSecret}=require('otplib'); console.log(generateSecret())"`}
          </pre>
          <p className="text-xs text-slate-500">
            Add the output as <code className="text-slate-300">ADMIN_TOTP_SECRET</code> in Railway → Variables, then redeploy.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 space-y-6">
          {/* QR Code */}
          <div className="flex flex-col items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrDataUrl}
              alt="Google Authenticator QR code"
              width={240}
              height={240}
              className="rounded-xl border-4 border-white"
            />
            <p className="text-xs text-slate-400 text-center">
              Open Google Authenticator → tap <strong className="text-slate-200">+</strong> → <strong className="text-slate-200">Scan a QR code</strong>
            </p>
          </div>

          {/* Manual entry fallback */}
          <div className="rounded-lg bg-slate-800 border border-slate-700 p-4 space-y-1">
            <p className="text-xs text-slate-500 uppercase tracking-widest">Manual entry (if camera unavailable)</p>
            <p className="text-xs text-slate-400">Account: <span className="text-slate-200">Approach Media Admin</span></p>
            <p className="text-xs font-mono text-green-400 break-all">{secret}</p>
            <p className="text-xs text-slate-500">Type: Time-based (TOTP)</p>
          </div>

          <div className="rounded-lg bg-blue-900/20 border border-blue-700/40 p-4">
            <p className="text-xs text-blue-300">
              After scanning, test that the 6-digit code works by signing out and logging back in.
              Codes refresh every 30 seconds — if one fails, wait for the next.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
