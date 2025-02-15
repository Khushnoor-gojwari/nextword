import React, { useState, useEffect } from 'react';

function Timeruseeffect() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);
    
    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return <div>Timer: {count} seconds</div>;
}

export default Timeruseeffect;
