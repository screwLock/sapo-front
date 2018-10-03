import { Checkbox } from "@blueprintjs/core";
import * as React from 'react';
import produce from 'immer';
import 'normalize.css/normalize.css';
import "@blueprintjs/core/lib/css/blueprint.css";
import { weekdays,IWeekday } from "./checkedWeekdays"



class BlackoutDatesWeekdays extends React.Component<{},any> {
  constructor(props: any) {
    super(props)
     this.state = { 
      weekdays
    }
  }


    public render(){
      const days = this.state.weekdays;
      return(
        <div>
          {days.map( (weekday: IWeekday, index: number) => 
              <Checkbox 
                  label={weekday.day}
                  key={index}
                  checked={weekday.checked}
                  inline={true}
                  onChange={this.handleCheckedChange(index)}
              />
            )}
        </div>
 
      );
    }
    
      private handleCheckedChange = (index: number) => (e: React.FormEvent<HTMLInputElement>) => {
        this.setState(
          produce(this.state, draft => {
            draft.weekdays[index].checked = !draft.weekdays[index].checked;
          }));
      }
  }


export default BlackoutDatesWeekdays;
