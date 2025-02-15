import React, { useRef } from 'react';

function TextInputUseRef() {
  const inputEl = useRef(null);

  const handleClick = () => {
    inputEl.current.focus();
  };

  return (
    <div>
      <input ref={inputEl} type="text" />
      <button onClick={handleClick}>Focus the input</button>
    </div>
  );
}

export default TextInputUseRef;
