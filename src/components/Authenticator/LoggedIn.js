import * as React from 'react'
import { Grid, Cell } from "styled-css-grid"
import NavBar from '../Navbar/NavBar'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import Main from '../Main'

class LoggedIn extends React.Component {
    static defaultProps = {
        authData: {},
        authState: 'LoggedIn',
        onAuthStateChange: (next, data) => { console.log(`SignIn:onAuthStateChange(${next}, ${JSON.stringify(data, null, 2)})`); }
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
            user: null
        };
    }

    render() {
        return (
            <div>
                <Grid
                    columns={"150px 1fr 50px"}
                    rows={"70px 1fr 45px"}
                    areas={[
                        "header header  header",
                        "menu   content ads   ",
                        "footer footer  footer"
                    ]}
                >
                    <Cell area="header"><Header {...this.props}/></Cell>
                    <Cell area="menu"><NavBar {...this.props}/></Cell>
                    <Cell area="content"><Main {...this.props}/></Cell>
                </Grid>
            </div>
        )
    }
}

export default LoggedIn;