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

    handleTabChange = (newTabId) => {
        this.setState({activeTabId: newTabId})
    }

    render() {
        return (
            <Container>
                <H3>Create Your Categories, Restrictions, And Service Details</H3>
                <Tabs id="categoriesTabs" onChange={this.handleTabChange} selectedTabId={this.state.activeTabId}>
                    <Tab id="categories" title="Categories" panel={<NewCategory {...this.props}/>} />
                    <Tab id="restrictions" title="Restrictions" panel={<NewRestriction {...this.props}/>} />
                    <Tab id="serviceDetails" title="Service Details" panel={<NewServiceDetail {...this.props}/>} />
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