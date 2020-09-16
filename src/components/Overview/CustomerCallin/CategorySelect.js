import * as React from 'react'
import Select, { components } from 'react-select'
import SimpleBar from 'simplebar-react';
import 'C:/Users/helml/Desktop/sapo-front/node_modules/simplebar-react/dist/simplebar.min.css';

// Input needs to be outside of the render method to prevent 
// rerender of HOC components everytime input value changes
const Input = ({ autoComplete, ...props }) => <components.Input {...props} autoComplete="new-password" />;

class CategorySelect extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        /*let selectedCategory;
        if (this.props.selectedCategory != null) {
            selectedCategory = this.props.selectedCategory
        }
        else {
            selectedCategory = {
                name: ''
            }
        }
        */
        let selectedDonatable;
        if (this.props.selectedDonatable != null) {
            selectedDonatable = this.props.selectedDonatable
        }
        else {
            selectedDonatable = {
                name: ''
            }
        }
        const categoryOptions = this.props.categories.map((category, index) => ({
            label: `${category.name}`
            , index: index,
            options: category.donatables.map((donatable, index) => ({ value: donatable, index, label: `${donatable.name}` }))
        }));
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
        const filterOption = ({ label, value }, string) => {
            // default search
            if (label.includes(string) || value.hasOwnProperty(string)) return true;
          
            // check if a group as the filter string as label
            const groupOptions = categoryOptions.filter(group =>
              group.label.toLocaleLowerCase().includes(string)
            );
          
            if (groupOptions) {
              for (const groupOption of groupOptions) {
                // Check if current option is in group
                const option = groupOption.options.find(opt => opt.value === value);
                if (option) {
                  return true;
                }
              }
            }
            return false;
          };
        return (
            <Select
                value={{ value: selectedDonatable, label: selectedDonatable.name }}
                onChange={this.props.onChange}
                options={categoryOptions}
                isClearable={true}
                formatGroupLabel={formatGroupLabel}
                components={{ Input, MenuList: renderScrollbar }}
                filterOption={filterOption}
            />
        )
    }
}

export default CategorySelect