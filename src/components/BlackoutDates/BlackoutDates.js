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
      userConfig: {}
    }
  }

  componentDidMount = async () => {
    // if (!this.props.authState) {
    //    return;
    //}

    try {
      const userConfig = await this.getUserConfig();
      this.setState({ userConfig });
      console.log(userConfig)
    } catch (e) {
      alert(e);
    }

    // this.setState({ isLoading: false });
  }

  getUserConfig = () => {
    return API.get("sapo", '/users');
  }

  addDate = (date) => {
    this.setState(
      produce(draft => {
        draft.dates.push(date)
      })
    )
  }

  saveDates = () => {
    API.post("sapo", "/users", {
      body: {
        blackoutDates: this.state.dates
      }
    });
  }

  handleClick = () => {
    this.setState({ isDialogOpen: true })
  }

  handleClose = () => {
    this.setState({ isDialogOpen: false })
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
          save={this.saveDates}
          dates={this.state.dates}
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