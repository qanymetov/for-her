import { motion } from 'framer-motion'
import { useMemo } from 'react'

/** Медленно падающие лепестки — плавное движение, без мерцания */
export function Petals({ count = 14, light = false }: { count?: number; light?: boolean }) {
  const petals = useMemo(() => {
    let s = 77
    const r = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
    return Array.from({ length: count }, () => ({
      x: r() * 100,
      size: 10 + r() * 12,
      dur: 16 + r() * 14,
      delay: -r() * 30,
      sway: 30 + r() * 60,
      rot: r() * 360,
      hue: r(),
    }))
  }, [count])
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden motion-reduce:hidden">
      {petals.map((p, i) => (
        <motion.div
          key={i}
          className="absolute top-0"
          style={{ left: `${p.x}%`, width: p.size, height: p.size * 1.25 }}
          initial={{ y: '-10vh' }}
          animate={{ y: ['-10vh', '110vh'], x: [0, p.sway, -p.sway / 2, p.sway / 3], rotate: [p.rot, p.rot + 220] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'linear', x: { duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' } }}
        >
          <svg viewBox="0 0 20 25" className="h-full w-full">
            <path
              d="M10 1 C17 6 19 14 14 21 C12 24 8 24 6 21 C1 14 3 6 10 1 Z"
              fill={light ? (p.hue > 0.5 ? '#ffb3c7' : '#ffd0dc') : p.hue > 0.6 ? '#ff6f91' : p.hue > 0.3 ? '#ff9db3' : '#ffc2cf'}
              opacity={light ? 0.6 : 0.75}
            />
            <path d="M10 3 C11 10 11 16 9 22" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="0.8" fill="none" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
