import { type ReactNode } from 'react'
import ProfileButton from './ProfileButton'
import BottomNav from './BottomNav'

/**
 * Renders its children inside an iPhone-style bezel so every mockup screen
 * looks like it is running on a real device. Content area scrolls internally.
 */
export default function DeviceFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-700 via-slate-900 to-black p-6">
      <div className="relative h-[844px] w-[390px] rounded-[3rem] bg-black p-3 shadow-2xl ring-1 ring-white/10">
        {/* Screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[2.3rem] bg-slate-50">
          {/* Notch */}
          <div className="absolute left-1/2 top-0 z-20 h-7 w-40 -translate-x-1/2 rounded-b-2xl bg-black" />

          {/* Status bar */}
          <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-7 pt-2.5 text-xs font-semibold text-slate-900">
            <span>9:41</span>
            <span className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold">5G</span>
              {/* Battery */}
              <span className="relative inline-flex h-3 w-6 items-center rounded-[3px] border border-slate-900/70 px-[2px]">
                <span className="h-1.5 w-full rounded-[1px] bg-slate-900" />
                <span className="absolute -right-[3px] h-1.5 w-[2px] rounded-r bg-slate-900/70" />
              </span>
            </span>
          </div>

          {/* Profile avatar (top-right on main app screens) */}
          <ProfileButton />

          {/* Content */}
          <div className="screen-scroll h-full w-full overflow-y-auto pt-11">
            {children}
          </div>

          {/* Bottom tab bar (pinned to the screen, shown on main tabs) */}
          <BottomNav />
        </div>
      </div>
    </div>
  )
}
