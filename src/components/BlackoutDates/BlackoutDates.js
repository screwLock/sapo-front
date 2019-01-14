import * as React from 'react'
import styled from 'styled-components'
import { Button, H3, Intent, Menu, MenuItem, Popover, Position } from '@blueprintjs/core'
import { AppToaster } from '../Toaster'
import { produce } from 'immer';
import NewBlackoutDate from './NewBlackoutDate'
import BlackoutDatesTable from './BlackoutDatesTable'

class BlackoutDates extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dates: [],
      isDatesOpen: false,
      selection: '',
    }
  }

  addDate = (date) => {
    this.showToast(`Enter a Date`);
    this.setState(
      produce(draft => {
        draft.dates.push(date)
      })
    )
    //save to database
  }

  handleClick = (event) => {
    this.setState({
      selection: event.target.textContent,
      isDatesOpen: !this.state.isDatesOpen })
  }

  handleDatesOpen = () => {
    this.setState({ isDatesOpen: !this.state.isDatesOpen })
  }

  handleDeleteDate = (i) => {
    let dates = [...this.state.dates]
    //delete from database
    dates.splice(i, 1)
    this.setState({ 
      dates: dates
    })
}

showToast = (message) => {
  AppToaster.show({ message: message });
}

  render() {
    const DateSelectMenu = (
      <Menu>
          <MenuItem text="Select A Single Date" onClick={this.handleClick}/>
          <MenuItem text="Select A Date Range" onClick={this.handleClick}/>
          <MenuItem text="Select Weekdays" onClick={this.handleClick}/>
      </Menu>
  );
    return (
      <Container>
        <H3>Manage Blackout Dates</H3>
        <ButtonRow>
          <Popover content={DateSelectMenu} position={Position.RIGHT}>
            <Button intent={Intent.PRIMARY}>Add New Blackout Dates</Button>
          </Popover>
        </ButtonRow>
        <NewBlackoutDate addDate={this.addDate}
                         dates={this.state.dates}
                         isOpen={this.state.isDatesOpen}
                         handleClose={this.handleDatesOpen}
                         selection={this.state.selection}
        />
        <BlackoutDatesTable data={this.dates} 
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
export default BlackoutDates;