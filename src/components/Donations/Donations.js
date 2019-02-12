import * as React from 'react'

class Donations extends React.Component() {
    constructor(props) {
        super(props)
        this.state = {
            userConfig: {}
        }
    }

    componentDidMount = async () => {
        if (!this.props.authState) {
            return;
        }
        try {
            const userConfig = await this.getUserConfig();
            this.setState({ userConfig });
        } catch (e) {
            alert(e);
        }

        // this.setState({ isLoading: false });
    }

    getUserConfig = () => {
        return API.get("sapo", '/users');
    }

    render() {
        return (
            <Select
                items={this.state.userConfig.zipcodes}
            >
                <Button/>
            </Select>
        )
    }
}