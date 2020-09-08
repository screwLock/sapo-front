import * as React from 'react'
import DatePickerInput from './DatePickerInput'

const Header = (props) => {
    return (
        <div>
            <DatePickerInput {...props} />
        </div>
    )
}

export default Header;