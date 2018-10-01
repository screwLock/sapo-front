import React, { Component } from 'react';
import OverviewMap from './OverviewMap.js';
import OverviewTable from './OverviewTable.js';
import OverviewDatePicker from './OverviewDatePicker.js';

class Overview extends Component {
    render(){
      return(
        <div>
          <OverviewDatePicker />
          <OverviewMap />
          <OverviewTable />
        </div>
      );
    }
  }
  
  export default Overview;