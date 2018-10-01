import { Tab, Tabs } from "@blueprintjs/core";
import React, { Component } from 'react';
import BlackoutDatesSingleDatePicker from './BlackoutDatesSingleDatePicker.js';
import BlackoutDatesRangeDatePicker from './BlackoutDatesRangeDatePicker.js';
import BlackoutDatesWeekdays from './BlackoutDatesWeekdays.js';
import 'normalize.css/normalize.css';
import "@blueprintjs/core/lib/css/blueprint.css";



class BlackoutDatesTabs extends Component {

    render(){
      return(
        <Tabs id="TabsExample"  defaultSelectedTabId="singleDatePicker">
          <Tab id="singleDatePicker" title="Single Date" panel={<BlackoutDatesSingleDatePicker />} />
          <Tab id="rangeDatePicker" title="Date Range"  panel={ <BlackoutDatesRangeDatePicker />}/>
          <Tab id="weekdays" title="Weekdays" panel={ <BlackoutDatesWeekdays />}/>
        </Tabs>
      );
    }
  }
  
export default BlackoutDatesTabs;

