import * as React from 'react'
import styled from 'styled-components'
import { Button, Menu, MenuItem, Popover } from "@blueprintjs/core";

class Notifications extends React.Component {

  render() {
    return (
      <StyledNotifications>
        <Popover position='bottom'>
          <Button minimal={true} large={true} icon="notifications" style={{ fontWeight: 'bold' }} />
          <Menu>
            <MenuItem text="date" ></MenuItem>
          </Menu>
        </Popover>
      </StyledNotifications>
    );
  }
}

const StyledNotifications = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
`;


export default Notifications;