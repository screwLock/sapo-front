import * as React from 'react'
import { Popover, Button, Menu, MenuItem } from "@blueprintjs/core";

class HeaderAccount extends React.Component {

  handleClick = () => {
    //this.props.onAuthStateChange('signIn', {});
    Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }



  render() {
    const email = this.props.authData.signInUserSession.idToken.payload.email;
    return (
      <Popover>
        <Button minimal={true} large={true} icon="user" text={email} />
        <Menu>
          <MenuItem text="Logout" onClick={this.props.handleLogout}>
          </MenuItem>
        </Menu>        
      </Popover>
    );
  }
}

export default HeaderAccount;