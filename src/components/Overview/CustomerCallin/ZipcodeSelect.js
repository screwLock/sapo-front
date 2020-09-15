import * as React from 'react'
import Select, {components} from 'react-select'
import styled from 'styled-components'


class ZipcodeSelect extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const groupStyles = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        };

        const formatGroupLabel = data => (
            <div style={groupStyles}>
                <span>{data.label}</span>
            </div>
        );
        const zipcodeOptions = this.props.zipcodes.map(zipcode => ({ value: zipcode.zipcode, label: zipcode.zipcode }));
        const groupedOptions = [
            {
                label: 'Zipcodes',
                options: zipcodeOptions,
            },
        ];
        const Input = ({ autoComplete, ...props }) => <components.Input {...props} autoComplete="new-password" />;
        return (
            <Select
                value={{ value: this.props.selectedZipcode, label: this.props.selectedZipcode }}
                onChange={this.props.onChange}
                options={groupedOptions}
                formatGroupLabel={formatGroupLabel}
                isClearable={true}
                components={{Input}}
            />
        )
    }
}

export default ZipcodeSelect