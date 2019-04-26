import * as React from 'react'
import styled from 'styled-components'
import { Button, H3, Intent, Menu, MenuItem, Popover, Position } from '@blueprintjs/core'
import { AppToaster } from '../Toaster'
import { produce } from 'immer'
import { API } from "aws-amplify"
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

  componentDidMount = async () => {
    if (!this.props.authState) {
      return;
    }
    if (this.props.userConfig.blackoutDates != null) {
      this.setState({ dates: this.props.userConfig.blackoutDates });
    }
  }

  addDates = (newDates, newReason) => {
    const datesWithReason = newDates.map((dateWithoutReason) => { return { date: dateWithoutReason.toISOString(), reason: newReason } })
    if (this.state.dates) {
      this.setState(
        produce(draft => {
          draft.dates = [...draft.dates, ...datesWithReason]
        }), async () => await this.props.updateUserConfig('blackoutDates',
          this.state.dates,
          { blackoutDates: this.state.dates })
      )
    }
    else {
      this.setState(
        produce(draft => {
          draft.dates = [...datesWithReason]
        }), async () => await this.props.updateUserConfig('blackoutDates',
          this.state.dates,
          { blackoutDates: this.state.dates })
      )
    }
  }

  handleClick = () => {
    this.setState({ isDialogOpen: true })
  }

  handleClose = () => {
    this.setState({ isDialogOpen: false })
  }

  handleDeleteDate = (i) => {
    let dates = [...this.state.dates]
    dates.splice(i, 1)
    //save new dates array with removed dates in DB
    this.setState({
      dates: dates
    }, async () => await this.props.updateUserConfig('blackoutDates',
      this.state.dates,
      { blackoutDates: this.state.dates }))
  }

  render() {
    return (
      <Container>
        <H3>Manage Blackout Dates</H3>
        <ButtonRow>
          <Button intent={Intent.PRIMARY}
            text='Add New Blackout Dates'
            onClick={this.handleClick}
          />
        </ButtonRow>
        <BlackoutDatesPicker addDates={this.addDates}
          dates={this.state.dates.map((date) => { return date.date })}
          isOpen={this.state.isDialogOpen}
          handleClose={this.handleClose}
        />
        <BlackoutDatesTable data={this.state.dates}
          delete={this.handleDeleteDate}

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