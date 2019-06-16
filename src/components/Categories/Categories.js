import * as React from 'react'
import styled from 'styled-components'
import { Button, H3, H5, Intent, Tab, Tabs, Popover, Position } from '@blueprintjs/core'
import produce from 'immer'
import NewCategory from './NewCategory'
import NewRestriction from './NewRestriction'
import NewServiceDetail from './NewServiceDetail'

class Categories extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTabId: 'categories',
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
                        return (<li style={liStyle} key={serviceDetail.name}> <Button rightIcon='remove' minimal={true} onClick={this.handleDelete(index, 'serviceDetails')} />{serviceDetail.name}{(serviceDetail.isMandatory) ? ` (mandatory)` : ''}</li>)
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

    handleTabChange = (newTabId) => {
        this.setState({activeTabId: newTabId})
    }

    render() {
        return (
            <Container>
                <H3>Create Your Categories, Restrictions, And Service Details</H3>
                <Tabs id="categoriesTabs" onChange={this.handleTabChange} selectedTabId={this.state.activeTabId}>
                    <Tab id="categories" title="Categories" panel={<NewCategory {...this.props}/>} />
                    <Tab id="restrictions" title="Restrictions" panel={<NewRestriction />} {...this.props}/>
                    <Tab id="serviceDetails" title="Service Details" panel={<NewServiceDetail {...this.props}/>}/>
                </Tabs>
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