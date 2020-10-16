import * as React from 'react'
import styled from 'styled-components'
import { Button, Classes, Intent, Dialog } from "@blueprintjs/core"
import { API } from "aws-amplify"
import { AppToaster } from '../Toaster'

class AdminDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isProcessing: false
        }
    }

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    // attributes to change:
    // custom:adminUserName1
    // custom:adminPassword1
    // this.props.admins = { admin: this.state.admin1, pass: this.state.admin1pass }
    handleSubmit = () => {
        this.setState({ isProcessing: true },
            () => {
                API.post("sapo", '/account', {
                    body: {
                        isAdmin: true,
                        adminUserName1: this.props.admins[0].admin,
                        adminPassword1: this.props.admins[0].pass
                    }
                }).then(response => {
                    this.setState({ isProcessing: false })
                    this.showToast('Successfully Saved!  You must logout to use new admin credentials')
                }).catch(error => {
                    this.setState({ isProcessing: false })
                    this.showToast(`Save Failed`)
                })
            }
        )
    }

    render() {
        return (
            <Dialog isOpen={this.props.isOpen}
                onClose={this.props.handleOpen}
                title='Save Admin Usernames and Passwords'
            >
                <DialogContainer>
                    <div>
                        {this.props.admins.map((admin, index) => {
                            return (
                                <Li>{`Admin ${index + 1}: ${admin.admin}, Password ${index + 1}: ${admin.pass}`}</Li>
                            )
                        })}
                    </div>
                    <CaptionContainer>
                        Before you submit your changes,
                        make sure you record and save these usernames
                        and passwords in a secure place!
                    </CaptionContainer>
                </DialogContainer>

                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={this.props.handleOpen} loading={this.state.isProcessing}>Cancel</Button>
                        <Button onClick={this.handleSubmit} intent={Intent.PRIMARY} loading={this.state.isProcessing}>Submit</Button>
                    </div>
                </div>
            </Dialog>
        )
    }
}

const CaptionContainer = styled.div`
    margin-top: 20px;
    font-size: 13px;
    font-style: italic;
`

const DialogContainer = styled.div`
    margin: 20px;
    margin-top: 10px;
`

const Li = styled.li`
    list-style: none;
    margin: 10px;
    font-weight: 550;
`

export default AdminDialog;