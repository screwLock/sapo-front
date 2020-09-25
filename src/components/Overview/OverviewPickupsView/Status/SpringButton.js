import React, { useState } from "react";
import { Spring, animated } from 'react-spring/renderprops';
import useLongPress from './useLongPress'

const SpringButton = (props) => {
    const [pressed, setPressed] = useState(false);
    const onLongPress = () => {
        setPressed(true)
        console.log('longpress is triggered');
    };

    const onClick = () => {
        setPressed(false)
        console.log('click is triggered')
    }

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 500,
    };
    const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);
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
                    {...longPressEvent}
                    style={{
                        backgroundColor: backgroundColor,
                        color: color,
                        // borderWidth: '0.05em', 
                        borderColor: props.color,
                        borderRadius: '0.2em',
                        height: '75%',
                        alignSelf: 'center',
                        width: '20%',
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

export default SpringButton