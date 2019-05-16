import * as React from 'react'
import styled from 'styled-components'
import produce from 'immer'
import { Button, H3, Intent, Menu, MenuItem, NumericInput, Popover, Position } from '@blueprintjs/core'

class MaxPickups extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            maxPickups: {
                monday: 5,
                tuesday: 5,
                wednesday: 5,
                thursday: 5,
                friday: 5,
                saturday: 5,
                sunday: 5,
            }
        }
    }

    componentDidMount = async () => {
        if (!this.props.authState) {
            return;
        }
        if (this.props.userConfig.maxPickups != null) {
            this.setState({ maxPickups: this.props.userConfig.maxPickups });
        }
    }

    handleChange = (name) => (number) => {
        this.setState(produce(draft => {
            draft.maxPickups[name] = number;
        })
        )
    }

    handleSubmit = async () => {
        try {
            await this.props.updateUserConfig('maxPickups', this.state.maxPickups, { maxPickups: this.state.maxPickups })
        }
        catch(e) {
            console.log(e)
        }
    }

    render() {
        return (
            <Container>
                <H3>Set the Daily Max for Pickups</H3>
                <NumericInputsContainer>
                    {Object.keys(this.state.maxPickups).map((key) => (
                        <NumericInputContainer key={key}>
                            <span>{key.toUpperCase()}</span>
                            <NumericInput minorStepSize={null}
                                value={this.state.maxPickups[key]}
                                max={100}
                                min={0}
                                onValueChange={this.handleChange(key)}
                            />
                        </NumericInputContainer>
                    ))}
                </NumericInputsContainer>
                <Button text='Save' onClick={this.handleSubmit}/>
            </Container>
        )
    }
}

const Container = styled.div`
    margin: 25px;
`

const NumericInputsContainer = styled.div`
    margin-left: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
`

const NumericInputContainer = styled.div`
    margin: 30px;
    width: 5px;
`

export default MaxPickups