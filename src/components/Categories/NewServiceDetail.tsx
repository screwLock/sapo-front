import * as React from 'react'
import { Button, Checkbox, ControlGroup, InputGroup, H3, MenuItem, RadioGroup, Radio } from "@blueprintjs/core"
import { produce } from 'immer'
import styled from 'styled-components'
import { Select } from '@blueprintjs/select'
import * as ServiceDetails from './types/ServiceDetails'
import { AppToaster } from '../Toaster'
import '@blueprintjs/select/lib/css/blueprint-select.css'

class NewServiceDetail extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            selectedServiceDetail: ServiceDetails.PREPACKAGED_SERVICE_DETAILS[0] as ServiceDetails.IServiceDetail,
            radioServiceDetail: 'one',
            serviceDetails: [],
            serviceDetail: '',
            isMandatory: false,
            canSave: false,
        }
    }

    public componentDidMount = async () => {
        if (!this.props.authState) {
            return;
        }
        if (this.props.userConfig.serviceDetails != null) {
            this.setState({
                serviceDetails: this.props.userConfig.serviceDetails
            })
        }
    }

    public render() {
        const liStyle = { width: '200px' }
        const ulStyle = { listStyleType: 'none', padding: '0px' }
        return (
            <div>
                <H3>Create a New Service Detail</H3>
                <Container>
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
                                    (<li style={liStyle} key={serviceDetail.name}> <Button rightIcon='remove' minimal={true} onClick={this.handleDeleteServiceDetail(index)} />{serviceDetail.name}{(serviceDetail.isMandatory) ? ` (mandatory)` : ''}</li>)
                            )}
                        </ul>
                    </BlockContainer>
                    <ButtonRow>
                        <Button text='Save Service Detail' disabled={!this.state.canSave} onClick={this.saveServiceDetails} />
                    </ButtonRow>
                </Container>
            </div>
        )
    }

    protected addServiceDetail = () => {
        if (!(this.state.serviceDetails.filter((d: any) => (d.name === this.state.selectedServiceDetail.name)).length > 0)) {
            this.setState(produce(draft => { draft.serviceDetails.push({ name: draft.selectedServiceDetail.name, isMandatory: this.state.isMandatory }) }))
            this.setState({ canSave: true })
            return true
        }
        else {
            return false;
        }
    }

    protected addCustomServiceDetail = () => {
        if (!(this.state.serviceDetails.filter((sd: any) => (sd.name === this.state.serviceDetail)).length > 0)
            && !(this.state.serviceDetail === '')) {
            const customServiceDetail = {
                name: this.state.serviceDetail,
                isMandatory: this.state.isMandatory
            }
            this.setState(produce(draft => { draft.serviceDetails.push(customServiceDetail) }))
            this.setState({ canSave: true })
            return true;
        }
        else {
            return false;
        }
    }

    protected handleDeleteServiceDetail = (index: number) => () => {
        const newServiceDetails = [...this.state.serviceDetails];
        newServiceDetails.splice(index, 1)
        // need to ensure delete is reflected in service detail listings 
        if (this.state.serviceDetails.length > 1) {
            this.setState({ serviceDetails: newServiceDetails })
        }
        else {
            this.setState({
                serviceDetails: newServiceDetails,
                canSave: false
            })
        }
    }

    protected handleMandatoryChange = (e: any) => {
        this.setState({ isMandatory: !this.state.isMandatory })
    }

    protected handleServiceDetailBlur = (e: any) => {
        this.setState({ serviceDetail: e.target.value });
    }

    protected handleServiceDetailValueChange = (serviceDetail: any) => {
        this.setState(produce(draft => { draft.selectedServiceDetail = serviceDetail }))
    }

    protected handleRadioServiceDetailChange = (e: any) => {
        this.setState({ radioServiceDetail: e.currentTarget.value })
    }

    protected renderRadioServiceDetailChoice = () => {
        const ServiceDetailSelect = Select.ofType<ServiceDetails.IServiceDetail>();
        const selectStyle = { width: '200px' }
        if (this.state.radioServiceDetail === 'one') {
            return (
                <div>
                    <Checkbox checked={this.state.isMandatory} label="Will this be mandatory for a pickup?" onChange={this.handleMandatoryChange} />
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
                <div>
                    <Checkbox checked={this.state.isMandatory} label="Will this be mandatory for a pickup?" onChange={this.handleMandatoryChange} />
                    <ControlGroup>
                        <InputGroup placeholder="Service Detail Name" name='servicedetail' onBlur={this.handleServiceDetailBlur} />
                        <Button
                            rightIcon="add"
                            onClick={this.addCustomServiceDetail}
                            minimal={true}
                        />
                    </ControlGroup>
                </div>
            )
        }
        else {
            return '';
        }
    }

    protected showToast = (message: string) => {
        AppToaster.show({ message: message });
    }

    protected saveServiceDetails = async () => {
        if (this.state.serviceDetails.length === 0) {
            this.showToast('Add at least one service detail')
        }
        else {
            try {
                await this.props.updateUserConfig('serviceDetails', {
                    serviceDetails: this.state.serviceDetails,
                },
                    {
                        serviceDetails: this.state.serviceDetails,
                    }
                )
            }
            catch (e) {
                alert(e)
            }
        }
    }
}

const Container = styled.div`
    width: 400px;
    margin: 20px;
`

const BlockContainer = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
`

const ButtonRow = styled.div`
  margin-left: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
`

export default NewServiceDetail;