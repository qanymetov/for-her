import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useEffect, type ReactNode } from 'react'

export const EASE = [0.22, 1, 0.36, 1] as const

/** Обход ошибки типов framer-motion для pathLength в SVG */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const svgAnim = (v: Record<string, number>) => v as any

/** Появление при попадании в кадр (и при прокрутке длинной сцены) */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className = '',
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'p' | 'h1' | 'h2' | 'span' | 'li'
}) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </M>
  )
}

/** Лёгкий параллакс от движения мыши (только на устройствах с мышью) */
export function usePointerParallax(): { px: MotionValue<number>; py: MotionValue<number> } {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 40, damping: 18 })
  const py = useSpring(my, { stiffness: 40, damping: 18 })
  useEffect(() => {
    if (!window.matchMedia?.('(pointer: fine)').matches) return
    const on = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', on)
    return () => window.removeEventListener('pointermove', on)
  }, [mx, my])
  return { px, py }
}

export function ParallaxLayer({ depth, children, className = '' }: { depth: number; children: ReactNode; className?: string }) {
  const { px, py } = usePointerParallax()
  const x = useTransform(px, (v) => v * -depth)
  const y = useTransform(py, (v) => v * -depth)
  return (
    <motion.div aria-hidden className={`pointer-events-none absolute inset-[-24px] ${className}`} style={{ x, y }}>
      {children}
    </motion.div>
  )
}

/** Обёртка сцены: на всю высоту, с прокруткой внутри, если текст не помещается */
export function SceneShell({
  children,
  backdrop,
  wide = false,
  align = 'center',
  parallax = true,
}: {
  children: ReactNode
  backdrop?: ReactNode
  wide?: boolean
  align?: 'center' | 'start'
  parallax?: boolean
}) {
  return (
    <div className="absolute inset-0 overflow-clip">
      {backdrop && (parallax ? <ParallaxLayer depth={18}>{backdrop}</ParallaxLayer> : backdrop)}
      <div className="scene-scroll absolute inset-0">
        <div
          className={`safe-x mx-auto flex min-h-full w-full flex-col ${align === 'center' ? 'justify-center' : 'justify-start'} ${
            wide ? 'max-w-[1120px]' : 'max-w-[820px]'
          } pb-[132px] pt-[100px] sm:pb-[140px] sm:pt-[116px]`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export function SceneTitle({ en, children, delay = 0.15 }: { en: string; children: ReactNode; delay?: number }) {
  return (
    <div className="mb-7 sm:mb-9">
      <Reveal delay={delay} className="mb-4 flex items-center gap-3 text-gold">
        <span className="h-px w-8 bg-gold/60" />
        <span className="font-serif text-[15px] italic tracking-wide">{en}</span>
      </Reveal>
      <Reveal delay={delay + 0.15} as="h2" className="balance font-serif text-[clamp(33px,6vw,60px)] font-light leading-[1.05] tracking-[-0.01em] text-milk">
        {children}
      </Reveal>
    </div>
  )
}

export function Body({ children, delay = 0.5, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <Reveal delay={delay} as="p" className={`pretty max-w-[62ch] text-[16px] font-light leading-[1.75] text-milk/80 sm:text-[17px] ${className}`}>
      {children}
    </Reveal>
  )
}

/** Несколько абзацев с последовательным появлением */
export function Paras({ items, start = 0.5, step = 0.18 }: { items: string[]; start?: number; step?: number }) {
  return (
    <div className="space-y-4">
      {items.map((t, i) => (
        <Body key={i} delay={start + i * step}>
          {t}
        </Body>
      ))}
    </div>
  )
}

export function Accent({ children, delay = 0.6, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <Reveal delay={delay} as="p" className={`balance font-serif text-[clamp(23px,3.2vw,31px)] font-light italic leading-[1.32] text-goldsoft ${className}`}>
      {children}
    </Reveal>
  )
}
