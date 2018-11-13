import { Tab, Tabs } from "@blueprintjs/core";
import React, { Component } from 'react';
import BlackoutDatesSingleDatePicker from './BlackoutDatesSingleDatePicker.js';
import BlackoutDatesRangeDatePicker from './BlackoutDatesRangeDatePicker.js';
import BlackoutDatesWeekdays from './BlackoutDatesWeekdays';
import 'normalize.css/normalize.css';
import "@blueprintjs/core/lib/css/blueprint.css";



class BlackoutDatesTabs extends Component {
  constructor(props){
    super(props);
    this.state = {
      blackoutDates:[]
    }
  }

    render(){
      return(
        <Tabs id="blackoutDatesTab"  defaultSelectedTabId="singleDatePicker">
          <Tab id="singleDatePicker" 
               title="Single Date" 
               panel={<BlackoutDatesSingleDatePicker blackoutDates={this.state.blackoutDates}/>} 
          />
          <Tab id="rangeDatePicker" 
               title="Date Range"  
               panel={ <BlackoutDatesRangeDatePicker blackoutDates={this.state.blackoutDates}/>}
          />
          <Tab id="weekdays" title="Weekdays" panel={ <BlackoutDatesWeekdays />}/>
        </Tabs>
      );
    }
  }
  
export default BlackoutDatesTabs;

