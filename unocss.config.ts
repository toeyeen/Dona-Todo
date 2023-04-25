import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts, transformerDirectives } from 'unocss'
export default defineConfig({
  shortcuts: [],
  presets: [
    // Reset to default css,
    presetUno(),
    presetIcons({
      collections: {
        custom: {
          logo: '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1.25" y="1.25" width="12.5" height="12.5" rx="4.75" stroke="#FCB331" stroke-width="2.5"></rect></svg>',
        },
      },
      customizations: {
        transform(svg, collection, icon) {
          // do not apply fill to this icons on this collection
          if (collection === 'custom')
            return svg.replace(/#FCB331/, 'currentColor')
        },
      },
    }),
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
        RedHatMono: [
          {
            name: 'Red Hat Mono',
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
  rules: [
    [/^(text|bg)-(.*)$/, ([, c], { theme }) => {
      if (theme.colors[c]) {
        return {
          color: theme.colors[c],
        }
      }
    }],
  ],
  theme: {
    colors: {
      primary: 'rgb(var(--primary))',
    },
  },
})
