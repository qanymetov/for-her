import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { CityLights, LightLeak } from '../components/Backdrops'
import { Accent, EASE, Paras, Reveal, SceneShell, SceneTitle } from '../components/ui'

/* ───────────── 01 — THE BEGINNING ───────────── */

export function SceneBeginning({ onStart }: { onStart: () => void }) {
  return (
    <SceneShell
      backdrop={
        <>
          <CityLights seed={11} count={30} />
          <LightLeak className="-left-[20vw] -top-[20vh] h-[70vh] w-[70vh]" />
        </>
      }
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          className="mb-10 h-px w-[min(70vw,420px)] origin-center bg-gradient-to-r from-transparent via-goldsoft to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: [0, 1, 0.6] }}
          transition={{ delay: 0.3, duration: 2.2, ease: EASE }}
        />
        <Reveal delay={0.9} as="h1" className="balance font-serif text-[clamp(34px,6.4vw,62px)] font-light italic leading-[1.08] text-milk">
          Иногда всё начинается с мелочи.
        </Reveal>
        <div className="mt-7 max-w-[50ch] space-y-3">
          <Reveal delay={1.9} as="p" className="pretty text-[16px] font-light leading-[1.7] text-milk/75 sm:text-[17px]">
            Иногда достаточно одного разговора, одной улыбки или неожиданной встречи, чтобы обычные дни стали немного интереснее.
          </Reveal>
          <Reveal delay={2.6} as="p" className="pretty text-[16px] font-light leading-[1.7] text-milk/75 sm:text-[17px]">
            Не всегда сразу понимаешь, почему человек начинает привлекать внимание.
          </Reveal>
          <Reveal delay={3.2} as="p" className="pretty text-[16px] font-light leading-[1.7] text-milk/75 sm:text-[17px]">
            Но иногда просто хочется узнать, что будет дальше.
          </Reveal>
        </div>
        <Reveal delay={4} as="p" className="balance mt-7 font-serif text-[clamp(22px,3vw,28px)] font-light italic text-goldsoft">
          Это небольшая история. И сегодня она посвящена тебе.
        </Reveal>

        <Reveal delay={4.7} className="mt-10 font-serif text-[clamp(20px,3.4vw,28px)] tracking-[0.3em] text-goldsoft/90">
          BETWEEN THE LINES
        </Reveal>
        <Reveal delay={5} className="mt-1 text-[13px] font-light text-warm">
          Some feelings are better shown than explained.
        </Reveal>

        <Reveal delay={5.5} className="mt-10">
          <button
            onClick={onStart}
            className="group flex min-h-[52px] items-center gap-3 rounded-full bg-gold px-8 text-[15px] font-medium tracking-wide text-white shadow-[0_12px_30px_-10px_rgba(225,29,92,0.6)] transition-transform hover:-translate-y-0.5"
          >
            Начать историю
            <ArrowRight size={17} className="text-white transition-transform group-hover:translate-x-1" />
          </button>
        </Reveal>
      </div>
    </SceneShell>
  )
}

/* ───────────── 02 — A LITTLE ABOUT FEELINGS ───────────── */

export function SceneFeelings() {
  return (
    <SceneShell
      backdrop={
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-night via-[#ffe4ea] to-[#ffd3cf]" />
          <CityLights seed={29} warm count={60} />
          <LightLeak className="-right-[20vw] top-[10vh] h-[80vh] w-[80vh]" />
        </>
      }
    >
      <SceneTitle en="A Little About Feelings">Не всё можно объяснить словами</SceneTitle>
      <Paras
        start={0.6}
        step={0.4}
        items={[
          'Бывает, что человек постепенно становится частью твоих мыслей.',
          'Ты можешь заниматься обычными делами, обсуждать совершенно разные вещи, но потом неожиданно вспоминаешь какую-то фразу, интонацию или улыбку.',
          'И даже не замечаешь, как начинаешь ждать следующего разговора.',
        ]}
      />
      <Accent delay={2} className="mt-8">
        Наверное, именно так и появляется интерес к человеку.
      </Accent>
    </SceneShell>
  )
}

/* ───────────── 03 — THE LITTLE THINGS ───────────── */

function VoiceWave() {
  return (
    <svg viewBox="0 0 300 120" className="h-full w-full" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = 12 + i * 8
        return (
          <motion.g key={i} style={{ originX: '150px', originY: '60px' }} animate={{ scaleY: [1, -1, 1] }} transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: 'easeInOut' }}>
            <path
              d={`M10 60 C 70 ${60 - a}, 110 ${60 + a}, 150 60 S 230 ${60 - a}, 290 60`}
              fill="none"
              stroke="#e11d5c"
              strokeWidth={i === 2 ? 1.4 : 0.7}
              opacity={1 - Math.abs(i - 2) * 0.28}
            />
          </motion.g>
        )
      })}
    </svg>
  )
}

export function SceneLittleThings() {
  const lines = [
    'Нравится, как ты разговариваешь, как выражаешь свои мысли, как реагируешь на разные вещи.',
    'В тебе есть что-то особенное.',
    'Иногда это проявляется в совершенно обычных моментах, которые, возможно, ты сама даже не замечаешь.',
  ]
  return (
    <SceneShell backdrop={<div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(255,92,138,0.09), transparent 60%)' }} />}>
      <SceneTitle en="The Little Things">Иногда именно мелочи привлекают больше всего</SceneTitle>
      <Reveal delay={0.8} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
        <p className="font-serif text-[clamp(30px,4.6vw,44px)] font-light italic leading-[1.15] text-goldsoft">Мне нравится твой голос.</p>
        <div className="h-[56px] w-[190px] flex-none sm:h-[70px] sm:w-[230px]">
          <VoiceWave />
        </div>
      </Reveal>
      <div className="mt-7 space-y-5">
        {lines.map((l, i) => (
          <Reveal key={l} delay={1.6 + i * 0.9} y={10} as="p" className="pretty max-w-[56ch] text-[17px] font-light leading-[1.7] text-milk/85 sm:text-[18px]">
            {l}
          </Reveal>
        ))}
      </div>
      <Reveal delay={4.6} className="mt-9 flex items-center gap-4">
        <span className="h-px w-10 bg-gold/60" />
        <p className="balance font-serif text-[clamp(21px,2.8vw,26px)] font-light italic text-milk/90">И, кажется, именно такие детали делают человека интересным.</p>
      </Reveal>
    </SceneShell>
  )
}

/* ───────────── 04 — YOUR LITTLE WORLD ───────────── */

function CatArt() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
      <g fill="none" stroke="#e11d5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M78 168 C60 166 56 140 64 116 C70 98 80 92 92 90 L88 66 L100 78 C106 76 114 76 120 78 L132 66 L128 92 C140 100 144 118 140 140 C136 160 124 168 110 168 Z" />
        <motion.g style={{ originX: '112px', originY: '168px' }} animate={{ rotate: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
          <path d="M110 168 C140 170 168 160 166 136 C165 124 156 120 150 126" />
        </motion.g>
        <path d="M100 100 q3 3 6 0 M112 100 q3 3 6 0" strokeWidth="1.2" />
        <path d="M108 108 l2 2 l2 -2" strokeWidth="1.1" />
        <path d="M94 110 h-14 M94 114 l-13 4 M124 110 h14 M124 114 l13 4" strokeWidth="0.8" strokeOpacity="0.6" />
      </g>
      <line x1="40" y1="170" x2="170" y2="170" stroke="#4a1028" strokeOpacity="0.15" />
    </svg>
  )
}

function HorseArt() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
      <g fill="none" stroke="#e11d5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M112 48 L118 24 L127 48 C150 66 168 116 176 176 L130 176 C128 160 122 146 112 136 C104 140 92 146 78 150 C66 152 56 146 54 136 C52 124 58 112 66 100 C76 84 88 66 104 52 Z" />
        <motion.g animate={{ x: [0, 2, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} strokeOpacity="0.7" strokeWidth="1.1">
          <path d="M126 50 C140 62 150 80 158 104" />
          <path d="M132 46 C150 60 162 86 168 112" />
          <path d="M120 44 C126 40 132 40 136 44" />
        </motion.g>
        <circle cx="98" cy="80" r="2.2" fill="#e11d5c" stroke="none" />
        <path d="M62 126 q4 -4 8 0" strokeWidth="1.1" />
        <path d="M70 104 C84 100 100 106 112 120" strokeOpacity="0.45" strokeWidth="1" />
      </g>
      <line x1="40" y1="178" x2="180" y2="178" stroke="#4a1028" strokeOpacity="0.15" />
    </svg>
  )
}

/** Силуэт всадницы на лошади — минимальная линия, без деталей внешности */
function RiderArt() {
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="rider-sun">
          <stop offset="0" stopColor="#e11d5c" stopOpacity="0.35" />
          <stop offset="1" stopColor="#e11d5c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="170" cy="70" r="60" fill="url(#rider-sun)" />
      <motion.g
        fill="none"
        stroke="#e11d5c"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Лошадь */}
        <path d="M70 108 C70 92 88 88 120 88 C142 88 156 90 164 96 L184 62 L194 60 L212 74 C214 78 212 82 206 82 L194 78 L178 108 C172 120 160 124 150 124 L96 124 C82 124 70 120 70 108 Z" />
        <path d="M184 62 L182 52 M192 60 L193 51" strokeWidth="1.2" />
        <path d="M168 92 C174 82 180 72 186 64" strokeOpacity="0.55" strokeWidth="1" />
        <path d="M70 104 C56 106 50 118 54 140" />
        <path d="M150 124 L160 150 L158 172 M140 124 L136 150 L142 172 M96 124 L88 150 L92 172 M104 124 L110 148 L104 172" />
        {/* Всадница */}
        <path d="M126 88 C124 76 126 64 132 52" />
        <circle cx="134" cy="42" r="7" />
        <path d="M128 40 C122 42 120 50 124 56" strokeOpacity="0.7" />
        <path d="M131 62 C142 66 156 72 170 74 L190 72" strokeWidth="1.1" />
        <path d="M126 88 C132 96 136 104 132 114" />
      </motion.g>
      <line x1="30" y1="174" x2="220" y2="174" stroke="#4a1028" strokeOpacity="0.15" />
    </svg>
  )
}

export function SceneWorld() {
  const cards = [
    { label: 'CAT LOVER', Art: CatArt, wide: false },
    { label: '\u00a0', Art: HorseArt, wide: false },
    { label: 'HORSE RIDING', Art: RiderArt, wide: true },
  ]
  return (
    <SceneShell wide backdrop={<div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 75% 40%, rgba(255,92,138,0.10), transparent 55%)' }} />}>
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
        <div>
          <SceneTitle en="Your Little World">У каждого есть свой маленький мир</SceneTitle>
          <Accent delay={0.6}>Я знаю, что тебе нравятся кошки и верховая езда.</Accent>
          <div className="mt-6">
            <Paras
              start={1}
              items={[
                'Мне нравится узнавать такие небольшие детали о тебе.',
                'Ведь человек — это не только то, что он рассказывает о себе в обычных разговорах.',
                'Это ещё и его интересы, маленькие увлечения, мечты и вещи, которые вызывают улыбку.',
              ]}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {cards.map(({ label, Art, wide }, i) => (
            <motion.figure
              key={label}
              className={`overflow-hidden rounded-[14px] border border-milk/10 bg-graphite/80 ${wide ? 'col-span-2' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 + i * 0.25, duration: 1, ease: EASE }}
            >
              <div className={wide ? 'aspect-[2.2/1] p-3' : 'aspect-square p-3'}>
                <Art />
              </div>
              {label && <figcaption className="border-t border-milk/10 px-4 py-3 text-[13px] tracking-[0.22em] text-goldsoft">{label}</figcaption>}
            </motion.figure>
          ))}
        </div>
      </div>
    </SceneShell>
  )
}

/* ───────────── 05 — A LITTLE FLIRT ───────────── */

function Sparks() {
  const pts = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2
    return { x: Math.cos(a) * (90 + (i % 3) * 30), y: Math.sin(a) * (40 + (i % 4) * 14) }
  })
  return (
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2">
      {pts.map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-goldsoft"
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
          animate={{ x: p.x, y: p.y, opacity: [0, 1, 0], scale: [0.5, 1.2, 0.6] }}
          transition={{ duration: 1.6, delay: 0.1 + i * 0.03, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

export function SceneFlirt() {
  const [open, setOpen] = useState(false)
  const answer = 'Кажется, ты слишком легко умеешь отвлекать мои мысли.'
  return (
    <SceneShell backdrop={<LightLeak className="left-[30%] top-[20%] h-[60vh] w-[60vh]" />}>
      <SceneTitle en="A Little Flirt">Кажется, у меня появилась одна проблема…</SceneTitle>
      <Paras
        start={0.6}
        step={0.35}
        items={[
          'После некоторых разговоров начинаешь невольно ждать следующего.',
          'Иногда ловишь себя на том, что улыбаешься, просто вспомнив какую-нибудь мелочь.',
          'А твоё имя почему-то появляется в мыслях совершенно без приглашения.',
        ]}
      />
      <Accent delay={1.8} className="mt-6">
        И самое интересное — я даже не пытаюсь с этим бороться.
      </Accent>

      <div className="relative mt-10 min-h-[150px]">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.div key="btn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <motion.button
                onClick={() => setOpen(true)}
                className="relative min-h-[52px] rounded-full bg-gold px-7 text-[15px] font-medium text-white shadow-[0_12px_30px_-10px_rgba(225,29,92,0.6)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, rotate: [0, -2, 2, -1, 0] }}
                transition={{ opacity: { delay: 2.4, duration: 0.8 }, rotate: { delay: 3.4, duration: 0.8, repeat: Infinity, repeatDelay: 3.5 } }}
              >
                Какая ещё проблема?
              </motion.button>
            </motion.div>
          ) : (
            <motion.div key="answer" className="relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <Sparks />
              <p className="balance relative font-serif text-[clamp(26px,4.2vw,40px)] font-light italic leading-[1.25] text-milk">
                «
                {answer.split(' ').map((w, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 14, rotate: i % 2 ? 4 : -4 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: EASE }}
                  >
                    {w}
                    {i < answer.split(' ').length - 1 && '\u00a0'}
                  </motion.span>
                ))}
                »
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SceneShell>
  )
}
