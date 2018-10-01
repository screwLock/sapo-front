import React, { Component } from 'react';
import { Grid, Cell } from "styled-css-grid";

import ZipcodeWeekdays from './ZipcodeWeekdays.js';
import ZipcodeInput from './ZipcodeInput.js';


class Zipcodes extends Component {
    render() {
        return (
            <Grid columns={12}>
                <Cell width={2}><ZipcodeInput /></Cell>
                <Cell width={12}><ZipcodeWeekdays /></Cell>
            </Grid>
                );
              }
            }
            
  export default Zipcodes;