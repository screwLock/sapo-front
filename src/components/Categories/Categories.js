import * as React from 'react'
import styled from 'styled-components'
import { Button, H3, H5, Intent, Menu, MenuItem, Popover, Position } from '@blueprintjs/core'
import produce from 'immer'
import NewDialog from './NewDialog'
import { AppToaster } from '../Toaster'

/****
 *   Originally this was called the 'Donor Page' view, but was changed
 *   to 'Categories'.  To avoid 'categories.categories' and to avoid the
 *   problems that arise with changeing donorPage to categories throughout
 *   these files, 'donorPage' will remain unchanged in the code and the db.
 *   This deviates from the other keys in the userConfig table which correspond
 *   to the name of the view, so keep in mind that donorPage is the top level
 *   key, and that donorPage.categories refers to pickup categories, not the 
 *   name of the view (Categories).
 * 
 ****/

class Categories extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            restrictions: [],
            serviceDetails: [],
            isNewDialogOpen: false,
            selection: '',
        }
    }

    componentDidMount = async () => {
        if (!this.props.authState) {
            return;
        }
        // need to also check for this.props.userConfig.donorPage
        // due to the added to updateUserConfig used below
        let userConfig = this.props.userConfig;
        if (userConfig.donorPage != null){
            userConfig = userConfig.donorPage;
            this.setState({
                categories: userConfig.categories,
                restrictions: userConfig.restrictions,
                serviceDetails: userConfig.serviceDetails
            })
        }
        else if (userConfig.categories != null && userConfig.restrictions != null && userConfig.serviceDetails != null) {
            this.setState({
                categories: userConfig.categories,
                restrictions: userConfig.restrictions,
                serviceDetails: userConfig.serviceDetails
            })
        }

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
                mergedDonatables = mergedDonatables.filter((e, i) => mergedDonatables.findIndex(a => a[key] === e[key]) === i).sort((a, b) => a.name.localeCompare(b.name));

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


    handleSelectionClick = (event) => {
        this.setState({
            selection: event.target.textContent,
            isNewDialogOpen: !this.state.isNewDialogOpen
        })
    }

    handleNewDialogOpen = () => {
        this.setState({ isNewDialogOpen: !this.state.isNewDialogOpen })
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
                        return (<li style={liStyle} key={serviceDetail.name}> <Button rightIcon='remove' minimal={true} onClick={this.handleDelete(index, 'serviceDetails')} />{serviceDetail.name}{(serviceDetail.isMandatory)? ` (mandatory)` : ''}</li>)
                    })}
                </ul>
            </div>
        )
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
                // donorPage key here is overkill
                // need to check for userConfig.donorPage in componentDidMount
                await this.props.updateUserConfig('donorPage', {
                    categories: this.state.categories,
                    restrictions: this.state.restrictions,
                    serviceDetails: this.state.serviceDetails
                },
                    {
                        categories: this.state.categories,
                        restrictions: this.state.restrictions,
                        serviceDetails: this.state.serviceDetails
                    }
                )
            }
            catch (e) {
                alert(e)
            }
        }
    }

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    render() {
        const DonorSelectMenu = (
            <Menu>
                <MenuItem text="Add A New Category" onClick={this.handleSelectionClick} />
                <MenuItem text="Add A New Item Restriction" onClick={this.handleSelectionClick} />
                <MenuItem text="Add A New Service Detail" onClick={this.handleSelectionClick} />
            </Menu>
        );
        return (
            <Container>
                <H3>Create Your Categories, Restrictions, And Service Details</H3>
                <ButtonRow>
                    <Popover content={DonorSelectMenu} position={Position.RIGHT}>
                        <Button intent={Intent.PRIMARY}>Add A New ...</Button>
                    </Popover>
                </ButtonRow>
                <NewDialog addListing={this.addListing}
                    isOpen={this.state.isNewDialogOpen}
                    handleClose={this.handleNewDialogOpen}
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

export default Categories;