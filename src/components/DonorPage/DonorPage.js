import * as React from 'react'
import styled from 'styled-components'
import { Button, H3, H5, Intent, Menu, MenuItem, Popover, Position } from '@blueprintjs/core'
import produce from 'immer'
import NewDialog from './NewDialog'
import { AppToaster } from '../Toaster'
import { API } from "aws-amplify"

class DonorPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            restrictions: [],
            serviceDetails: [],
            isCategoriesOpen: false,
            selection: '',
            userConfig: {}
        }
    }

    componentDidMount = async () => {
        if (!this.props.authState) {
            return;
        }
        try {
            const userConfig = await this.getUserConfig();
            if (userConfig.categories !== null && userConfig.restrictions !== null && userConfig.serviceDetails !== null) {
                this.setState({
                    userConfig,
                    categories: userConfig.categories,
                    restrictions: userConfig.restrictions,
                    serviceDetails: userConfig.serviceDetails
                })
            }
            else {
                this.setState({ userConfig })
            }
        } catch (e) {
            alert(e);
        }
    }

    getUserConfig = () => {
        return API.get("sapo", '/users');
    }

    addListing = (listing, listingType) => {
        // category listings are single objects,
        // restrictions and serviceDetails are arrays of respective objects
        if (listingType !== 'categories') {
            let listingNames = listing.map(ls => ls.name)
            let currentNames = this.state[listingType].map(ls => ls.name)
            if (!listingNames.some(ls => currentNames.includes(ls))) {

                this.setState(
                    produce(draft => {
                        draft[listingType] = [...draft[listingType], ...listing]
                    })
                )
            }
            else {
                this.showToast(`Entry is already present`)
            }
        }
        // for categories, if the categories type already exists, merge donatables arrays
        if (listingType === 'categories') {
            if (this.state.categories.some(category => category.name === listing.name)) {
                let categoryIndex = this.state.categories.findIndex((c) => c.name === listing.name)
                let mergedDonatables = [...listing.donatables, ...this.state.categories[categoryIndex].donatables]
                // remove duplicate donatables
                let key = 'name'
                mergedDonatables = mergedDonatables.filter((e, i) => mergedDonatables.findIndex(a => a[key] === e[key]) === i);

                this.setState(
                    produce(draft => {
                        draft[listingType][categoryIndex].donatables = mergedDonatables
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
    }


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
        const donatableStyle = { marginLeft: '20px' }
        return (
            <div>
                <H5>Categories</H5>
                <ul style={ulStyle}>
                    {this.state.categories.map((category, index) => {
                        return (<li style={liStyle} key={category.name}>
                            <Button rightIcon='remove' minimal={true} onClick={this.handleDelete(index, 'categories')} />
                            {category.name}
                            <ul style={{ listStyleType: 'disc' }}>
                                {category.donatables.map((donatable, index) => {
                                    return (<li style={donatableStyle} key={donatable.name}>{donatable.name}</li>)
                                })}
                            </ul>
                        </li>)
                    })}
                </ul>
                <H5>Restrictions</H5>
                <ul style={ulStyle}>
                    {this.state.restrictions.map((restriction, index) => {
                        return (<li style={liStyle} key={restriction.name}> <Button rightIcon='remove' minimal={true} onClick={this.handleDelete(index, 'restrictions')} />{restriction.name}</li>)
                    })}
                </ul>
                <H5>Service Details</H5>
                <ul style={ulStyle}>
                    {this.state.serviceDetails.map((serviceDetail, index) => {
                        return (<li style={liStyle} key={serviceDetail.name}> <Button rightIcon='remove' minimal={true} onClick={this.handleDelete(index, 'serviceDetails')} />{serviceDetail.name}</li>)
                    })}
                </ul>
            </div>
        )
    }

    saveDetails = () => {
        return API.post("sapo", "/users", {
            body: {
                categories: this.state.categories,
                restrictions: this.state.restrictions,
                serviceDetails: this.state.serviceDetails
            }
        });
    }

    saveSettings = async () => {
        if (this.state.categories.length === 0) {
            this.showToast('Add at least one donations category')
        }
        else if (this.state.restrictions.length === 0) {
            this.showToast('Add at least one restricted item')
        }
        else if (this.state.serviceDetails.length === 0) {
            this.showToast('Add at least one service detail')
        }
        else {
            try {
                await this.saveDetails()
                this.showToast('Settings successfully saved.')
            }
            catch (e) {
                this.showToast('There was an error saving.  Try again')
            }
        }
    }

    showToast = (message) => {
        AppToaster.show({ message: message });
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
                <ButtonRow>
                    <Button
                        text='Save'
                        onClick={this.saveSettings}
                    />
                </ButtonRow>
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