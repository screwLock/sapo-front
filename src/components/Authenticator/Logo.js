import { useTrail, animated } from 'react-spring'
import React, { useState } from 'react';

const Logo = (props) => {
    const items = ['S', 'A', 'P', 'O']
    const config = { mass: props.mass, tension: 2000, friction: 200 }
    const [toggle, set] = useState(true)
    const trail = useTrail(items.length, {
        config,
        opacity: toggle ? 1 : 0,
        x: toggle ? 0 : 20,
        height: toggle ? 80 : 0,
        from: { opacity: 0, x: 20, height: 0 },
    })
    return (
            trail.map(({ x, height, ...rest }, index) => (
                <animated.div
                    key={items[index]}
                    className="trails-text"
                    style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
                    <animated.div style={{ height }}>{items[index]}</animated.div>
                </animated.div>
            ))
    )
}

export default Logo