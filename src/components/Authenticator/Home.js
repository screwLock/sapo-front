import * as React from 'react'
import { Grid, Cell } from "styled-css-grid"
import { withRouter } from 'react-router-dom'
import NavBar from '../Navbar/NavBar'
import Header from '../Header/Header'
import Main from '../Main'
import Unpaid from './Unpaid/Unpaid'
import LoadingScreen from './LoadingScreen'
import { AppToaster } from '../Toaster'
import { API } from "aws-amplify"

class Home extends React.Component {
    static defaultProps = {
        authState: 'LoggedIn',
        onAuthStateChange: (next, data) => { console.log(`SignIn:onAuthStateChange(${next}, ${JSON.stringify(data, null, 2)})`); },
        delinquent: false,
        plan: '',
        nextStatement: '',
        membership: '',
        last4: ''
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
            userConfig: null,
            isAdminLoggedIn: false
        };
    }

    componentDidMount = async () => {
        if (!this.props.authState) {
            return;
        }
        /*
         * do while loop do to occasional 500 error from aws.
         * keep on look out for additional errors
         * also, maybe counter should be included... 
         */
        do {
            try {
                const userConfig = await this.getUserConfig();
                const customerInfo = await this.getCustomerInfo();
                this.setState({
                    userConfig: userConfig,
                    delinquent: customerInfo.delinquent,
                    plan: customerInfo.plan,
                    nextStatement: customerInfo.nextStatement,
                    membership: customerInfo.membership,
                    last4: customerInfo.last4,
                }
                );
            } catch (e) {
                console.error(e);
                continue;
            } break;
        } while (true)

        // this.setState({ isLoading: false });
    }

    getUserConfig = () => {
        return API.get("sapo", '/users');
    }

    getCustomerInfo = () => {
        return API.get("sapo", '/billing', {
            'queryStringParameters': {
                'customerId': this.props.authData.signInUserSession.idToken.payload['custom:stripeID'],
                'email': this.props.authData.signInUserSession.idToken.payload.email
            }
        });
    }

    updateCustomerInfo = async () => {
        const customerInfo = await this.getCustomerInfo()
        this.setState({
            delinquent: customerInfo.delinquent,
            plan: customerInfo.plan,
            nextStatement: customerInfo.nextStatement,
            membership: customerInfo.membership,
            last4: customerInfo.last4
        }
        );
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
                    "menu   content content",
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
                        updateCustomerInfo={this.updateCustomerInfo}
                        membership={this.state.membership}
                        nextStatement={this.state.nextStatement}
                        last4={this.state.last4}
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
                        <Header {...this.props}
                            onAdminLogin={this.handleAdminLogin}
                        />
                    </Cell>
                    <Cell area="content">
                        <Main {...this.props}
                            getUserConfig={this.getUserConfig}
                            updateUserConfig={this.updateUserConfig}
                            userConfig={this.state.userConfig}
                            updateCustomerInfo={this.updateCustomerInfo}
                        />
                    </Cell>
                </Grid>
            </div>
        )
    }

    render() {
        const cancelPlanId = 'plan_FELBVjWmU3oVJl'
        if (this.state.delinquent === true || this.state.plan === cancelPlanId) {
            return (
                <Unpaid {...this.props}
                    membership={this.state.membership}
                    nextStatement={this.state.nextStatement}
                    updateCustomerInfo={this.updateCustomerInfo}
                />
            )
        }
        else if (this.state.isAdminLoggedIn && this.state.userConfig) {
            return this.renderAdmin()
        }
        else if (this.state.userConfig) {
            return this.renderNonAdmin()
        }
        else {
            return (
                <LoadingScreen />
            )
        }
    }
}

export default withRouter(Home);