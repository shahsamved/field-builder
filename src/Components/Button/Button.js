import React from 'react';
import './Button.css';

export default function Button(props) {
  // Extract the button name from the props
  const nameOfButton = props.name;

  // Generate a CSS class name based on the button name
  const cssClass = "button " + nameOfButton;

  // Function to clear textboxes and reset form data if the "Cancel" button is clicked
  const clearTextboxArea = () => {
    if (props.name === "Cancel") {
      // Clear textboxes and reset form data using the provided props
      props.setChoices("");
      props.setLabel("");
      props.setDefaultValue("");
      props.setMultiSelect(false);
      props.setOrder("asc");
    }
  };

  return (
    <div>
      <button className={cssClass} type={nameOfButton} onClick={clearTextboxArea}>
        {nameOfButton}
      </button>
    </div>
  );
}
