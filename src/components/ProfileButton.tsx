import { useLocation, useNavigate } from 'react-router-dom'

/** Routes where no profile icon should show (pre-login + the profile screen itself). */
const HIDDEN_ON = ['/', '/register', '/verify', '/profile', '/cars/add', '/book']

/** Circular profile avatar pinned top-right on the main app screens. */
export default function ProfileButton() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  if (HIDDEN_ON.includes(pathname)) return null

  return (
    <button
      onClick={() => navigate('/profile')}
      aria-label="Profile"
      className="absolute right-4 top-[50px] z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-md ring-1 ring-slate-200 active:scale-95"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
      </svg>
    </button>
  )
}
