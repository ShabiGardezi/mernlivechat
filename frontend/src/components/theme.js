<<<<<<< HEAD
 // theme.js
=======
// theme.js
>>>>>>> 7b41ae252efcd20fe6bf32f350a36250aec2a145

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({ config })

export default theme