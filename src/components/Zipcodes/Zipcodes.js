import React, { Component } from 'react';
import { Grid, Cell } from "styled-css-grid";

import ZipcodeWeekdays from './ZipcodeWeekdays.tsx';
import ZipcodeInput from './ZipcodeInput.js';


class Zipcodes extends Component {
    render() {
        return (
            <Grid columns={12}>
                <Cell width={4}><ZipcodeInput /></Cell>
                <Cell width={12}><ZipcodeWeekdays /></Cell>
            </Grid>
                );
              }
            }
            
  export default Zipcodes;