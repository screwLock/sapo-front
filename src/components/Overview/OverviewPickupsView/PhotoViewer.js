import React, { useState } from 'react'
import styled from 'styled-components'
import { Dialog } from '@blueprintjs/core'

const PhotoViewer = (props) => {

    return (
        <Dialog
            canEscapeKeyClose={true}
            canOutsideClickClose={true}
            isOpen={props.isOpen}
            onClose={() => props.openPhotos(false)}
        >

        </Dialog>
    )
}

export default PhotoViewer
