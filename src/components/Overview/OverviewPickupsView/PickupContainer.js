import * as React from 'react'
import styled from 'styled-components'
import { Icon } from '@blueprintjs/core'

class PickupContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { pickup, userConfig } = this.props
        let createdBy, employee;
        //need to cover old submissions before createdBy was persisted
        if (pickup.createdBy == null) {
            createdBy = 'N/A'
        }
        else if (pickup.createdBy === 'DONOR') {
            createdBy = 'DONOR'
        }
        else {
            //TODO:  Add employee contact info
            employee = userConfig.employees.find(employee => {
                return employee.ID === pickup.createdBy
            })
            // need to check if employee is not found (so probably created by admin)
            if (employee == null) {
                createdBy = 'Admin'
            } else {
                createdBy = `${employee.lastName}, ${employee.firstName}`
            }
        }
        return (
            <Container>
                <CloseIcon onClick={() => this.props.changeIsPickupContainerOpen(false)}><Icon icon='chevron-left' iconSize={25} /></CloseIcon>
                <h3>{pickup.lastName}, {pickup.firstName}</h3>
                <h3>{pickup.streetAddress}, {pickup.zipcode}</h3>
                <h5>{pickup.phoneNumber}</h5>
                <h5>{pickup.email}</h5>
                <h5>This pickup has been {pickup.status.toUpperCase()}</h5>
                <div>Order:
                    {/* this is for early pickups when donations was an array instead of an object} */}
                    {/* from here on out, donations is an object with key-value pairs of name: qty */}
                    {/* should probably delete ALL pickups before 7/8/19 from dynamoDB */}
                    {Array.isArray(pickup.donations) ? (
                        <ul>{pickup.donations.map(donation => (<li key={donation}>{donation}</li>))}</ul>
                    ) : (<ul>{Object.entries(pickup.donations).map((kv) => {
                        return (<li key={kv[0]}>{`${kv[0]} - Qty: ${kv[1]}`}</li>)
                    })} </ul>
                        )}
                </div>
                <div>Pickup Details:
                            <ul>{pickup.serviceDetails.map(detail => {
                    return (<li key={detail}>{`${detail}`}</li>)
                })
                    }</ul>
                </div>
                <div onClick={() => this.props.openPhotos(true)}>asdfaf</div>
                <div>Comments: {pickup.comments ? `${pickup.comments}` : 'None'}</div>
                <div>Submitted By: {createdBy}</div>
            </Container>
        )
    }
}

const Container = styled.div`
    border-width: 0.05em; 
    border-color: lightgrey;
    border-radius: 0.5em 0.5em 0.5em 0.5em;
    border-style: solid;
    width: 80%;
    padding-left: 1.5em;
    padding-bottom: 1.5em;
    padding-top: 25px;
    margin-top: 25px;
    margin-bottom: 25px;
`

const CloseIcon = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    cursor: pointer;
`

export default PickupContainer