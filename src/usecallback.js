import React, { useState, useCallback } from 'react';

function Button({ handleClick }) {
  return <button onClick={handleClick}>Click me</button>;
}

function UseCallback() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  return (
    <div>
      <h3>Use call back</h3>  
      <p>Count: {count}</p>
      <Button handleClick = {handleClick}/>
    </div>
  );
}

export default UseCallback;
