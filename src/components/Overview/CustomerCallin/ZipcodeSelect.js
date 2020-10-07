import * as React from 'react'
import Select, {components} from 'react-select'
import SimpleBar from 'simplebar-react';
import '../../../../node_modules/simplebar-react/dist/simplebar.min.css';

// Input needs to be outside of the render method to prevent 
// rerender of HOC components everytime input value changes
const Input = ({ autoComplete, ...props }) => <components.Input {...props} autoComplete="new-password" />;

class ZipcodeSelect extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const renderScrollbar = props => {
            return (
              <SimpleBar style={{ maxHeight: 300 }}>{props.children}</SimpleBar>
            );
          };
        const groupStyles = {
            display: 'flex',
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
        return (
            <Select
                value={{ value: this.props.selectedZipcode, label: this.props.selectedZipcode }}
                onChange={this.props.onChange}
                options={groupedOptions}
                formatGroupLabel={formatGroupLabel}
                isClearable={true}
                components={{Input, MenuList: renderScrollbar}}
            />
        )
    }
}

export default ZipcodeSelect