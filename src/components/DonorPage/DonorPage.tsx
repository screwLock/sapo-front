import * as React from 'react';
import { Button } from '@blueprintjs/core'
import DonorPageTabs from './DonorPageTabs';
import produce from 'immer';


class DonorPage extends React.Component<{}, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            categories: []
        }
    }

    public componentDidMount() {
        this.setState({
            categories: []
        })
    }

    public render() {
        return (
            <div>
                <DonorPageTabs />
                <Button icon="page-layout">Preview Page</ Button>
            </div>
        );
    }

    public addCategory = (newCategory: any) => {
        this.setState(
            produce(draft => {
                draft.categories.push(newCategory)
            })
        )
    };
}

export default DonorPage;