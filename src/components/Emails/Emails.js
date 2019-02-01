import * as React from 'react'
import styled from 'styled-components'
import { Button, FormGroup, InputGroup, H3, Intent, Menu, MenuItem, Popover, Position, TextArea } from '@blueprintjs/core'
import produce from 'immer'
import { AppToaster } from '../Toaster'
import { API } from "aws-amplify"


class Emails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messageBody: '',
            fromAddress: '',
            subjectLine: '',
            ccAddress: '',
            ccAddresses: [],
            userConfig: {}
        }
    }

    componentDidMount = async () => {
        if (!this.props.authState) {
          return;
        }
        try {
          const userConfig = await this.getUserConfig();
          if (userConfig.emails !== null) {
            this.setState({ userConfig, emails: userConfig.emails }, () => {
                this.getPrevSettings(this.state.userConfig.emails)
            });
          }
          else {
            this.setState({ userConfig })
          }
        } catch (e) {
          alert(e);
        }
    }

    getUserConfig = () => {
        return API.get("sapo", '/users');
    }

    saveEmail = () => {
        API.post("sapo", "/users", {
          body: {
            emails: {
                fromAddress: this.state.fromAddress,
                ccAddresses: this.state.ccAddresses,
                subjectLine: this.state.subjectLine,
                messageBody: this.state.messageBody,
            }
          }
        });
    }

    getPrevSettings = (settings) => {
        this.setState({
            fromAddress: settings.fromAddress,
            ccAddresses: settings.ccAddresses,
            subjectLine: settings.subjectLine,
            messageBody: settings.messageBody
        })
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    saveSettings = async () => {
        if(this.state.fromAddress.length === 0){
            this.showToast('FROM email address required')
        }
        else if(this.state.subjectLine.length === 0){
            this.showToast('Subject line required')
        }
        else {
            await this.saveEmail();
        }
    }

    handleAddClick = () => {
        if (!(this.state.ccAddresses.filter((cc) => (cc === this.state.ccAddress)).length > 0) &&
            !(this.state.ccAddress === '')) {
            this.setState(produce(draft => { draft.ccAddresses.push(draft.ccAddress) }))
        }
    }

    handleDelete = (index) => {
        this.setState({
            ccAddresses: this.state.ccAddresses.filter(function (e, i) {
            return i !== index;
                })
        })
    }

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    renderListItem = (data) => {
        return (
            <div>
                {data.map((d, index) => {
                    return (<li key={index}>{d}
                            <Button intent={Intent.NONE}
                                icon="cross"
                                minimal={true}
                                onClick={() => this.handleDelete(index)}
                            /></li>)
                })}
            </div>
        )
    }

    render() {
        const renderAddCC = (
            <Button minimal={true} text='Add Address' onClick={this.handleAddClick} />
        )
        return (
            <Container>
                <H3>Manage Emails</H3>
                <SettingsContainer>
                    <FormGroup
                        label="FROM address"
                    >
                        <InputGroup name="fromAddress" onChange={this.handleChange} value={this.state.fromAddress}/>
                    </FormGroup>
                    <FormGroup
                        label="CC addresses"
                    >
                        <InputGroup name="ccAddress" onChange={this.handleChange} rightElement={renderAddCC} />
                    </FormGroup>
                    {this.renderListItem(this.state.ccAddresses)}
                    <FormGroup
                        label="Subject Line"
                    >
                        <InputGroup name="subjectLine" onChange={this.handleChange} value={this.state.subjectLine}/>
                    </FormGroup>
                    <FormGroup
                        label='Message Body'
                    >
                        <TextArea
                            small={true}
                            intent={Intent.PRIMARY}
                            onChange={this.handleChange}
                            value={this.state.messageBody}
                            fill={true}
                            name='messageBody'
                        />
                    </FormGroup>
                    <ButtonRow>
                        <Button
                            text='Save'
                            onClick={this.saveSettings}
                        />
                    </ButtonRow>
                </SettingsContainer>
            </Container>
        );
    }
}




const Container = styled.div`
  margin: 25px;
`

const ButtonRow = styled.div`
  margin-left: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
`

const SettingsContainer = styled.div`
    margin-left: 20px;
    width: 500px;
`

export default Emails;