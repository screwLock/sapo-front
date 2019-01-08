import * as React from 'react'
import styled from 'styled-components'
import { Button, Classes, FormGroup, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import { Auth } from "aws-amplify"

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          code: "",
          email: "",
          password: "",
          codeSent: false,
          confirmed: false,
          confirmPassword: "",
          isConfirming: false,
          isSendingCode: false
        };
      }
}

export default ForgotPassword;