import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import colors from '@/core/scss/_colors.module.scss'


const light: ThemeDefinition = {
  dark: false,
  colors: {
    primary: colors.primary,
    "on-surface": colors.dark,
    "on-background": colors.dark,
    background: colors.light_1,
  },
}

const dark: ThemeDefinition = {
  dark: true,
  colors: {
    primary: colors.primary,
    "on-surface": colors.light,
    "on-background": colors.light,
    background: colors.dark,
    surface: colors.dark_1

  },
}

export const vuetifyInstance = createVuetify({
  defaults: {
    global: {
      // variant:'flat',
      // color:'primary'
    },
 
    VBtn: {
      color: 'primary',
      variant: 'flat'
    },
    VList: {
      color: 'primary'
    },
    vTextField:{
      color:"primary"
    }



  },

  theme: {

    defaultTheme: 'light',
    themes: {
      light,
      dark
    }
  },
  components,
  directives,
})