import * as React from 'react'
import styled from 'styled-components'
import { Button, Menu, MenuDivider, MenuItem, Popover } from "@blueprintjs/core";

class HeaderAccount extends React.Component {

  renderLoginOrLogout = () => {
    if(this.props.isAdminLoggedIn){
      return 'Admin Logout'
    }
    else {
      return 'Admin Login'
    }
  }

  render() {
    let text = this.renderLoginOrLogout()
    const org = this.props.authData.signInUserSession.idToken.payload.name.toUpperCase()
    return (
      <StyledHeaderAccount>
        <Popover position='bottom'>
          <Button minimal={true} large={true} icon="people" text={org} style={{ fontWeight: 'bold' }} />
          <Menu>
            <MenuItem text={text} onClick={this.props.handleAdminOpen}></MenuItem>
            <MenuDivider />
            <MenuItem text="Logout" onClick={this.props.handleLogout}></MenuItem>
          </Menu>
        </Popover>
      </StyledHeaderAccount>
    );
  }
}

const StyledHeaderAccount = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
`;


export default HeaderAccount;