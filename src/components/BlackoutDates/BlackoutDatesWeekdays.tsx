import { Checkbox, Button } from "@blueprintjs/core";
import * as React from 'react';
import produce from 'immer';
import { AppToaster } from '../Toaster'

import { weekdays, IWeekday } from "../common_types/checkedWeekdays"



class BlackoutDatesWeekdays extends React.Component<{}, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      weekdays
    }
  }


  public render() {
    const days = this.state.weekdays;
    return (
      <div>
        <div>
          {days.map((weekday: IWeekday, index: number) =>
            <Checkbox
              label={weekday.day}
              key={index}
              checked={weekday.checked}
              inline={true}
              onChange={this.handleCheckedChange(index)}
            />
          )}
        </div>
        <div>
          <Button onClick={this.handleClick}>Submit</Button>
        </div>
      </div>

    );
  }

  private handleCheckedChange = (index: number) => (e: React.FormEvent<HTMLInputElement>) => {
    this.setState(
      produce(this.state, draft => {
        draft.weekdays[index].checked = !draft.weekdays[index].checked;
      }));
  }

  private showToast = (message: string) => {
    AppToaster.show({message});
  }

  private handleClick = () => {
    this.showToast('weekdays sent')
  }
}




export default BlackoutDatesWeekdays;
