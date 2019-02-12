import * as React from 'react'
import styled from 'styled-components'
import { Button, H3, H5, Intent, Menu, MenuItem, Popover, Position } from '@blueprintjs/core'
import produce from 'immer'
import NewDialog from './NewDialog'


class DonorPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            restrictions: [],
            serviceDetails: [],
            isCategoriesOpen: false,
            selection: ''
        }
    }

    componentDidMount() {
        this.setState({
            categories: []
        })
    }

    addListing = (listing, listingType) => {
        this.setState(
            produce(draft => {
                draft[listingType].push(listing)
            })
        )
    };

    handleClick = (event) => {
        this.setState({
            selection: event.target.textContent,
            isCategoriesOpen: !this.state.isCategoriesOpen
        })
    }

    handleCategoriesOpen = () => {
        this.setState({ isCategoriesOpen: !this.state.isCategoriesOpen })
    }

    handleDelete = (index, listingType) => () => {
        const newListings = [...this.state[listingType]];
        newListings.splice(index, 1)
        this.setState({[listingType]: newListings})
    }

    renderListings = () => {
        const liStyle = { width: '200px' }
        const ulStyle = { listStyleType: 'none', padding: '0px' }
        return (
            <div>
                <H5>Categories</H5>
                <ul style={ulStyle}>
                    {this.state.categories.map((category, index) => {
                        return (<li style={liStyle} key={index}> <Button rightIcon='remove' minimal={true} onClick={this.handleDelete(index, 'categories')} />{category.category}</li>)
                    })}
                </ul>
                <H5>Restrictions</H5>
                <ul style={ulStyle}>
                    {this.state.restrictions.map((restriction, index) => {
                        return (<li style={liStyle} key={index}> <Button rightIcon='remove' minimal={true} onClick={this.handleDelete(index, 'restrictions')} />{restriction.restriction}</li>)
                    })}
                </ul>
                <H5>Service Details</H5>
                <ul style={ulStyle}>
                    {this.state.serviceDetails.map((serviceDetail, index) => {
                        return (<li style={liStyle} key={index}> <Button rightIcon='remove' minimal={true} onClick={this.handleDelete(index, 'serviceDetails')} />{serviceDetail.serviceDetail}</li>)
                    })}
                </ul>
            </div>
        )
    }

    render() {
        const DonorSelectMenu = (
            <Menu>
                <MenuItem text="Add A New Category" onClick={this.handleClick} />
                <MenuItem text="Add A New Item Restriction" onClick={this.handleClick} />
                <MenuItem text="Add A New Service Detail" onClick={this.handleClick} />
            </Menu>
        );
        return (
            <Container>
                <H3>Design The Donor Page</H3>
                <ButtonRow>
                    <Popover content={DonorSelectMenu} position={Position.RIGHT}>
                        <Button intent={Intent.PRIMARY}>Add A New ...</Button>
                    </Popover>
                </ButtonRow>
                <NewDialog addListing={this.addListing}
                    isOpen={this.state.isCategoriesOpen}
                    handleClose={this.handleCategoriesOpen}
                    selection={this.state.selection}
                />
                {this.renderListings()}
            </Container>
        );
    }
}




const Container = styled.div`
  margin: 25px;
`

const ButtonRow = styled.div`
  margin-left: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
`

export default DonorPage;