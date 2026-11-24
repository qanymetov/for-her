# Between the Lines

Интерактивная история — 10 сцен.
Стек: React, TypeScript, Tailwind CSS, Framer Motion, Lucide.

## Запуск
```
npm install
npm run dev
```

## Сборка
- `npm run build` — обычная сборка в `dist/` (для GitHub Pages / Netlify / Vercel)
- `npm run build:single` — всё в одном файле `dist-single/index.html`

Все тексты — в `src/content.ts` и в файлах сцен `src/scenes/`.
Музыка оригинальная: синтезируется в браузере (`src/lib/music.ts`), по умолчанию выключена.
