import * as React from 'react'
import { Grid, Cell } from "styled-css-grid"
import { withRouter } from 'react-router-dom'
import NavBar from '../Navbar/NavBar'
import Header from '../Header/Header'
import Main from '../Main'
import { AppToaster } from '../Toaster'
import { API, Auth } from "aws-amplify"

class Home extends React.Component {
    static defaultProps = {
        authData: {},
        authState: 'LoggedIn',
        onAuthStateChange: (next, data) => { console.log(`SignIn:onAuthStateChange(${next}, ${JSON.stringify(data, null, 2)})`); },
    };

    constructor(props) {
        super(props);
        this.state = {
            authData: this.props.authData,
            authState: this.props.authState,
            modalShowing: false,
            loading: false,
            error: null,
            username: this.props.authData.username || '',
            password: this.props.authData.password || '',
            user: null,
            userConfig: {},
            isAdminLoggedIn: false
        };
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

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    updateUserConfig = (key, update, jsonBody) => {
        API.post("sapo", "/users", {
            body: {
                update: update,
                key: key
            }
        }).then(response => {
            this.showToast('Successfully Saved!')
            this.setState({ userConfig: response.Attributes })
        }).catch(error => {
            this.showToast(`Save Failed. Error with Status Code ${error.response.status}`)
        })
    }

    handleAdminLogin = () => {
        this.setState({ isAdminLoggedIn: !this.state.isAdminLoggedIn })
    }

    renderAdmin = () => {
        return (
            <Grid
                columns={"150px 1fr 50px"}
                rows={"70px 1fr 45px"}
                areas={[
                    "header header  header",
                    "menu   content ads   ",
                    "footer footer  footer"
                ]}
            >
                <Cell area="header">
                    <Header {...this.props}
                        onAdminLogin={this.handleAdminLogin}
                        isAdminLoggedIn={this.state.isAdminLoggedIn}
                    />
                </Cell>
                <Cell area="menu">
                    <NavBar {...this.props} />
                </Cell>
                <Cell area="content">
                    <Main {...this.props}
                        getUserConfig={this.getUserConfig}
                        updateUserConfig={this.updateUserConfig}
                        userConfig={this.state.userConfig}
                    />
                </Cell>
            </Grid>
        )

    }

    renderNonAdmin = () => {
        return (
            <div>
                <Grid
                    columns={"150px 1fr 50px"}
                    rows={"70px 1fr 45px"}
                    areas={[
                        "header header  header",
                        "content content content",
                        "footer footer  footer"
                    ]}
                >
                    <Cell area="header">
                        <Header {...this.props} onAdminLogin={this.handleAdminLogin} />
                    </Cell>
                    <Cell area="content">
                        <Main {...this.props}
                            getUserConfig={this.getUserConfig}
                            updateUserConfig={this.updateUserConfig}
                            userConfig={this.state.userConfig}
                        />
                    </Cell>
                </Grid>
            </div>
        )
    }

    render() {
        if (this.state.isAdminLoggedIn) {
            return this.renderAdmin()
        }
        else {
            return this.renderNonAdmin()
        }
    }
}

export default withRouter(Home);