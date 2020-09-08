import * as React from 'react'
import DatePicker from './DatePicker'

const Header = (props) => {
    return (
        <div>
            <DatePicker {...props} />
        </div>
    )
}

export default Header;