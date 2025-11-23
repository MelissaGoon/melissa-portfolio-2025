import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

// Adapted from this CodePen: https://codepen.io/toddwebdev/pen/yExKoj 
export const ScrollDrag = ({ className, children }) => {
    const ref = useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const onMouseDown = (e) => {
        setIsDown(true);
        setStartX(e.pageX - ref.current.offsetLeft);
        setScrollLeft(ref.current.scrollLeft);
    };

    const stopScroll = () => {
        setIsDown(false);
    };


    const onMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - ref.current.offsetLeft;
        const walk = x - startX;
        ref.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div
            ref={ref}
            onMouseDown={onMouseDown}
            onMouseLeave={stopScroll}
            onMouseUp={stopScroll}
            onMouseMove={onMouseMove}
            className={className}
        >
            {children}
        </div>
    );
};

ScrollDrag.propTypes = {
    rootClass: PropTypes.string,
    children: PropTypes.node,
};

export default ScrollDrag;