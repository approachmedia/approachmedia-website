'use client'
export default function LogoutButton() {
  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    window.location.href = '/admin/login'
  }
  return (
    <button type="button" onClick={logout} className="text-xs text-slate-500 hover:text-slate-300 transition">
      Sign out
    </button>
  )
}
