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
import { Mobile, Desktop } from '../devices'

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
            accountHolder: null,
            authData: this.props.authData,
            authState: this.props.authState,
            modalShowing: false,
            loading: false,
            error: null,
            username: this.props.authData.username || '',
            password: this.props.authData.password || '',
            userConfig: null,
            isAdminLoggedIn: this.props.authData.signInUserSession.idToken.payload['custom:createdAt'] !== 'source' ? true : false,
            userAttributes: {},
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
                const accountHolder = await this.getAccountHolder();
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

    getAccountHolder = async () => {
        const authData = this.props.authData
        if (authData.attributes['custom:createdAt'] !== 'source') {
            this.setState(prevState => ({
                ...prevState,
                userAttributes: {
                    address: authData.attributes['address'] || '',
                    ein: authData.attributes['custom:ein'] || '',
                    id: authData.username,
                    org: authData.attributes['name'] || '',
                    latLng: authData.attributes['custom:LatLng']
                }
            })
            )
            return null
        }
        else {
            try {
                const accountHolder = await API.get("sapo", '/users/employees/source', {
                    'queryStringParameters': {
                        username: this.props.authData.attributes.name
                    }
                })
                this.setState(prevState => ({
                    ...prevState,
                    accountHolder: accountHolder,
                    userAttributes: {
                        address: accountHolder.UserAttributes.find(attribute => attribute.Name === 'address').Value || '',
                        ein: accountHolder.UserAttributes.find(attribute => attribute.Name === 'custom:ein').Value || '',
                        id: accountHolder.Username,
                        org: accountHolder.UserAttributes.find(attribute => attribute.Name === 'name').Value || '',
                        latLng: accountHolder.UserAttributes.find(attribute => attribute.Name === 'custom:LatLng').Value || '',
                    }
                })
                )
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    getUserConfig = () => {
        return API.get("sapo", '/users', {
            'queryStringParameters': {
                username: this.state.userAttributes.id
            }
        })
    }

    getCustomerInfo = () => {
        if (this.props.authData.attributes['custom:createdAt'] !== 'source') {
            return API.get("sapo", '/billing', {
                'queryStringParameters': {
                    'customerId': this.props.authData.signInUserSession.idToken.payload['custom:stripeID'],
                    'email': this.props.authData.signInUserSession.idToken.payload.email
                }
            })
        }
        else {
            return API.get("sapo", '/billing', {
                'queryStringParameters': {
                    'customerId': this.state.accountHolder.UserAttributes.find(attribute => attribute.Name === 'custom:stripeID').Value,
                    'email': this.state.accountHolder.UserAttributes.find(attribute => attribute.Name === 'email').Value
                }
            })
        }
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

    // If we change cognito attributes, we need a way to show that client side
    updateUserAttributes = (key, update) => {
        this.setState(prevState => ({
            userAttributes: {
                ...prevState.userAttributes,
                [key]: update
            }
        })
        )
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
                        userAttributes={this.state.userAttributes}
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
                        userAttributes={this.state.userAttributes}
                        updateUserAttributes={this.updateUserAttributes}
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
            <>
                <Desktop>
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
                                userAttributes={this.state.userAttributes}
                            />
                        </Cell>
                        <Cell area="content">
                            <Main {...this.props}
                                getUserConfig={this.getUserConfig}
                                updateUserConfig={this.updateUserConfig}
                                userConfig={this.state.userConfig}
                                updateCustomerInfo={this.updateCustomerInfo}
                                userAttributes={this.state.userAttributes}
                            />
                        </Cell>
                    </Grid>
                </Desktop>
                <Mobile>
                    <Main {...this.props}
                        getUserConfig={this.getUserConfig}
                        updateUserConfig={this.updateUserConfig}
                        userConfig={this.state.userConfig}
                        updateCustomerInfo={this.updateCustomerInfo}
                        userAttributes={this.state.userAttributes}
                    />
                </Mobile>
            </>
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