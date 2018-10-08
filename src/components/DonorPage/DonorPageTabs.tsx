import { Tab, Tabs } from "@blueprintjs/core";
import * as React from 'react';
import DonorPageCategories from './DonorPageCategories';

class DonorPageTabs extends React.Component <{},any> {
    constructor( props:any ) {
        super(props)
    }

    public render(){
        return(
            <Tabs id="donorPageTabs"  defaultSelectedTabId="categories">
              <Tab id="categories" title="Categories" panel={<DonorPageCategories/>}/>
              <Tab id="pickupDetails" title="Pickup Details"/>
              <Tab id="restrictions" title="Restrictions"/>
            </Tabs>
          );
    }
}

export default DonorPageTabs;