const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        coopmaths: {
          DEFAULT: '#469597',
          ultralight: '#f8f7f8',
          lightest: '#E5E3E4',
          // light: '#DDBEAA',
          light: '#5BA199',
          dark: '#205b6c',
          darkest: '#205b6c'
        }
      },
      fontFamily: {
        sans: ['"Lato"', ...defaultTheme.fontFamily.sans],
        // logo1: 'neoretrodrawregular',
        logo1: 'Lato',
        logo2: 'geometry_soft_probold_n',
        logo3: '"Fredoka One"',
        logo4: '"Bebas Neue"',
        logo5: '"Frente H1"',
        logo6: 'colortuberegular',
        logo7: '"Cabin Sketch"',
        logo8: '"Fredericka the Great"',
        logo9: 'jelleebold',
        logo10: '"League Gothic Condensed"',
        logo11: '"FFF Tusj"',
        logo12: 'Days'
      },
      transitionProperty: {
     ^   width: 'width'
      }
    }
  },
  variants: {
    display: ['group-hover']
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#7F00FF',
          secondary: '#FF8C5C',
          accent: '#D84010',
          neutral: '#191D24',
          'base-100': '#FFFF',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272'
        }
      }
    ]
  },
  plugins: [
    require('daisyui'),
    // Pour les tooltips
    require('@tailwindcss/forms'),
    // Pour ???
    plugin(function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    })
  ]
}

module.exports = config
