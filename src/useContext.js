import React, { useContext } from 'react';

const MyContext = React.createContext();

function Display() {
  const value = useContext(MyContext);
  return <div>{value}</div>;
}

function UseContext() {
  return (
    <MyContext.Provider value="Hello, World!">
      <Display />
    </MyContext.Provider>
  );
}

export default UseContext;
