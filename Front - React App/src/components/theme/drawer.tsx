import { drawerAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  header: {
    bg: '#000', //change the background
  },
  overlay: {
    bg: 'blackAlpha.200', //change the background
  },
  dialog: {
    borderRadius: 'md',
    bg: `#1a1d2d`,
    
  },
})

export const drawerTheme = defineMultiStyleConfig({
  baseStyle,
})