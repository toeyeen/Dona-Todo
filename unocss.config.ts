import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts, transformerDirectives } from 'unocss'

export default defineConfig({
  shortcuts: [],
  presets: [
    // Reset to default css,
    presetUno(),
    presetIcons(),
    presetAttributify(),
    presetWebFonts({
      provider: 'fontshare',
      fonts: {
        'clash-display': 'Clash display',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
