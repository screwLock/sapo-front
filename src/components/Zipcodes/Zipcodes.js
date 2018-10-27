import * as React from 'react'
import { Grid, Cell } from "styled-css-grid"
import { Button } from '@blueprintjs/core'
import { produce } from 'immer';
import { postalCodeValidator} from './postalCodeValidator'
import ZipcodeWeekdays from './ZipcodeWeekdays'
import ZipcodeInput from './ZipcodeInput'
import { weekdays,IWeekday } from "../common_types/checkedWeekdays";
import { AppToaster } from '../Toaster'



class Zipcodes extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            zipcode: '',
            weekdays: weekdays
        }
    }


    handleBlur = (e) => {
        this.setState({zipcode: e.target.value})
    }

    handleCheckedChange = (index) => (e) => {
        this.setState(
          produce(this.state, draft => {
            draft.weekdays[index].checked = !draft.weekdays[index].checked;
          }));
      }
    
    handleClick = () => {
        if(!postalCodeValidator(this.state.zipcode)){
            this.showToast(`Enter a valid postal code`);
        }
        else if(weekdays.length === 0){
            this.showToast(`Please select at least one weekday`);
        }
        //database call
    }

    showToast = (message) => {
        AppToaster.show({ message: message });
    }
    

    render() {
        return (
            <Grid columns={12}>
                <Cell width={4}><ZipcodeInput 
                                 onBlur={this.handleBlur}
                                 onChange={this.handleChange} 
                                 value={this.state.zipcode}
                                 />
                </Cell>
                <Cell width={12}><ZipcodeWeekdays 
                                  onChange={this.handleCheckedChange}
                                  weekdays={this.state.weekdays}
                                 />
                </Cell>
                <Cell width={12}><Button onClick={this.handleClick}>Submit</Button></Cell>
            </Grid>
                );
              }
            }
            
  export default Zipcodes;