import { Checkbox, H5 } from "@blueprintjs/core";
import * as React from 'react';

class ZipcodeWeekdays extends React.Component{
  constructor(props) {
    super(props)
  }


    render(){
      const days = this.props.weekdays;
      return(
        <div>
          <H5>Select applicable weekdays</H5>
          {days.map( (weekday, index) => 
              <Checkbox 
                  label={weekday.day}
                  key={index}
                  checked={weekday.checked}
                  inline={true}
                  onChange={this.props.onChange(index)}
              />
            )}
        </div>
 
      );
    }
    

  }
  
export default ZipcodeWeekdays;
