// Оригинальная фоновая музыка, которая синтезируется прямо в браузере (Web Audio API).
// Медленные аккорды-подложка + редкие «фортепианные» ноты. Никаких сторонних записей.

type Engine = {
  ctx: AudioContext
  master: GainNode
  timers: number[]
  stopped: boolean
}

let engine: Engine | null = null

const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12)

// Am9 – Fmaj7 – Cmaj7 – G6 (каждый аккорд ~8 секунд)
const CHORDS = [
  [45, 52, 59, 60, 64],
  [41, 48, 55, 57, 64],
  [36, 43, 52, 55, 59],
  [43, 50, 55, 59, 64],
]
const MELODY = [69, 71, 72, 74, 76, 79, 81, 76, 72]
const BAR = 8

function makeReverb(ctx: AudioContext) {
  const len = ctx.sampleRate * 4
  const buf = ctx.createBuffer(2, len, ctx.sampleRate)
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c)
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6)
  }
  const conv = ctx.createConvolver()
  conv.buffer = buf
  return conv
}

function pad(e: Engine, out: AudioNode, notes: number[], t: number) {
  const { ctx } = e
  notes.forEach((n, i) => {
    const o = ctx.createOscillator()
    const o2 = ctx.createOscillator()
    const g = ctx.createGain()
    const f = ctx.createBiquadFilter()
    o.type = 'triangle'
    o2.type = 'sine'
    o.frequency.value = midi(n)
    o2.frequency.value = midi(n) * 1.003
    f.type = 'lowpass'
    f.frequency.value = 900
    const peak = i === 0 ? 0.05 : 0.028
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(peak, t + 2.5)
    g.gain.setValueAtTime(peak, t + BAR - 1.5)
    g.gain.linearRampToValueAtTime(0, t + BAR + 1.5)
    o.connect(f)
    o2.connect(f)
    f.connect(g)
    g.connect(out)
    o.start(t)
    o2.start(t)
    o.stop(t + BAR + 2)
    o2.stop(t + BAR + 2)
  })
}

function pluck(e: Engine, out: AudioNode, n: number, t: number) {
  const { ctx } = e
  const o = ctx.createOscillator()
  const h = ctx.createOscillator()
  const g = ctx.createGain()
  const hg = ctx.createGain()
  o.type = 'sine'
  h.type = 'sine'
  o.frequency.value = midi(n)
  h.frequency.value = midi(n) * 2
  hg.gain.value = 0.25
  g.gain.setValueAtTime(0, t)
  g.gain.linearRampToValueAtTime(0.06, t + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 3.2)
  o.connect(g)
  h.connect(hg)
  hg.connect(g)
  g.connect(out)
  o.start(t)
  h.start(t)
  o.stop(t + 3.4)
  h.stop(t + 3.4)
}

function schedule(e: Engine, out: AudioNode, bar: number) {
  if (e.stopped) return
  const t = e.ctx.currentTime + 0.1
  pad(e, out, CHORDS[bar % CHORDS.length], t)
  const count = 2 + Math.floor(Math.random() * 3)
  for (let i = 0; i < count; i++) {
    const at = t + 1 + Math.random() * (BAR - 2)
    pluck(e, out, MELODY[Math.floor(Math.random() * MELODY.length)], at)
  }
  e.timers.push(window.setTimeout(() => schedule(e, out, bar + 1), BAR * 1000))
}

export function startMusic() {
  if (engine) return
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
  const ctx = new Ctx()
  const master = ctx.createGain()
  master.gain.setValueAtTime(0, ctx.currentTime)
  master.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 3)
  const dry = ctx.createGain()
  dry.gain.value = 0.55
  const wet = ctx.createGain()
  wet.gain.value = 0.75
  const rev = makeReverb(ctx)
  const bus = ctx.createGain()
  bus.connect(dry)
  bus.connect(rev)
  rev.connect(wet)
  dry.connect(master)
  wet.connect(master)
  master.connect(ctx.destination)
  engine = { ctx, master, timers: [], stopped: false }
  void ctx.resume()
  schedule(engine, bus, 0)
}

export function stopMusic() {
  if (!engine) return
  const e = engine
  engine = null
  e.stopped = true
  e.timers.forEach((t) => clearTimeout(t))
  const now = e.ctx.currentTime
  e.master.gain.cancelScheduledValues(now)
  e.master.gain.setValueAtTime(e.master.gain.value, now)
  e.master.gain.linearRampToValueAtTime(0, now + 1.2)
  window.setTimeout(() => void e.ctx.close(), 1500)
}
