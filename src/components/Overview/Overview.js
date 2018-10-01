import React, { Component } from 'react';
import { Grid, Cell } from "styled-css-grid";

import OverviewMap from './OverviewMap.js';
import OverviewPickups from './OverviewPickups.js';
import OverviewDatePicker from './OverviewDatePicker.js';

class Overview extends Component {
  render() {
    return (
      <Grid columns={12}>
        <Cell width={12}><OverviewMap /></Cell>
        <Cell width={4}><OverviewDatePicker /></Cell>
        <Cell width={6}><OverviewPickups /></Cell>
      </Grid>
    );
  }
}

export default Overview;