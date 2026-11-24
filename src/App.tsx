import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Volume2, VolumeX, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Petals } from './components/Petals'
import { EASE } from './components/ui'
import { SCENES } from './content'
import { startMusic, stopMusic } from './lib/music'
import { SceneBeginning, SceneFeelings, SceneFlirt, SceneLittleThings, SceneWorld } from './scenes/Story1'
import { SceneCantWait, SceneOneThing, SceneWhy } from './scenes/Story2'
import { FinalReveal, SceneLast, SceneMemory } from './scenes/Story3'

const TOTAL = SCENES.length
const pad = (n: number) => String(n).padStart(2, '0')

export default function App() {
  const [index, setIndex] = useState(0)
  const [finalOpen, setFinalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [music, setMusic] = useState(false)
  const touch = useRef<{ x: number; y: number } | null>(null)

  const go = useCallback((i: number) => setIndex(Math.max(0, Math.min(TOTAL - 1, i))), [])
  const next = useCallback(() => go(index + 1), [go, index])
  const prev = useCallback(() => go(index - 1), [go, index])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (finalOpen || menuOpen) return
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); next() }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, finalOpen, menuOpen])

  useEffect(() => () => stopMusic(), [])

  const toggleMusic = () => {
    try {
      if (music) stopMusic()
      else startMusic()
      setMusic(!music)
    } catch {
      setMusic(false)
    }
  }

  const onTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest?.('[data-noswipe]')) {
      touch.current = null
      return
    }
    const t = e.touches[0]
    touch.current = { x: t.clientX, y: t.clientY }
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current || finalOpen || menuOpen) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touch.current.x
    const dy = t.clientY - touch.current.y
    touch.current = null
    if (Math.abs(dx) > 70 && Math.abs(dy) < 50) {
      if (dx < 0 && index > 0) next()
      if (dx > 0) prev()
    }
  }

  const scene = (() => {
    switch (index) {
      case 0:
        return <SceneBeginning onStart={next} />
      case 1:
        return <SceneFeelings />
      case 2:
        return <SceneLittleThings />
      case 3:
        return <SceneWorld />
      case 4:
        return <SceneFlirt />
      case 5:
        return <SceneWhy />
      case 6:
        return <SceneMemory />
      case 7:
        return <SceneCantWait />
      case 8:
        return <SceneOneThing />
      default:
        return <SceneLast onRestart={() => go(0)} onFinal={() => setFinalOpen(true)} />
    }
  })()

  return (
    <MotionConfig reducedMotion="user">
      <main
        className="relative h-full w-full overflow-hidden overflow-clip bg-night"
        style={{
          background:
            'radial-gradient(ellipse at 12% 8%, #ffd3df 0%, transparent 50%), radial-gradient(ellipse at 92% 92%, #ffdcc8 0%, transparent 50%), radial-gradient(ellipse at 85% 15%, #ffe3ec 0%, transparent 40%), #fff0f2',
        }}
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {/* Сцены с кинематографичным затемнением между ними */}
        <AnimatePresence mode="wait">
          <motion.section
            key={index}
            className="absolute inset-0"
            aria-label={`${pad(index + 1)} / ${pad(TOTAL)} — ${SCENES[index].ru}`}
            initial={{ opacity: 0, scale: 1.025 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1.2, ease: EASE } }}
            exit={{ opacity: 0, scale: 0.99, transition: { duration: 0.65, ease: 'easeIn' } }}
          >
            {scene}
          </motion.section>
        </AnimatePresence>

        {/* Верхняя панель: индикатор глав и музыка */}
        <header className="safe-x pointer-events-none fixed inset-x-0 top-0 z-40 pt-[max(18px,env(safe-area-inset-top))]">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-milk/[0.06]">
            <motion.div className="h-full origin-left bg-gold/70" animate={{ scaleX: (index + 1) / TOTAL }} transition={{ duration: 1.2, ease: EASE }} />
          </div>
          <div className="absolute inset-x-0 top-0 -z-10 h-[calc(92px+env(safe-area-inset-top))] bg-[#fff0f2]/80 backdrop-blur-md [mask-image:linear-gradient(to_bottom,#000_72%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,#000_72%,transparent)]" />
          <div className="mx-auto flex max-w-[1120px] items-start justify-between">
            <button onClick={() => setMenuOpen(true)} className="pointer-events-auto group flex min-h-[44px] items-start gap-3 text-left" aria-label="Список глав">
              <div className="flex items-baseline font-serif text-[22px] leading-none tabular-nums text-milk">
                <span className="relative inline-block h-[24px] w-[26px] overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={index}
                      className="absolute left-0 top-0"
                      initial={{ y: 22, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -22, opacity: 0 }}
                      transition={{ duration: 0.7, ease: EASE }}
                    >
                      {pad(index + 1)}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="mx-2 text-[16px] text-gold">/</span>
                <span className="text-[16px] text-warm">{pad(TOTAL)}</span>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={index}
                  className="mt-[3px] hidden font-serif text-[15px] italic text-warm transition-colors group-hover:text-milk/80 sm:block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {SCENES[index].en}
                </motion.span>
              </AnimatePresence>
            </button>

            <button
              onClick={toggleMusic}
              aria-pressed={music}
              aria-label={music ? 'Выключить музыку' : 'Включить музыку'}
              className="pointer-events-auto flex min-h-[44px] items-center gap-2 rounded-full border border-milk/10 bg-night/40 px-4 text-[13px] text-milk/70 transition-colors hover:border-gold/50 hover:text-milk"
            >
              {music ? <Volume2 size={15} className="text-gold" /> : <VolumeX size={15} />}
              <span className="hidden sm:inline">{music ? 'Музыка' : 'Без музыки'}</span>
              {music && (
                <span className="flex h-3 items-end gap-[2px]" aria-hidden>
                  {[0, 1, 2].map((b) => (
                    <motion.span key={b} className="w-[2px] bg-gold" animate={{ height: ['30%', '100%', '45%'] }} transition={{ duration: 1.1, repeat: Infinity, repeatType: 'mirror', delay: b * 0.2 }} />
                  ))}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Нижняя навигация */}
        <AnimatePresence>
          {index > 0 && (
            <motion.nav
              className="safe-x fixed inset-x-0 bottom-0 z-40 pb-[max(16px,env(safe-area-inset-bottom))]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[calc(104px+env(safe-area-inset-bottom))] bg-[#fff0f2]/80 backdrop-blur-md [mask-image:linear-gradient(to_top,#000_72%,transparent)] [-webkit-mask-image:linear-gradient(to_top,#000_72%,transparent)]" />
              <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4">
                <button onClick={prev} className="flex min-h-[48px] items-center gap-2 pr-3 text-[14px] text-milk/60 transition-colors hover:text-milk">
                  <ChevronLeft size={18} /> Назад
                </button>
                <div className="hidden items-center gap-2 sm:flex" aria-hidden>
                  {SCENES.map((_, i) => (
                    <span key={i} className={`h-[3px] rounded-full transition-all duration-700 ${i === index ? 'w-6 bg-gold' : i < index ? 'w-2 bg-milk/40' : 'w-2 bg-milk/12'}`} />
                  ))}
                </div>
                {index < TOTAL - 1 ? (
                  <button
                    onClick={next}
                    className="group flex min-h-[48px] items-center gap-3 rounded-full border border-gold/40 bg-night/60 pl-5 pr-4 text-[14px] text-milk transition-colors hover:border-gold hover:bg-gold/10"
                  >
                    <span className="max-w-[46vw] truncate">
                      <span className="text-milk/50">Далее · </span>
                      {SCENES[index + 1].ru}
                    </span>
                    <ChevronRight size={18} className="flex-none text-gold transition-transform group-hover:translate-x-0.5" />
                  </button>
                ) : (
                  <span className="text-[13px] text-warm">Конец истории</span>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Список глав */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="fixed inset-0 z-[57] bg-night/95"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              role="dialog"
              aria-label="Главы"
            >
              <div className="safe-x scene-scroll mx-auto h-full max-w-[720px] pb-10 pt-[max(24px,env(safe-area-inset-top))]">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-[18px] italic text-gold">Главы</span>
                  <button onClick={() => setMenuOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full border border-milk/15 text-milk/70 hover:text-milk" aria-label="Закрыть">
                    <X size={18} />
                  </button>
                </div>
                <ol className="mt-8">
                  {SCENES.map((s, i) => (
                    <motion.li key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i, duration: 0.5 }}>
                      <button
                        onClick={() => {
                          go(i)
                          setMenuOpen(false)
                        }}
                        className={`flex min-h-[56px] w-full items-baseline gap-5 border-t border-milk/10 py-3 text-left transition-colors ${i === index ? 'text-goldsoft' : 'text-milk/80 hover:text-milk'}`}
                      >
                        <span className="w-8 font-serif text-[16px] tabular-nums text-warm">{pad(i + 1)}</span>
                        <span className="font-serif text-[24px] leading-tight">{s.ru}</span>
                        <span className="ml-auto hidden font-serif text-[15px] italic text-warm sm:inline">{s.en}</span>
                      </button>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>{finalOpen && <FinalReveal onClose={() => setFinalOpen(false)} />}</AnimatePresence>

        <Petals />
      </main>
    </MotionConfig>
  )
}
