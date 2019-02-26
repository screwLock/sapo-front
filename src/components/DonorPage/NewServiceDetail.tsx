import * as React from 'react'
import { Button, ControlGroup, InputGroup, H3, MenuItem, RadioGroup, Radio } from "@blueprintjs/core"
import { produce } from 'immer'
import styled from 'styled-components'
import { Select } from '@blueprintjs/select'
import * as ServiceDetails from './types/ServiceDetails'
import '@blueprintjs/select/lib/css/blueprint-select.css'

class NewServiceDetail extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            selectedServiceDetail: ServiceDetails.PREPACKAGED_SERVICE_DETAILS[0] as ServiceDetails.IServiceDetail,
            radioServiceDetail: 'one',
            serviceDetails: [],
            serviceDetail: '',
        }
    }

    public render() {
        const liStyle = {width: '200px'}
        const ulStyle={ listStyleType: 'none', padding: '0px'}
        return (
            <div>
                <H3>Create a New Service Detail</H3>
                <DialogContainer>
                    <RadioGroup
                        inline={true}
                        onChange={this.handleRadioServiceDetailChange}
                        selectedValue={this.state.radioServiceDetail}
                    >
                        <Radio inline={true} label="Select A Service Detail" value='one' />
                        <Radio inline={true} label="Create A Custom Service Detail" value='two' />
                    </RadioGroup>
                    <BlockContainer>
                        {this.renderRadioServiceDetailChoice()}
                        <ul style={ulStyle}>
                            {this.state.serviceDetails.map(
                                (serviceDetail: any, index: number) =>
                                    (<li style={liStyle} key={serviceDetail.name}> <Button rightIcon='remove' minimal={true} onClick={this.handleDeleteServiceDetail(index)} />{serviceDetail.name}</li>)
                            )}
                        </ul>
                    </BlockContainer>
                </DialogContainer>
            </div>
        )
    }

    protected addServiceDetail = () => {
        if (!(this.state.serviceDetails.filter((d) => (d.name === this.state.selectedServiceDetail.name)).length > 0)) {
            this.setState(produce(draft => { draft.serviceDetails.push(draft.selectedServiceDetail) }), () => {
                this.props.createSubmittable(this.state.serviceDetails);
            })
            this.props.canSubmit(true);
            return true
        }
        else {
            return false;
        }
    }

    protected addCustomServiceDetail = () => {
        if (!(this.state.serviceDetails.filter( (sd: any) => (sd.name === this.state.serviceDetail) ).length > 0)
            && !(this.state.serviceDetail === '')) {
            const customServiceDetail = {
                name: this.state.serviceDetail,
            }
            this.setState(produce(draft => { draft.serviceDetails.push(customServiceDetail) }), () => {
                this.props.createSubmittable(this.state.serviceDetails)
            })
            this.props.canSubmit(true);
            return true;
        }
        else {
            return false;
        }
    }

    protected handleDeleteServiceDetail = (index:number) => () => {
        const newServiceDetails = [...this.state.serviceDetails];
        newServiceDetails.splice(index, 1)
        // need to ensure delete is reflected in service detail listings 
        this.props.createSubmittable(newServiceDetails)
        if(this.state.serviceDetails.length > 1) {
            this.setState({serviceDetails: newServiceDetails})
        }
        else {
            this.props.canSubmit(false)
            this.setState({serviceDetails: newServiceDetails})
        }
    }

    protected handleServiceDetailBlur = (e) => {
        this.setState({ serviceDetail: e.target.value });
    }

    protected handleServiceDetailValueChange = (serviceDetail) => {
        this.setState(produce(draft => { draft.selectedServiceDetail = serviceDetail }))
    }

    protected handleRadioServiceDetailChange = (e) => {
        this.setState({ radioServiceDetail: e.currentTarget.value })
    }

    protected renderRadioServiceDetailChoice = () => {
        const ServiceDetailSelect = Select.ofType<ServiceDetails.IServiceDetail>();
        const selectStyle = { width: '200px' }
        if (this.state.radioServiceDetail === 'one') {
            return (
                <div>
                    <ServiceDetailSelect
                        items={ServiceDetails.serviceDetailSelectProps.items}
                        itemPredicate={ServiceDetails.serviceDetailSelectProps.itemPredicate}
                        itemRenderer={ServiceDetails.serviceDetailSelectProps.itemRenderer}
                        noResults={<MenuItem disabled={true} text="No results." />}
                        onItemSelect={this.handleServiceDetailValueChange}
                    >
                        <Button
                            rightIcon="caret-down"
                            style={selectStyle}
                            text={this.state.selectedServiceDetail ? `${this.state.selectedServiceDetail.name}` : "(No selection)"}
                        />
                    </ServiceDetailSelect>
                    <Button
                        rightIcon="add"
                        onClick={this.addServiceDetail}
                        minimal={true}
                    />
                </div>
            )
        }
        else if (this.state.radioServiceDetail === 'two') {
            return (
                <ControlGroup>
                    <InputGroup placeholder="Service Detail Name" name='servicedetail' onBlur={this.handleServiceDetailBlur} />
                    <Button
                        rightIcon="add"
                        onClick={this.addCustomServiceDetail}
                        minimal={true}
                    />
                </ControlGroup>
            )
        }
        else {
            return '';
        }
    }
}

const DialogContainer = styled.div`
    width: 400px;
    margin: 20px;
`

const BlockContainer = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
`;

export default NewServiceDetail;