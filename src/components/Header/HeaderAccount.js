import * as React from 'react'
import styled from 'styled-components'
import { Button, Menu, MenuItem, Popover } from "@blueprintjs/core";

class HeaderAccount extends React.Component {

  render() {
    const org = this.props.userAttributes.org.toUpperCase()
    return (
      <StyledHeaderAccount>
        <Popover position='bottom'>
          <Button minimal={true} large={true} icon="people" text={org} style={{ fontWeight: 'bold' }} />
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
`;


export default HeaderAccount;