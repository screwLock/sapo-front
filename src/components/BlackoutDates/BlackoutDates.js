import * as React from 'react'
import styled from 'styled-components'
import { Button, H3, Intent, Menu, MenuItem, Popover, Position } from '@blueprintjs/core'
import { AppToaster } from '../Toaster'
import { produce } from 'immer';
import BlackoutDatesSingleDatePicker from './BlackoutDatesSingleDatePicker'
import BlackoutDatesRangeDatePicker from './BlackoutDatesRangeDatePicker'
import BlackoutDatesTable from './BlackoutDatesTable'

class BlackoutDates extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dates: [],
      isSingleOpen: false,
      isRangeOpen: false,
    }
  }

  addDate = (date) => {
    this.setState(
      produce(draft => {
        draft.dates.push(date)
      })
    , () => console.log(`${this.state.dates}`))
    //save to database
  }

  handleClick = (event) => {
    if (event.target.textContent === "Select A Single Date") {
      this.setState({ isSingleOpen: true })
    }
    else if (event.target.textContent === "Select A Date Range") {
      this.setState({ isRangeOpen: true })
    }
  }

  handleOpen = (menuType) => () => {
    this.setState({ [menuType]: !this.state[menuType] })
  }

  handleDeleteDate = (i) => {
    let dates = [...this.state.dates]
    //delete from database
    dates.splice(i, 1)
    this.setState({
      dates: dates
    })
  }

  render() {
    const DateSelectMenu = (
      <Menu>
        <MenuItem text="Select A Single Date" onClick={this.handleClick} />
        <MenuItem text="Select A Date Range" onClick={this.handleClick} />
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
        <BlackoutDatesSingleDatePicker addDate={this.addDate}
          dates={this.state.dates}
          isOpen={this.state.isSingleOpen}
          handleClose={this.handleOpen('isSingleOpen')}
        />
        <BlackoutDatesRangeDatePicker addDate={this.addDate}
          dates={this.state.dates}
          isOpen={this.state.isRangeOpen}
          handleClose={this.handleOpen('isRangeOpen')}
        />
        <BlackoutDatesTable data={this.state.dates}
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