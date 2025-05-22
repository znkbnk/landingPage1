// Cursor.jsx
import React, { useEffect, useRef } from 'react';
import './Cursor.css';

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    document.body.style.cursor = 'none';

    const createBubble = (x, y) => {
      const bubble = document.createElement('div');
      bubble.className = 'cursor-bubble';
      bubble.style.left = `${x}px`;
      bubble.style.top = `${y}px`;
      document.body.appendChild(bubble);

      setTimeout(() => {
        bubble.remove();
      }, 500); // remove bubble after 0.5s
    };

    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      if (cursor) {
        cursor.style.transform = `translate(${x}px, ${y}px)`;
      }
      createBubble(x, y);
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.body.style.cursor = '';
    };
  }, []);

  return <div ref={cursorRef} className="cursor-core" />;
};

export default Cursor;
