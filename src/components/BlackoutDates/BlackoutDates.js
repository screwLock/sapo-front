import * as React from 'react'
import styled from 'styled-components'
import { Button, H3, Intent, Menu, MenuItem, Popover, Position } from '@blueprintjs/core'
import { AppToaster } from '../Toaster'
import { produce } from 'immer';
import BlackoutDatesPicker from './BlackoutDatesPicker'
import BlackoutDatesTable from './BlackoutDatesTable'

class BlackoutDates extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dates: [],
      isDialogOpen: false,
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

  handleClick = () => {
    this.setState({ isDialogOpen: true })
  }

  handleClose = () => {
    this.setState({ isDialogOpen: false})
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
    return (
      <Container>
        <H3>Manage Blackout Dates</H3>
        <Button intent={Intent.PRIMARY}
          text='Add New Blackout Dates'
          onClick={this.handleClick}
        />
        <BlackoutDatesPicker addDate={this.addDate}
          dates={this.state.dates}
          isOpen={this.state.isDialogOpen}
          handleClose={this.handleClose}
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