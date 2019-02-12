import { Checkbox, H5 } from "@blueprintjs/core";
import * as React from 'react';

class ZipcodeWeekdays extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const days = this.props.weekdays;
    return (
      <div>
        <H5>Select the Pickup Days for this Zipcode</H5>
        {days.map((weekday, index) =>
          <div>
            <span style={{width: '20px', display: 'block', margin: '5px'}}><span style={{fontWeight: '600'}}>{`${weekday.day}`}</span></span>
            <Checkbox
              label='All'
              key='All'
              name='all'
              checked={weekday.all}
              inline={true}
              disabled={false}
              onChange={this.props.onChange(index)}
            />
            <Checkbox
              label='Every 1st'
              key='1st'
              name='first'
              checked={weekday.first && !weekday.all}
              inline={true}
              disabled={weekday.all}
              onChange={this.props.onChange(index)}
            />            
            <Checkbox
              label='Every 2nd'
              key='2nd'
              name='second'
              checked={weekday.second && !weekday.all}
              inline={true}
              disabled={weekday.all}
              onChange={this.props.onChange(index)}
            />
            <Checkbox
              label='Every 3rd'
              key='3rd'
              name='third'
              checked={weekday.third && !weekday.all}
              inline={true}
              disabled={weekday.all}
              onChange={this.props.onChange(index)}
            />
            <Checkbox
              label='Every 4th'
              key='4th'
              name='fourth'
              checked={weekday.fourth && !weekday.all}
              inline={true}
              disabled={weekday.all}
              onChange={this.props.onChange(index)}
            />
            <Checkbox
              label='Every 5th'
              key='5th'
              name='fifth'
              checked={weekday.fifth && !weekday.all}
              inline={true}
              disabled={weekday.all}
              onChange={this.props.onChange(index)}
            />
          </div>
        )}
      </div>

    );
  }


}

export default ZipcodeWeekdays;
