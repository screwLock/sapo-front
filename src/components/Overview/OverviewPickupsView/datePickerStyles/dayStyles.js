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

const dayStyles = `.DayPicker-Day--unconfirmedDays {
color: red;
font-weight: 800;
animation-name: ${pulse};
animation-duration: 2s;
animation-iteration-count: infinite;
} 
.DayPicker-Day--confirmedDays {
color: #33a532;
font-weight: 800;
}
`

export default dayStyles