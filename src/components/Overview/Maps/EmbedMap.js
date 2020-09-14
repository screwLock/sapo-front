import * as React from 'react'

 const EmbedMap = (props) => {
    return (
        <div>
          <iframe src={props.src} width="100%" height="600" frameborder="0" style={{border:0}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        </div>
    );
 }
 export default EmbedMap