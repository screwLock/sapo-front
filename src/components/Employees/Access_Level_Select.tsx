import { Component } from "react";
import * as React from "react";
import { Button } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { accessLevelSelectProps, IAccessLevel, ACCESS_LEVELS } from "./access_levels"

const Levels = Select.ofType<IAccessLevel>();


class AccessLevelSelect extends Component {

    public state = {
        level: ACCESS_LEVELS[0] as IAccessLevel,
    };

    public render() {
        return (
            <Levels
                {...accessLevelSelectProps}
                onItemSelect={this.handleValueChange}
            >
            
                <Button
                    icon="id-number"
                    rightIcon="caret-down"
                    text={this.state.level.accessLevel? `${this.state.level.accessLevel}`: "Access Level"} 
                />
            </Levels>

        );
    }

    private handleValueChange = (level: IAccessLevel) => this.setState({ level });
}

export default AccessLevelSelect;