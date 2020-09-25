import React, { useState } from "react";
import { Spring, animated } from 'react-spring/renderprops';
import useLongPress from './LongPress/useLongPress'

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
                from={{ scale: 1 }} 
                to={{ scale: pressed ? 0.8 : 1.0 }}>
            {({ scale }) => (
                <animated.button
                    {...longPressEvent}
                    style={{
                        color: 'white',
                        borderWidth: '0.05em', 
                        borderColor: props.color,
                        borderRadius: '0.2em',
                        borderStyle: 'solid',
                        height: '75%',
                        alignSelf: 'center',
                        width: '20%',
                        transform: scale.interpolate(scale => `scale(${scale})`)
                    }}
                >
                    {props.children}
                </animated.button>
            )}
        </Spring>
    );
}

export default SpringButton