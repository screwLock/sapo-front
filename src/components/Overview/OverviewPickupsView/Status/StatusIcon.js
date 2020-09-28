import React, { useState } from "react";
import { Keyframes, animated } from 'react-spring/renderprops'

const Container = Keyframes.Spring(async next => {
    while (true) {
        await next({
            from: { radians: 0 },
            to: { radians: 2 * Math.PI },
        })
    }
}
)

const StatusIcon = (props) => {
    return (
        <Container
            reset
            native
            //impl={TimingAnimation}
            config={{ duration: 2000 /*, easing: Easing.linear*/ }}
        >
            {styles => 
                (
                    <animated.div style={{
                        transform: styles.radians.interpolate(r => `translate3d(0, ${15 * Math.sin(r + (2 * Math.PI) / 1.6)}px, 0)`)
                    }}
                    >
                        {props.children}
                    </animated.div>
                )
            }
        </Container>
    )

}

export default StatusIcon