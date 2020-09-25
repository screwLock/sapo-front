import React, { useState } from "react";
import { Spring, animated } from 'react-spring/renderprops';

const StatusIcon = (props) => {
    const [pressed, setPressed] = useState(false);

    return (
        <Spring native 
                from={{ 
                    scale: 1, 
                    strokeWidth: 0,
                    backgroundColor: props.color,
                    color: 'white'
                    }} 
                to={{ 
                    scale: pressed ? 1.2 : 1.0,
                    strokeWidth: pressed ? 0 : 100,
                    backgroundColor: pressed? 'white' : props.color,
                    color: pressed? props.color : 'white'            
                    }}>
            {({ scale, backgroundColor, strokeWidth, color }) => (
                <animated.rect strokeWidth={strokeWidth}
                    style={{
                        backgroundColor: backgroundColor,
                        color: color,
                        // borderWidth: '0.05em', 
                        borderColor: props.color,
                        borderRadius: '0.2em',
                        height: '100%',
                        alignSelf: 'center',
                        width: '100%',
                        transform: scale.interpolate(scale => `scale(${scale})`),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {props.children}
                </animated.rect>
            )}
        </Spring>
    );
}

export default StatusIcon