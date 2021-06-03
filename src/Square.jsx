import React, { useState } from 'react'
import './Square.css'

const Square = (props) => {
  const [value, setValue] = useState(null);
  return (
    <button className="btn btn-secondary square" 
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export { Square };