import * as React from 'react'
import Select from 'react-select'
import styled from 'styled-components'


class ZipcodeSelect extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const zipcodeOptions = this.props.zipcodes.map(zipcode => ({ value: zipcode.zipcode, label: zipcode.zipcode }));
        return (
            <Select
                value={{ value: this.props.selectedZipcode, label: this.props.selectedZipcode }}
                onChange={this.props.onChange}
                options={zipcodeOptions}
                isClearable={true}
            />
        )
    }
}

export default ZipcodeSelect