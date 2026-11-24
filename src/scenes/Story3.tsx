import { motion } from 'framer-motion'
import { RotateCcw, X } from 'lucide-react'
import { useEffect, useState, type CSSProperties } from 'react'
import { Horizon, ProjectorBeam } from '../components/Backdrops'
import { Accent, Body, EASE, Paras, Reveal, SceneShell, SceneTitle } from '../components/ui'

/* ───────────── 07 — ONE LITTLE MEMORY ───────────── */

function Ticket() {
  const [flipped, setFlipped] = useState(false)
  const cq = (v: number): CSSProperties => ({ fontSize: `${v}cqw` })
  return (
    <motion.div
      className="mx-auto w-full max-w-[640px]"
      initial={{ opacity: 0, y: 70, rotate: -7 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      transition={{ delay: 0.7, duration: 1.6, ease: EASE }}
    >
      <button
        onClick={() => setFlipped((f) => !f)}
        aria-label={flipped ? 'Перевернуть билет обратно' : 'Перевернуть билет'}
        className="relative block aspect-[2.2/1] w-full [perspective:1400px]"
        style={{ containerType: 'inline-size' }}
      >
        <motion.div className="absolute inset-0 [transform-style:preserve-3d]" animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 1, ease: EASE }}>
          {/* ЛИЦЕВАЯ СТОРОНА */}
          <div className="absolute inset-0 flex overflow-hidden rounded-[1.6cqw] bg-[#fffaf6] text-[#4a1028] shadow-[0_30px_60px_-20px_rgba(140,20,60,0.3)] [backface-visibility:hidden]">
            <div className="relative flex w-[77%] flex-col px-[4.5cqw] py-[3.6cqw] text-left">
              <div className="perf absolute inset-x-0 top-0 h-[2.6cqw] bg-[#4a1028]" />
              <div className="perf absolute inset-x-0 bottom-0 h-[2.6cqw] bg-[#4a1028]" />
              <div className="mt-[2.4cqw] flex items-baseline justify-between font-marquee uppercase tracking-[0.18em] text-[#c0265a]" style={cq(2.2)}>
                <span>Movie</span>
                <span>№ 131126</span>
              </div>
              <div className="mt-[1.2cqw] h-px bg-[#4a1028]/25" />
              <div className="flex flex-1 flex-col justify-center">
                <div className="font-marquee uppercase leading-[0.9] tracking-[0.04em]" style={{ ...cq(11.5), fontWeight: 500 }}>
                  Мончок
                </div>

              </div>
              <div className="mb-[2.4cqw] grid grid-cols-[1fr_1.1fr_1.25fr] gap-[2cqw] border-t border-[#4a1028]/25 pt-[1.4cqw] font-marquee uppercase" style={cq(2.1)}>
                {[
                  ['Date', '13 November 2026'],
                  ['Type', 'One little memory'],
                  ['Special note', 'A moment to remember'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="tracking-[0.16em] text-[#c0265a]">{k}</div>
                    <div className="mt-[0.4cqw] leading-[1.1] tracking-[0.05em]" style={cq(2.7)}>
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Линия отрыва */}
            <div className="relative w-0 border-l-2 border-dashed border-[#4a1028]/30">
              <span className="absolute -left-[1.6cqw] -top-[1.6cqw] h-[3.2cqw] w-[3.2cqw] rounded-full bg-night" />
              <span className="absolute -bottom-[1.6cqw] -left-[1.6cqw] h-[3.2cqw] w-[3.2cqw] rounded-full bg-night" />
            </div>

            {/* Корешок */}
            <div className="relative flex flex-1 flex-col items-center justify-between bg-[#ffe1e8] py-[4cqw]">
              <div className="font-marquee uppercase tracking-[0.2em] text-[#c0265a] [writing-mode:vertical-rl]" style={cq(2.2)}>
                Admit two
              </div>
              <div className="font-marquee [writing-mode:vertical-rl]" style={{ ...cq(3.6), fontWeight: 500 }}>
                13 · XI
              </div>
              <div className="flex h-[5cqw] items-end gap-[0.35cqw]">
                {[3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2].map((w, i) => (
                  <span key={i} className="h-full bg-[#4a1028]" style={{ width: `${w * 0.28}cqw` }} />
                ))}
              </div>
            </div>
            <div className="sweep pointer-events-none absolute inset-0" />
          </div>

          {/* ОБОРОТНАЯ СТОРОНА */}
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[1.6cqw] bg-gradient-to-br from-[#ff5c8a] to-[#d0175a] px-[6cqw] shadow-[0_30px_60px_-20px_rgba(140,20,60,0.4)] text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="absolute inset-[1.6cqw] rounded-[1cqw] border border-white/40" />
            <div className="balance font-serif italic leading-[1.2] text-white" style={cq(5.2)}>
              «Иногда самое интересное начинается после титров»
            </div>
            <div className="mt-[2cqw] h-px w-[14cqw] bg-white/60" />
            <div className="mt-[2cqw] font-marquee uppercase tracking-[0.3em] text-white/80" style={cq(1.8)}>
              Мончок · 13 November 2026
            </div>
          </div>
        </motion.div>
      </button>
      <Reveal delay={2.2} className="mt-5 text-center text-[13px] text-warm">
        {flipped ? 'Нажми ещё раз, чтобы вернуть' : 'Нажми на билет'}
      </Reveal>
    </motion.div>
  )
}

export function SceneMemory() {
  return (
    <SceneShell wide backdrop={<ProjectorBeam />}>
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <div>
          <SceneTitle en="One Little Memory">
            Один вечер.
            <br />
            Один фильм.
            <br />
            Одно воспоминание.
          </SceneTitle>
          <Accent delay={0.7}>Помнишь наш поход на «Мончок»?</Accent>
          <div className="mt-5">
            <Paras
              start={1}
              step={0.3}
              items={[
                'У каждого фильма есть своя история. Но иногда после фильма остаётся ещё одно маленькое воспоминание — уже не на экране.',
                'Мне понравилось провести тот вечер вместе.',
                'Не буду пересказывать его по минутам. Некоторые моменты приятнее просто оставить в памяти.',
              ]}
            />
          </div>
        </div>
        <Ticket />
      </div>
    </SceneShell>
  )
}

/* ───────────── 10 — THE LAST PAGE ───────────── */

export function SceneLast({ onRestart, onFinal }: { onRestart: () => void; onFinal: () => void }) {
  return (
    <SceneShell backdrop={<Horizon glow={0.16} />}>
      <SceneTitle en="The Last Page">И напоследок…</SceneTitle>
      <Paras
        start={0.6}
        step={0.25}
        items={[
          'Я мог бы просто подарить тебе цветы. Но мне захотелось сделать что-то немного необычное.',
          'Небольшую историю, в которой есть немного флирта, искренности и симпатии.',
        ]}
      />
      <Accent delay={1.3} className="my-7">
        Не знаю, какой будет следующая глава. Но мне было бы приятно написать её вместе с тобой.
      </Accent>
      <Body delay={1.7}>Спасибо, что уделила время этой маленькой истории.</Body>

      <Reveal delay={2.4} as="p" className="balance mt-12 font-script text-[clamp(34px,5.6vw,52px)] leading-[1.2] text-milk">
        Айзат, ты действительно мне нравишься.
      </Reveal>

      <Reveal delay={3.2} className="mt-12 flex flex-wrap items-center justify-between gap-6">
        <button onClick={onFinal} className="group flex min-h-[52px] items-center gap-3 rounded-full bg-gold px-7 text-[15px] font-medium text-white shadow-[0_12px_30px_-10px_rgba(225,29,92,0.6)] transition-transform hover:-translate-y-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white transition-transform group-hover:scale-150" />
          Последняя деталь
        </button>
        <button onClick={onRestart} className="flex min-h-[44px] items-center gap-2 text-[13px] text-warm transition-colors hover:text-milk">
          <RotateCcw size={14} /> Посмотреть историю заново
        </button>
      </Reveal>
    </SceneShell>
  )
}

/* ───────────── HIDDEN FINAL ───────────── */

export function FinalReveal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[58] flex items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at 50% 45%, #7a1838 0%, #4a1028 55%, #2e0818 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.8, ease: 'easeInOut' }}
      role="dialog"
      aria-label="Последняя деталь"
    >
      <motion.div
        aria-hidden
        className="absolute h-[70vmin] w-[70vmin] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,92,138,0.35) 0%, rgba(255,92,138,0.08) 40%, transparent 70%)' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.6, duration: 4, ease: 'easeOut' }}
      />
      <div className="safe-x relative text-center">
        <motion.p
          className="balance font-serif text-[clamp(30px,5.6vw,56px)] font-light italic leading-[1.2] text-[#fff0f2]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 2.6, ease: EASE }}
        >
          Продолжение ещё <br className="sm:hidden" />
          не написано…
        </motion.p>
        <motion.p
          className="balance mt-2 font-serif text-[clamp(30px,5.6vw,56px)] font-light italic leading-[1.2] text-[#ffb3c7]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.8, duration: 2.6, ease: EASE }}
        >
          Может быть, однажды.
        </motion.p>
        <motion.div
          className="mx-auto mt-10 h-px w-24 origin-center bg-[#ffb3c7]/60"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 7, duration: 1.6, ease: EASE }}
        />
        <motion.p className="mt-5 text-[12px] tracking-[0.3em] text-[#f6c3d1]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 7.6, duration: 1.6 }}>
          BETWEEN THE LINES
        </motion.p>
        <motion.p className="mt-2 text-[12px] uppercase tracking-[0.24em] text-[#ffb3c7]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 8.6, duration: 1.8 }}>
          Some stories are worth continuing.
        </motion.p>
      </div>
      <motion.button
        onClick={onClose}
        aria-label="Вернуться"
        className="absolute bottom-[max(28px,env(safe-area-inset-bottom))] left-1/2 flex min-h-[44px] -translate-x-1/2 items-center gap-2 px-4 text-[13px] text-white/50 transition-colors hover:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 10.5, duration: 1.4 }}
      >
        <X size={14} /> Вернуться
      </motion.button>
    </motion.div>
  )
}
