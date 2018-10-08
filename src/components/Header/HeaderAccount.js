import * as React from 'react'
import { Popover, Button, Menu, MenuItem } from "@blueprintjs/core";


class HeaderAccount extends React.Component {
  render() {
    return (
      <Popover>
        <Button minimal={true} large={true} icon="user" text="John Doe" />
        <Menu>
          <MenuItem text="Logout">
          </MenuItem>
        </Menu>        
      </Popover>
    );
  }
}

export default HeaderAccount;