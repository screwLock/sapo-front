import * as React from 'react'
import styled from 'styled-components'
import { Button, H3, Intent } from '@blueprintjs/core'
import { produce } from 'immer';
import NewZipcode from './NewZipcode'
import ZipcodesTable from './ZipcodesTable'
import { AppToaster } from '../Toaster'

class Zipcodes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            zipcodes: [],
            isNewZipcodeOpen: false,
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

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    handleClick = () => {
        this.setState({ isNewZipcodeOpen: !this.state.isNewZipcodeOpen })
    }

    handleDeleteZipcode = (i) => {
        let zipcodes = [...this.state.zipcodes]
        zipcodes.splice(i, 1)
        this.setState({ 
          zipcodes: zipcodes
        })
      }

    handleZipcodeOpen = () => {
        this.setState({ isNewZipcodeOpen: !this.state.isNewZipcodeOpen })
    }

    render() {
        return (
            <Container>
                <H3>Manage Zipcodes</H3>
                <ButtonRow>
                    <Button intent={Intent.PRIMARY} onClick={this.handleClick}>Add New Zipcode</Button>
                </ButtonRow>
                <NewZipcode addZipcode={this.addZipcode}
                    zipcodes={this.state.zipcodes}
                    isOpen={this.state.isNewZipcodeOpen}
                    handleClose={this.handleZipcodeOpen}
                />
                <ZipcodesTable data={this.state.zipcodes} 
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