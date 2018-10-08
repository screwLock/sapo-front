import * as React from 'react';
import { Button, ControlGroup, InputGroup, H3} from "@blueprintjs/core";

class DonorPageCategories extends React.Component <{},any> {
    constructor( props:any ) {
        super(props)
    }

    public render(){

        return(
            <div>
                <H3>Create a New Donation Category</H3>
                <ControlGroup {...this.state}>
                    <InputGroup placeholder="Category Name" />
                    <Button icon="plus" text="Create New Category"/>
                </ControlGroup>
            </div>
          );
    }
}

export default DonorPageCategories;