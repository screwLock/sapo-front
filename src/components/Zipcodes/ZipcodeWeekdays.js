import { Checkbox } from "@blueprintjs/core";
import React, { Component } from 'react';
import 'normalize.css/normalize.css';
import "@blueprintjs/core/lib/css/blueprint.css";



class ZipcodeWeekdays extends Component {

    render(){
      return(
        <div>
          <Checkbox label="Sunday" inline="true"/>
          <Checkbox label="Monday" inline="true"/>
          <Checkbox label="Tuesday" inline="true"/>
          <Checkbox label="Wednesday" inline="true"/>
          <Checkbox label="Thursday" inline="true"/>
          <Checkbox label="Friday" inline="true"/>
          <Checkbox label="Saturday" inline="true"/>
        </div>
 
      );
    }
  }
  
export default ZipcodeWeekdays;
