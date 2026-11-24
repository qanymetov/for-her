import { motion } from 'framer-motion'
import { LightLeak, Skyline } from '../components/Backdrops'
import { Accent, EASE, ParallaxLayer, Paras, Reveal, SceneShell, svgAnim } from '../components/ui'

/* ───────────── 06 — WHY YOU? ───────────── */

export function SceneWhy() {
  return (
    <SceneShell backdrop={<LightLeak className="left-[35%] -top-[10vh] h-[80vh] w-[80vh]" />}>
      <Reveal delay={0.2} className="mb-2 flex items-center gap-3 text-gold">
        <span className="h-px w-8 bg-gold/60" />
        <span className="font-serif text-[15px] italic tracking-wide">Почему именно ты?</span>
      </Reveal>
      <motion.h2
        className="font-serif text-[clamp(64px,15vw,150px)] font-light leading-[0.9] tracking-[-0.02em] text-milk"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 2, ease: EASE }}
      >
        WHY <span className="italic text-goldsoft">YOU?</span>
      </motion.h2>

      <div className="mt-9">
        <Paras start={1.2} items={['Наверное, у этого вопроса нет одного простого ответа.']} />
      </div>
      <Accent delay={1.7} className="mt-5 text-[clamp(26px,3.8vw,36px)]">
        Ты мне действительно нравишься, Айзат.
      </Accent>
      <Reveal delay={2.1} as="p" className="mt-2 text-[16px] font-light text-milk/60 sm:text-[17px]">
        Не просто как знакомая или коллега.
      </Reveal>
      <div className="mt-6">
        <Paras
          start={2.5}
          step={0.3}
          items={[
            'Мне нравится твой голос, твоя манера общения, твой характер и то, как в тебе сочетаются непосредственность и взрослый взгляд на жизнь.',
            'В тебе есть что-то, что хочется узнавать постепенно.',
            'Мне интересно, о чём ты мечтаешь, что тебя вдохновляет, что заставляет смеяться и какие истории ещё скрываются за твоей улыбкой.',
          ]}
        />
      </div>
      <Reveal delay={3.6} className="mt-9 border-l border-gold/50 pl-5">
        <p className="font-serif text-[clamp(21px,2.8vw,26px)] font-light italic leading-[1.35] text-milk/90">Я не хочу придумывать тебя в своих мыслях.</p>
        <p className="font-serif text-[clamp(21px,2.8vw,26px)] font-light italic leading-[1.35] text-goldsoft">Мне хочется узнавать настоящую тебя.</p>
      </Reveal>
    </SceneShell>
  )
}

/* ───────────── 08 — CAN'T WAIT ───────────── */

function EveningCity() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,#fff0f2 0%,#ffd9e0 40%,#ffad9a 76%,#ff8670 100%)' }} />
      <ParallaxLayer depth={6}>
        <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
          <circle cx="300" cy="660" r="160" fill="#fff3c4" opacity="0.08" />
          <circle cx="300" cy="670" r="46" fill="#fff3c4" opacity="0.35" />
          <Skyline seed={8} base={710} maxH={130} color="#d9668a" windows={0.08} count={40} />
        </svg>
      </ParallaxLayer>
      <ParallaxLayer depth={18}>
        <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
          <Skyline seed={33} base={745} maxH={95} color="#8e2148" windows={0.18} count={36} />
          <rect y="745" width="1200" height="100" fill="#8e2148" />
        </svg>
      </ParallaxLayer>
      <div className="absolute inset-x-0 top-0 h-[84%] bg-gradient-to-b from-night via-night/85 to-transparent sm:h-[70%]" />
    </div>
  )
}

export function SceneCantWait() {
  return (
    <SceneShell align="start" parallax={false} backdrop={<EveningCity />}>
      <Reveal delay={0.15} className="mb-4 flex items-center gap-3 text-gold">
        <span className="h-px w-8 bg-gold/60" />
        <span className="font-serif text-[15px] italic tracking-wide">Can’t Wait</span>
      </Reveal>
      <Reveal delay={0.3} as="h2" className="balance mb-8 font-serif text-[clamp(33px,6vw,60px)] font-light leading-[1.05] text-milk">
        Если честно, я совсем не умею ждать
      </Reveal>
      <div className="max-w-[600px] [text-shadow:0_1px_14px_#fff0f2,0_0_4px_#fff0f2]">
        <Paras
          start={0.7}
          step={0.3}
          items={[
            'Говорят, хорошие истории не нужно торопить.',
            'Но с тобой мне почему-то совсем не хочется ничего откладывать.',
            'Хочется больше разговоров, больше вечеров вместе и меньше времени между ними.',
            'Хочется, чтобы ты была рядом — не когда-нибудь потом, а уже сейчас.',
          ]}
        />
        <Accent delay={2.1} className="mt-6 text-[clamp(26px,3.6vw,34px)]">
          Скорее бы ты была моей.
        </Accent>
      </div>
    </SceneShell>
  )
}

/* ───────────── 09 — HONEST INTENTIONS ───────────── */

export function SceneOneThing() {
  const words = ['Мои', 'намерения', 'честные.']
  return (
    <SceneShell
      backdrop={
        <motion.div
          className="absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,92,138,0.16) 0%, rgba(255,92,138,0.04) 40%, transparent 68%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 3 }}
        />
      }
    >
      <div className="text-center">
        <Reveal delay={0.2} className="mb-8 font-serif text-[15px] italic tracking-wide text-gold">
          И ещё одно — самое важное
        </Reveal>
        <Reveal delay={0.6} as="p" className="font-serif text-[clamp(21px,3vw,27px)] font-light italic text-milk/80">
          Ты уже знаешь, что нравишься мне.
        </Reveal>
        <Reveal delay={1.3} as="p" className="font-serif text-[clamp(21px,3vw,27px)] font-light italic text-milk/60">
          Я говорил это не раз.
        </Reveal>
        <Reveal delay={2} as="p" className="pretty mx-auto mt-6 max-w-[48ch] text-[16px] font-light leading-[1.75] text-milk/75 sm:text-[17px]">
          Поэтому сейчас хочу сказать не о симпатии, а о том, что за ней стоит.
        </Reveal>

        <div className="relative mx-auto my-6 flex aspect-[10/9] w-[min(88vw,440px)] items-center justify-center sm:my-8">
        <motion.svg
          aria-hidden
          viewBox="0 0 200 180"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <motion.path
            d="M100 168 C40 124 8 92 8 56 C8 28 30 8 56 8 C76 8 92 20 100 38 C108 20 124 8 144 8 C170 8 192 28 192 56 C192 92 160 124 100 168 Z"
            fill="rgba(255,92,138,0.08)"
            stroke="#e11d5c"
            strokeOpacity="0.45"
            strokeWidth="0.8"
            initial={svgAnim({ pathLength: 0, opacity: 0 })}
            animate={svgAnim({ pathLength: 1, opacity: 1 })}
            transition={{ delay: 2.8, duration: 3, ease: EASE }}
          />
        </motion.svg>
        <h2 className="relative -mt-[8%] font-serif text-[clamp(36px,9vw,64px)] font-light italic leading-[1.02] tracking-[-0.02em] text-milk" aria-label="Мои намерения честные.">
          {words.map((w, i) => (
            <motion.span
              key={w}
              className={`inline-block ${i === 2 ? 'text-goldsoft' : ''}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2 + i * 0.9, duration: 1.6, ease: EASE }}
            >
              {w}
              {i < words.length - 1 && ' '}
            </motion.span>
          ))}
        </h2>
        </div>

        <Reveal delay={6.2} as="p" className="pretty mx-auto max-w-[50ch] text-[16px] font-light leading-[1.75] text-milk/80 sm:text-[17px]">
          Для меня это не игра и не лёгкое увлечение на пару вечеров.
        </Reveal>
        <Reveal delay={6.8} as="p" className="pretty mx-auto mt-3 max-w-[50ch] text-[16px] font-light leading-[1.75] text-milk/80 sm:text-[17px]">
          Мне важно относиться к тебе с уважением и всегда быть с тобой честным.
        </Reveal>
        <Reveal delay={7.4} as="p" className="pretty mx-auto mt-3 max-w-[50ch] text-[16px] font-light leading-[1.75] text-milk/80 sm:text-[17px]">
          Я хочу быть рядом и узнавать тебя по-настоящему — каждый день, а не от случая к случаю.
        </Reveal>
        <Reveal delay={8.1} as="p" className="balance mx-auto mt-7 max-w-[40ch] font-serif text-[clamp(20px,2.6vw,24px)] font-light italic text-goldsoft">
          И любое твоё решение я приму с уважением.
        </Reveal>
      </div>
    </SceneShell>
  )
}
