module.exports = {
  theme: {
    extend: {
      fontFamily: {
        body: ['IBM Plex Sans', 'sans-serif']
      },
      spacing: {
        '72': '18rem'
      },
      inset: {
        '100': '100%'
      },
      colors: {
        shade: 'rgba(0, 0, 0, 0.4)'
      }
    }
  },
  variants: {
    display: ['responsive', 'hover', 'focus', 'group-hover'],
    visibility: ['responsive', 'hover', 'focus', 'group-hover']
  },
  plugins: [],
}