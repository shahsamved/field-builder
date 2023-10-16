import React from 'react';
import "./Dropdown.css";

export default function Dropdown(props) {
  // Event handler for handling changes in the dropdown selection
  const handleChange = (event) => {
    // Update the order state using the setOrder function provided via props
    props.setOrder(event.target.value);
  };

  return (
    <div>
      <select value={props.order} onChange={handleChange} className="inputBox">

        <option className="inputBox" value="asc">Ascending Order</option>
        
        <option className="inputBox" value="desc">Descending Order</option>

      </select>
    </div>
  );
}
