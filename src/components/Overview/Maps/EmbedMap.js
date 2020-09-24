import * as React from 'react'

 const EmbedMap = (props) => {
    return (
        <>
          <iframe src={props.src} width="600" height="500" frameBorder="0" style={{border:0}} allow='fullscreen' aria-hidden="false" tabIndex="0"></iframe>
        </>
    );
 }
 export default EmbedMap