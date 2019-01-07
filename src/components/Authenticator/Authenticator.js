import * as React from 'react'
import LoggedIn from './LoggedIn'
import SignIn from './SignIn'
import SignUp from './SignUp'

class Authenticator extends React.Component {
    static defaultProps = {
        initialState: 'signedIn',
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
            onAuthStateChange: (s, d) => this.onAuthStateChange(s, d)
        };

        switch (this.state.authState) {
            case 'forgotPassword':
                return <ForgotPassword {...props} />;
            case 'signUp':
                return <SignUp {...props} />;
            case 'signIn':
            case 'signedIn':
                return <LoggedIn {...props} />;
            default:
                return <SignIn {...props} />;
        };
    }

}


export default Authenticator;
