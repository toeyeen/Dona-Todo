import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts, transformerDirectives } from 'unocss'
export default defineConfig({
  shortcuts: [],
  presets: [
    // Reset to default css,
    presetUno(),
    presetIcons(),
    presetAttributify(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        rubik: [
          {
            name: 'Rubik',
            weights: ['100', '200', '300', '400', '500', '600', '700', '800'],
            italic: true,
          },
        ],
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
