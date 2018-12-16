
import { css, createGlobalStyle } from 'styled-components'

export const baseStyle = css`
@import url(‘https://fonts.googleapis.com/css?family=Montserrat:400,900|Roboto');
body {
  padding: 0;
  margin: 0;
  font-family: Roboto, sans-serif;
}
h1 {
  font-family: Montserrat;
}
`

export const BaseStyle = createGlobalStyle`${baseStyle}`

export default baseStyle