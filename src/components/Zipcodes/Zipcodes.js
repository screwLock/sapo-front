import * as React from 'react'
import styled from 'styled-components'
import { Button, H3, Intent } from '@blueprintjs/core'
import { produce } from 'immer';
import NewZipcode from './NewZipcode'
import ZipcodesTable from './ZipcodesTable'
import { AppToaster } from '../Toaster'
import columns from './columns'

class Zipcodes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            zipcodes: [],
            isZipcodeOpen: false,
        }
    }

    addZipcode = (zipcode) => {
        this.showToast(`Enter a Zipcode`);
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

    handleBlur = (e) => {
        this.setState({ zipcode: e.target.value })
    }


    handleClick = () => {
        this.setState({ isZipcodeOpen: !this.state.isZipcodeOpen })
    }

    handleZipcodeOpen = () => {
        this.setState({ isZipcodeOpen: !this.state.isZipcodeOpen })
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
                    isOpen={this.state.isZipcodeOpen}
                    handleClose={this.handleZipcodeOpen}
                />
                <ZipcodesTable data={this.state.zipcodes} columns={columns}/>
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