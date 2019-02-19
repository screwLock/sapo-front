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
        //for categories, if the categories type already exists, merge donatables arrays
        if (listingType === 'categories') {
            if (this.state.categories.some(category => category.category === listing.category)) {
                let categoryIndex = this.state.categories.findIndex((c) => c.category === listing.category)
                this.setState(
                    produce(draft => {
                        draft[listingType][categoryIndex].donatables.concat(...listing.donatables)
                    })
                )
            }
            //else if the category type is new, add the listing as is
            else {
                this.setState(
                    produce(draft => {
                        draft[listingType].push(listing)
                    })
                )
            }
        }
        //no checks needed for other listings types
        else {
            this.setState(
                produce(draft => {
                    draft[listingType]=[...draft[listingType], ...listing]
                })
            )
        }
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
        this.setState({ [listingType]: newListings })
    }

    renderListings = () => {
        const liStyle = { width: '500px' }
        const ulStyle = { listStyleType: 'none', padding: '0px' }
        const donatableStyle = { marginLeft: '20px'}
        return (
            <div>
                <H5>Categories</H5>
                <ul style={ulStyle}>
                    {this.state.categories.map((category, index) => {
                        return (<li style={liStyle} key={index}>
                            <Button rightIcon='remove' minimal={true} onClick={this.handleDelete(index, 'categories')} />
                            {category.category}
                            <ul style={{listStyleType: 'disc'}}>
                                {category.donatables.map((donatable, index) => {
                                    return(<li style={donatableStyle} key={index}>{donatable.name}</li>)
                                })}
                            </ul>
                        </li>)
                    })}
                </ul>
                <H5>Restrictions</H5>
                <ul style={ulStyle}>
                    {this.state.restrictions.map((restriction, index) => {
                        return (<li style={liStyle} key={index}> <Button rightIcon='remove' minimal={true} onClick={this.handleDelete(index, 'restrictions')} />{restriction.name}</li>)
                    })}
                </ul>
                <H5>Service Details</H5>
                <ul style={ulStyle}>
                    {this.state.serviceDetails.map((serviceDetail, index) => {
                        return (<li style={liStyle} key={index}> <Button rightIcon='remove' minimal={true} onClick={this.handleDelete(index, 'serviceDetails')} />{serviceDetail.name}</li>)
                    })}
                </ul>
            </div>
        )
    }

    render() {
        console.log(this.state.restrictions)
        console.log(this.state.serviceDetails)
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