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
            userConfig: {}
        }
    }

    componentDidMount = async () => {
        if (!this.props.authState) {
          return;
        }
        try {
          const userConfig = await this.getUserConfig();
          if (userConfig.zipcodes !== null) {
            this.setState({ userConfig, zipcodes: userConfig.zipcodes });
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

    addZipcode = (zipcode) => {
        this.setState(
            produce(draft => {
                draft.zipcodes.push(zipcode)
            }), async () => await this.saveZipcodes()
        )
    }

    saveZipcodes = () => {
        API.post("sapo", "/users", {
          body: {
            zipcodes: this.state.zipcodes
          }
        });
      }

    editZipcode = (edit) => {
        let zipcodes = [...this.state.zipcodes]
        let index = this.state.editIndex
        //update in database
        zipcodes[index] = edit;
        this.setState({
            zipcodes: zipcodes
        })
    }

    getEditZipcode = (index) => {
        if (this.state.zipcodes[index]) {
            this.setState({ editZipcode: { weekdays: this.state.zipcodes[index].weekdays.slice(), zipcode: this.state.zipcodes[index].zipcode }})
        }
        else {
            this.setState({ editZipcode: { weekdays: [], zipcode: '' } })
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
        this.handleEditIndexChange(index);
        this.getEditZipcode(index)
        this.setState({ isEditZipcodeOpen: !this.state.isEditZipcodeOpen });
    }

    handleEditIndexChange = (index) => {
        this.setState({ editIndex: index })
    }

    handlePreviewClose = () => {
        this.setState({ isPreviewOpen: false })
    }

    handlePreviewOpen = (dates) => {
        this.setState({ previewDisabledDates: dates })
        this.setState({ isPreviewOpen: true })
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
                    handleClose={this.handleEditZipcodeOpen}
                    index={this.state.editIndex}
                    zipcode={this.state.editZipcode}
                    key={this.state.zipcodes}
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