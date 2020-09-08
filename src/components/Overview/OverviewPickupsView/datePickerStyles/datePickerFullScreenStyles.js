const datePickerFullScreenStyles = `
.DayPicker {
    flex-direction: row;
    font-size: 2.5rem;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}

.DayPicker-wrapper {
    position: relative;
    flex-direction: row;
    user-select: none;
    width: 100%;
    margin: 0;
    padding: 0;
}

.DayPicker-Months {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
}

.DayPicker-Month {
    display: table;
    margin: 0;
    padding: 0;
    margin-top: auto;
    border-spacing: 0;
    border-collapse: collapse;
    user-select: none;
}

.DayPicker-NavBar {
    position: relative;
    margin: 0;
    padding: 0;
}

.DayPicker-NavButton {
    position: absolute;
    top: 1.4rem;
    margin-top: 2px;
    width: 1.25em;
    height: 1.25em;
    background-position: center;
    background-size: 60%;
    background-repeat: no-repeat;
    color: #8B9898;
    cursor: pointer;
    outline: none;
}

.DayPicker-NavButton:hover {
    opacity: 0.8;
}

.DayPicker-NavButton--prev {
    left: 10px;
    background-image: url('../../images/navLeft.png');
}

.DayPicker-NavButton--next {
    right: 10px;
    background-image: url('../../images/navRight.png');}

.DayPicker-NavButton--interactionDisabled {
    display: none;
}

.DayPicker-Caption {
    display: table-caption;
    border: 1px solid #e9e9e9;
    padding: 0.5em 0.5em;
    background-color: #f1f1f1;
    text-align: center;
    margin: 0;
}

.DayPicker-Caption > div {
    font-family: "Open Sans", monospace;
    font-weight: 600;
    margin: 0;
    padding: 0;
}

.DayPicker-WeekdaysRow {
    display: none;
    margin: 0;
    padding: 0;
}

/*.DayPicker-Body {
    display: table-row-group;
}*/

.DayPicker-Week {
    display: table-row;
    margin: 0;
    padding: 0;
}

.DayPicker-Day {
    display: table-cell;
    padding: 0.8em;
    vertical-align: middle;
    text-align: center;
    cursor: pointer;
    width: 6rem;
    margin: 0;
}


.DayPicker-TodayButton {
    background-color: transparent;
    background-image: none;
    box-shadow: none;
    color: #4A90E2;
    font-size: 0.875em;
    cursor: pointer;
}
`

export default datePickerFullScreenStyles