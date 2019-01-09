import * as React from 'react'
import styled from 'styled-components'
import { Button, H3, Intent } from '@blueprintjs/core'
import { produce } from 'immer';
import NewZipcode from './NewZipcode'
import ZipcodesTable from './ZipcodesTable'
import EditZipcode from './EditZipcode'
import { AppToaster } from '../Toaster'

class Zipcodes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            zipcodes: [],
            isNewZipcodeOpen: false,
            isEditZipcodeOpen: false,
            editIndex: 0
        }
    }

    addZipcode = (zipcode) => {
        this.setState(
            produce(draft => {
                draft.zipcodes.push(zipcode)
            })
        )
        //save to database
    }

    editZipcode = (edit) => {
        let zipcodes = [...this.state.zipcodes]
        let index = this.state.editIndex
        //update in database
        console.log(zipcodes[index])
        zipcodes[index] = edit;
        console.log(zipcodes[index]);
        this.setState({ 
          zipcodes: zipcodes
        })
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
        })
    }

    handleNewZipcodeOpen = () => {
        this.setState({ isNewZipcodeOpen: !this.state.isNewZipcodeOpen })
    }

    handleEditZipcodeOpen = (index) => {
        this.handleEditIndexChange(index);
        console.log(this.state.editIndex)
        this.setState({isEditZipcodeOpen: !this.state.isEditZipcodeOpen});
    }

    handleEditIndexChange = (index) => {
        this.setState({editIndex: index})
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
                        zipcodes={this.state.zipcodes}
                />
                <ZipcodesTable data={this.state.zipcodes}
                               editZipcode={this.handleEditZipcodeOpen} 
                               delete={this.handleDeleteZipcode}
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