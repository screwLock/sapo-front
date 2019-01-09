import * as React from 'react'
import styled from 'styled-components'
import { Popover, Button, Menu, MenuItem } from "@blueprintjs/core";

class HeaderAccount extends React.Component {


  render() {
    const email = this.props.authData.signInUserSession.idToken.payload.email;
    return (
      <StyledHeaderAccount>
        <Popover>
          <Button minimal={true} large={true} icon="user" text={email} />
          <Menu>
            <MenuItem text="Logout" onClick={this.props.handleLogout}>
            </MenuItem>
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