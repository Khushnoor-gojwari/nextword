import React, { useState, useMemo } from 'react';

function ExpensiveCalculationComponentMemo({ num }) {
  const [count, setCount] = useState(0);

  const expensiveCalculation = (num) => {
    console.log('Calculating...');
    return num * 2;
  };

  const calculatedValue = useMemo(() => expensiveCalculation(num), [num]);

  return (
    <div>
      <p>Calculated Value: {calculatedValue}</p>
      <button onClick={() => setCount(count + 1)}>Re-render</button>
      <p>Render Count: {count}</p>
    </div>
  );
}

export default ExpensiveCalculationComponentMemo;
