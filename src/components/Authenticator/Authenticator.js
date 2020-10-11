import * as React from 'react'
import Home from './Home'
import SignIn from './SignIn'
import SignUp from './SignUp'
import ForgotPassword from './ForgotPassword'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { Auth } from "aws-amplify"

class Authenticator extends React.Component {
    static defaultProps = {
        initialState: false,
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

    /**
     * componentDidMount(){
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          this.setState({ authState: true, authData: loggedInUser});
        }
     * }
     * 
     * 
    */

    handleLogout = async event => {
        await Auth.signOut();
        // localStorage.clear();
        this.onAuthStateChange(false, null);
    }

    onAuthStateChange = (newState, newData) => {
        const data = Object.assign({}, this.state.authData, newData);
        this.setState({ authState: newState, 
                        authData: data, 
                    });
        /* if (newState === true) {
            this.props.onAuthenticated(data);
        }*/
    }

    render() {
        const props = {
            authData: this.state.authData,
            authState: this.state.authState,
            onAuthStateChange: (s, d) => this.onAuthStateChange(s, d),
            handleLogout: this.handleLogout,
        };

        return (
            <Router>
                <Switch>
                    <Route path='/signIn' render={() => (<SignIn {...props} />)} />
                    <Route path='/signUp' render={() => (<SignUp {...props} />)} />
                    <Route path='/forgotPassword' render={() => (<ForgotPassword {...props} />)} />
                    <Route path='/' render={() => {
                        if (this.state.authState === true) {
                            return <Home {...props} />
                        }
                        else {
                            return <Redirect to="/signIn" />
                        }
                    }} />
                </Switch>
            </Router>
        )
    }
}


export default Authenticator;
