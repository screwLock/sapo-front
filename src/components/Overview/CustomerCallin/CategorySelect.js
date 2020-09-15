import * as React from 'react'
import Select, {components} from 'react-select'
import SimpleBar from 'simplebar-react';
import 'C:/Users/helml/Desktop/sapo-front/node_modules/simplebar-react/dist/simplebar.min.css';

class CategorySelect extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        let selectedCategory;
        if (this.props.selectedCategory != null) {
            selectedCategory = this.props.selectedCategory
        }
        else {
            selectedCategory = {
                name: ''
            }
        }
        const categoryOptions = this.props.categories.map(category => ({ value: category, label: `${category.name}` }));
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
        const groupedOptions = [
            {
                label: 'Inventory',
                options: categoryOptions,
            },
        ];
        const Input = ({ autoComplete, ...props }) => <components.Input {...props} autoComplete="new-password" />;
        return (
                <Select
                    value={{ value: selectedCategory, label: selectedCategory.name }}
                    onChange={this.props.onChange}
                    options={groupedOptions}
                    isClearable={true}
                    formatGroupLabel={formatGroupLabel}
                    components={{Input, MenuList: renderScrollbar}}
                />
        )
    }
}

export default CategorySelect