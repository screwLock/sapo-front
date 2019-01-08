import * as React from 'react'
import Home from './Home'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { Route, Redirect, Switch } from "react-router-dom";
import { Auth } from "aws-amplify"

class Authenticator extends React.Component {
    static defaultProps = {
        initialState: '',
        initialData: {},
        onAuthenticated: (authData) => { console.log(`onAuthenticated(${JSON.stringify(authData, null, 2)}`); }
    };

    constructor(props) {
        super(props);
        this.state = {
            authState: this.props.initialState,
            authData: this.props.initialData,
        };
    }

    handleLogout = async event => {
        await Auth.signOut();
        this.onAuthStateChange('signIn', null);
    }

    onAuthStateChange = (newState, newData) => {
        const data = Object.assign({}, this.state.authData, newData);
        this.setState({ authState: newState, authData: data });
        if (newState === 'authenticated') {
            this.props.onAuthenticated(data);
        }
    }

    render() {
        const props = {
            authData: this.state.authData,
            authState: this.state.authState,
            onAuthStateChange: (s, d) => this.onAuthStateChange(s, d),
            handleLogout: this.handleLogout,
        };

        return (
            <Switch>
                <Route exact path='/' render={() => {
                    if (this.state.authState === 'authenticated') {
                        return <Home {...props} />
                    }
                    else {
                        return <Redirect to="/signIn" />
                    }
                }} />
                <Route path='/signIn' render={() => (<SignIn {...props}/>)} />
            </Switch>
        )
        /*
        switch (this.state.authState) {
            case 'forgotPassword':
                return <ForgotPassword {...props} />;
            case 'signUp':
                return <SignUp {...props} />;
            case 'signIn':
                return <SignIn {...props} />;
            case 'authenticated':
                return <Home {...props} />;
            default:
                return <SignIn {...props} />;
        };
        */
    }
}


export default Authenticator;
