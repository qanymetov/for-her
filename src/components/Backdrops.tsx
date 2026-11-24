import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { svgAnim } from './ui'

// Детерминированный псевдослучайный генератор, чтобы композиции были одинаковыми при каждом открытии
function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/** Огни ночного города: мягкие пятна света (радиальные градиенты, без фильтров) */
export function CityLights({ seed = 7, warm = false, count = 46 }: { seed?: number; warm?: boolean; count?: number }) {
  const lights = useMemo(() => {
    const r = rng(seed)
    return Array.from({ length: count }, () => ({
      x: r() * 100,
      y: 62 + r() * 38,
      s: 6 + r() * 34,
      o: 0.12 + r() * 0.4,
      gold: r() > (warm ? 0.25 : 0.55),
      d: 3 + r() * 5,
    }))
  }, [seed, warm, count])
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {lights.map((l, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${l.x}%`,
            top: `${l.y}%`,
            width: l.s,
            height: l.s,
            marginLeft: -l.s / 2,
            marginTop: -l.s / 2,
            background: `radial-gradient(circle, ${l.gold ? 'rgba(255,140,120,1)' : 'rgba(255,170,190,1)'} 0%, transparent 68%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: l.o * 0.8 }}
          transition={{ duration: 2.5, delay: i * 0.03 }}
        />
      ))}
      
    </div>
  )
}

/** Мягкая засветка плёнки */
export function LightLeak({ className = '' }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{ background: 'radial-gradient(circle, rgba(255,92,138,0.22) 0%, rgba(255,92,138,0.06) 40%, transparent 70%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5 }}
    />
  )
}

/** Архитектурные линии: перспектива колонн */
export function Architecture() {
  const lines = Array.from({ length: 13 }, (_, i) => i)
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
      <g stroke="#e11d5c" strokeWidth="0.7" fill="none" opacity="0.18">
        {lines.map((i) => {
          const x = 40 + i * 76
          return (
            <motion.line
              key={i}
              x1={x}
              y1={1000}
              x2={500 + (x - 500) * 0.35}
              y2={0}
              initial={svgAnim({ pathLength: 0 })}
              animate={svgAnim({ pathLength: 1 })}
              transition={{ duration: 2.4, delay: 0.3 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            />
          )
        })}
        {[220, 420, 600, 760, 890].map((y, i) => (
          <motion.line
            key={y}
            x1={0}
            x2={1000}
            y1={y}
            y2={y}
            initial={svgAnim({ pathLength: 0 })}
            animate={svgAnim({ pathLength: 1 })}
            transition={{ duration: 2.2, delay: 0.8 + i * 0.1 }}
          />
        ))}
      </g>
    </svg>
  )
}

/** Чертёж: сетка, каркасный куб, размерные линии */
export function Blueprint() {
  const draw = (delay: number, duration = 2) => ({
    initial: svgAnim({ pathLength: 0, opacity: 0 }),
    animate: svgAnim({ pathLength: 1, opacity: 1 }),
    transition: { duration, delay, ease: [0.22, 1, 0.36, 1] as const },
  })
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="bp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#4a1028" strokeWidth="0.4" opacity="0.07" />
        </pattern>
        <pattern id="bp-grid-big" width="200" height="200" patternUnits="userSpaceOnUse">
          <path d="M200 0H0V200" fill="none" stroke="#4a1028" strokeWidth="0.6" opacity="0.08" />
        </pattern>
      </defs>
      <rect width="1200" height="900" fill="url(#bp-grid)" />
      <rect width="1200" height="900" fill="url(#bp-grid-big)" />
      <g fill="none" stroke="#e11d5c" strokeWidth="1" opacity="0.5">
        {/* Каркасный куб (изометрия) */}
        <motion.path d="M900 250 L1020 320 L1020 460 L900 530 L780 460 L780 320 Z" {...draw(0.4, 2.4)} />
        <motion.path d="M780 320 L900 390 L1020 320 M900 390 L900 530" {...draw(1.1, 1.8)} />
        <motion.path d="M780 320 L900 250 M900 250 L900 390" strokeDasharray="4 6" opacity="0.6" {...draw(1.6, 1.4)} />
        {/* Окружность и осевые линии */}
        <motion.circle cx="900" cy="390" r="215" strokeWidth="0.6" opacity="0.5" {...draw(0.6, 3)} />
        <motion.path d="M650 390 H1150 M900 140 V640" strokeDasharray="18 6 3 6" strokeWidth="0.6" opacity="0.6" {...draw(0.9, 2.4)} />
        {/* Размерная линия */}
        <motion.path d="M780 600 V640 M1020 600 V640 M780 625 H1020" strokeWidth="0.7" {...draw(2, 1.2)} />
        <motion.path d="M780 625 l10 -4 v8 z M1020 625 l-10 -4 v8 z" fill="#e11d5c" {...draw(2.4, 0.6)} />
      </g>
      <motion.text
        x="900"
        y="616"
        textAnchor="middle"
        fill="#e11d5c"
        fontSize="13"
        fontFamily="Manrope, sans-serif"
        letterSpacing="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2.6, duration: 1 }}
      >
        240
      </motion.text>
      <g fill="none" stroke="#4a1028" strokeWidth="0.6" opacity="0.18">
        <motion.path d="M80 760 Q260 640 420 760 T760 760" {...draw(1.4, 3)} />
        <motion.rect x="90" y="110" width="210" height="130" {...draw(1.2, 2)} />
        <motion.path d="M90 175 H300 M195 110 V240" strokeDasharray="5 5" {...draw(1.8, 1.6)} />
      </g>
    </svg>
  )
}

/** Луч кинопроектора сверху */
export function ProjectorBeam() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-[-10%] h-[120%] w-[140%] -translate-x-1/2"
        style={{
          background: 'conic-gradient(from 180deg at 50% 0%, transparent 160deg, rgba(255,150,175,0.28) 175deg, rgba(255,120,150,0.4) 180deg, rgba(255,150,175,0.28) 185deg, transparent 200deg)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
    </div>
  )
}

/** Тонкие горизонтальные линии, как на странице журнала */
export function Ruled() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 9 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 h-px w-full origin-left bg-milk/[0.05]"
          style={{ top: `${8 + i * 11}%` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  )
}

/** Линия горизонта с рассветным светом */
export function Horizon({ glow = 0.18 }: { glow?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-[94%] h-[70vh] w-[130vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
        style={{ background: `radial-gradient(ellipse at center, rgba(255,92,138,${glow}) 0%, transparent 60%)` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      />
      <motion.div
        className="absolute left-0 top-[94%] h-px w-full origin-center bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

/** Силуэт города с окнами */
export function Skyline({ seed, base, maxH, color, windows, count }: { seed: number; base: number; maxH: number; color: string; windows: number; count: number }) {
  const blds = useMemo(() => {
    let s = seed
    const r = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
    const out: { x: number; w: number; h: number; spire: boolean; win: [number, number, boolean][] }[] = []
    let x = -10
    for (let i = 0; i < count && x < 1210; i++) {
      const w = 34 + r() * 60
      const tall = r() > 0.82
      const h = (tall ? 0.75 : 0.25) * maxH + r() * maxH * (tall ? 0.25 : 0.45)
      const win: [number, number, boolean][] = []
      for (let yy = base - h + 12; yy < base - 8; yy += 14) for (let xx = x + 6; xx < x + w - 8; xx += 10) if (r() < windows) win.push([xx, yy, r() < 0.06])
      out.push({ x, w, h, spire: tall && r() > 0.4, win })
      x += w + 2 + r() * 6
    }
    return out
  }, [seed, base, maxH, windows, count])
  return (
    <g>
      {blds.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={base - b.h} width={b.w} height={b.h + 400} fill={color} />
          {b.spire && <path d={`M${b.x + b.w / 2 - 6} ${base - b.h} L${b.x + b.w / 2} ${base - b.h - 46} L${b.x + b.w / 2 + 6} ${base - b.h} Z`} fill={color} />}
          {b.win.map(([wx, wy, tw], j) =>
            <rect key={j} x={wx} y={wy} width="4" height="6" fill="#fff3c4" opacity={tw ? 0.95 : 0.7} />
          )}
        </g>
      ))}
    </g>
  )
}

