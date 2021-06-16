import { DefaultTheme } from 'styled-components'

type Palette = {
  primaryLight: string
  secondaryLight: string
  light: string
  dark: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: Palette
    spacing: (size: number) => number
    border: {
      size: {
        small: string
        medium: string
        large: string
        xLarge: string
      }
      radius: {
        smaller: string
        small: string
        medium: string
        large: string
        xLarge: string
        xxLarge: string
        max: string
      }
    }
  }
}
export const theme: DefaultTheme = {
  palette: {
    primaryLight: '#4791db',
    secondaryLight: '#e33371',
    light: '#FFFF',
    dark: '#000',
  },
  spacing: (size) => size * 10,
  border: {
    size: {
      small: '1px',
      medium: '2px',
      large: '3px',
      xLarge: '4px',
    },
    radius: {
      smaller: '4px',
      small: '5px',
      medium: '10px',
      large: '15px',
      xLarge: '20px',
      xxLarge: '40px',
      max: '100%',
    },
  },
}
