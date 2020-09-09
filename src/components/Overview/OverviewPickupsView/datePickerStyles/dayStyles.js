import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
0% {
  color: red;
}
50% {
  color: white;
}
100 {
  color: red;
}
`

const backgroundPulse = keyframes`
0% {
  background-color: red;
  color: white;
}
50% {
  background-color: white;
  color: red;
}
100 {
  background-color: red;
  color: white;
}
`

const unconfirmedSelected = {
backgroundColor: 'red',
color: 'white',
animationName: backgroundPulse,
animationDuration: '2s',
animationIterationCount: 'infinite'
}

const dayStyles = `.DayPicker-Day--unconfirmedDays {
color: red;
font-weight: 600;
animation-name: ${pulse};
animation-duration: 2s;
animation-iteration-count: infinite;
} 
.DayPicker-Day--confirmedDays {
text-decoration: underline;
}
`

export default dayStyles;
export { unconfirmedSelected };