import * as React from 'react'
import styled from 'styled-components'
import { Popover, Button, Menu, MenuItem } from "@blueprintjs/core";

class HeaderAccount extends React.Component {


  render() {
    const org = this.props.authData.signInUserSession.idToken.payload['custom:organization'].toUpperCase()
    return (
      <StyledHeaderAccount>
        <Popover position='bottom'>
          <Button minimal={true} large={true} icon="people" text={org} style={{fontWeight: 'bold'}}/>
          <Menu>
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
        margin-right: 25px;
    `;

export default HeaderAccount;