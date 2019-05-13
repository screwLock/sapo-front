import * as React from 'react'
import { Button, Classes, FormGroup, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class PreviewDates extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Dialog isOpen={this.props.isOpen}
                title='Preview Dates'
                onClose={this.props.handleClose}
            >
                <div>
                    <DayPicker
                        // only show the current month for previewing
                        canChangeMonth={false}
                        disabledDays={this.props.disabledDates}
                    />
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={this.props.handleClose}>Close</Button>
                    </div>
                </div>
            </Dialog>
        )
    }
}

export default PreviewDates;
