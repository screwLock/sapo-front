import * as React from 'react'
import styled from 'styled-components'
import { Button, H3, Intent } from '@blueprintjs/core'
import { produce } from 'immer';
import NewZipcode from './NewZipcode'
import ZipcodesTable from './ZipcodesTable'
import EditZipcode from './EditZipcode'
import PreviewDates from './PreviewDates'
import { AppToaster } from '../Toaster'
import { API } from "aws-amplify"

class Zipcodes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            zipcodes: [],
            isNewZipcodeOpen: false,
            isEditZipcodeOpen: false,
            previewDisabledDates: [],
            isPreviewOpen: false,
            editIndex: '',
            editZipcode: { zipcode: '', weekdays: []},
        }
    }

    componentDidMount = async () => {
        if (!this.props.authState) {
          return;
        }
        try {
          // const userConfig = await this.props.getUserConfig();
          if (this.props.userConfig.zipcodes !== null) {
            // this.setState({ userConfig, zipcodes: userConfig.zipcodes });
            this.setState({zipcodes: this.props.userConfig.zipcodes})
          }
          // else {
          //  this.setState({ userConfig })
          // }
        } catch (e) {
          alert(e);
        }
    }

    addZipcode = (zipcode) => {
        this.setState(
            produce(draft => {
                draft.zipcodes.push(zipcode)
            }), async () => await this.saveZipcodes()
        )
    }

    saveZipcodes = () => {
        this.props.updateUserConfig('zipcodes', this.state.zipcodes, { zipcodes: this.state.zipcodes})
      }

    editZipcode = (edit) => {
        let zipcodes = [...this.state.zipcodes]
        let index = this.state.editIndex
        //update in database
        zipcodes[index] = edit;
        this.setState({
            zipcodes: zipcodes
        }, async () => await this.saveZipcodes())
    }

    createEditZipcode = (index) => {
        if (this.state.zipcodes[index]) {
            this.setState({ editZipcode: { weekdays: this.state.zipcodes[index].weekdays.slice(),
                            zipcode: this.state.zipcodes[index].zipcode }
                        })
        }
        else {
            this.setState({ editZipcode: { weekdays: [], 
                                           zipcode: '' } 
                        })
        }
    }

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    handleNewZipcodeClick = () => {
        this.setState({ isNewZipcodeOpen: !this.state.isNewZipcodeOpen })
    }

    handleDeleteZipcode = (i) => {
        let zipcodes = [...this.state.zipcodes]
        //delete from database
        zipcodes.splice(i, 1)
        this.setState({
            zipcodes: zipcodes
        }, async () => await this.saveZipcodes())
    }

    handleNewZipcodeOpen = () => {
        this.setState({ isNewZipcodeOpen: !this.state.isNewZipcodeOpen })
    }

    handleEditZipcodeOpen = (index) => {
        // change the Edit Index to the new index
        this.setState({ editIndex: index }, 
        // now change the edit zipcode to the indexed zipcode
            () => this.createEditZipcode(index))
        // now close the dialog (can be async)
        this.setState({ isEditZipcodeOpen: !this.state.isEditZipcodeOpen })
    }

    handleEditZipcodeClose = () => {
        this.setState({ isEditZipcodeOpen: false})
    }

    handlePreviewClose = () => {
        this.setState({ isPreviewOpen: false })
    }

    handlePreviewOpen = (dates) => {
        this.setState({ previewDisabledDates: dates, isPreviewOpen: true })
        // this.setState({ isPreviewOpen: true })
    }

    render() {
        return (
            <Container>
                <H3>Manage Zipcodes</H3>
                <ButtonRow>
                    <Button intent={Intent.PRIMARY} onClick={this.handleNewZipcodeClick}>Add New Zipcode</Button>
                </ButtonRow>
                <NewZipcode addZipcode={this.addZipcode}
                    zipcodes={this.state.zipcodes}
                    isOpen={this.state.isNewZipcodeOpen}
                    handleClose={this.handleNewZipcodeOpen}
                />
                <EditZipcode editZipcode={this.editZipcode}
                    isOpen={this.state.isEditZipcodeOpen}
                    handleClose={this.handleEditZipcodeClose}
                    index={this.state.editIndex}
                    zipcode={this.state.editZipcode}
                    key={this.state.editZipcode.zipcode}
                />
                <ZipcodesTable data={this.state.zipcodes}
                    editZipcode={this.handleEditZipcodeOpen}
                    delete={this.handleDeleteZipcode}
                    isPreviewOpen={this.handlePreviewOpen}
                />
                <PreviewDates isOpen={this.state.isPreviewOpen}
                    disabledDates={this.state.previewDisabledDates}
                    handleClose={this.handlePreviewClose}
                />
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

export default Zipcodes;