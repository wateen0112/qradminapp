import postcssRtl from 'postcss-rtlcss'
module.exports = {
  plugins: {
    tailwindcss: {
      config: './tailwind.config.js'
    },
    autoprefixer: {},
    postcssRtl: postcssRtl()
  },
}
