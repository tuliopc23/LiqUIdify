
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import tailwindcssPostcss from '@tailwindcss/postcss';

export default {
  plugins: [
    tailwindcssPostcss({
      config: './tailwind.minimal.config.ts'
    }),
    autoprefixer(),
    cssnano({
      preset: ['default', {
        discardComments: { removeAll: true },
        reduceIdents: false,
        discardUnused: { fontFace: false, keyframes: false },
        zindex: false,
        calc: { precision: 10 }
      }]
    })
  ]
};
    