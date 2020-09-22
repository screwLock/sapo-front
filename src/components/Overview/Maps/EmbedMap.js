import * as React from 'react'

 const EmbedMap = (props) => {
    return (
        <div>
          <iframe src={props.src} width="100%" height="100%" frameborder="0" style={{border:0}} allow='fullscreen' aria-hidden="false" tabindex="0"></iframe>
        </div>
    );
 }
 export default EmbedMap