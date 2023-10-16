import React from 'react';
import { useState, useEffect } from 'react';
import Button from '../Components/Button/Button';
import Dropdown from '../Components/Dropdown/Dropdown';
import "./Form.css";

export default function Form() {
  // State variables using useState and local storage
  const [label, setLabel] = useState(() => {
    const savedItem = localStorage.getItem("label");
    if (typeof savedItem === "undefined") return "";
    const parsedItem = JSON.parse(savedItem);
    return parsedItem;
  });

  const [defaultValue, setDefaultValue] = useState(() => {
    const savedItem = localStorage.getItem("defaultValue");
    if (typeof savedItem === "undefined") return "";
    const parsedItem = JSON.parse(savedItem);
    return parsedItem;
  });

  const [multiSelect, setMultiSelect] = useState(() => {
    const savedItem = localStorage.getItem("multiSelect");
    if (typeof savedItem === "undefined") return false;
    const parsedItem = JSON.parse(savedItem);
    return parsedItem;
  });

  const [choices, setChoices] = useState(() => {
    const savedItem = localStorage.getItem("choices");
    if (typeof savedItem === "undefined") return "";
    const parsedItem = JSON.parse(savedItem);
    return parsedItem;
  });

  const [order, setOrder] = useState(() => {
    const savedItem = localStorage.getItem("order");
    if (typeof savedItem === "undefined") return "asc";
    const parsedItem = JSON.parse(savedItem);
    return parsedItem;
  });

  const [isInputTooLong, setIsInputTooLong] = useState(false);

  const updateChoices = (event) => {
    // If a word exceeds 40 characters, make it red
    const inputValue = event.target.value;
    setChoices(inputValue);
    const lines = inputValue.split(/\r?\n|\r|\n/g);
    const isWordTooLong = lines.some((line) => {
      const words = line.split(' ');
      return words.some((word) => word.length > 40);
    });

    if (isWordTooLong) {
      setIsInputTooLong(true);
    } else {
      setIsInputTooLong(false);
    }
  };

  useEffect(() => {
    // Save form data to local storage when state changes
    window.localStorage.clear();
    window.localStorage.setItem('label', JSON.stringify(label));
    window.localStorage.setItem('defaultValue', JSON.stringify(defaultValue));
    window.localStorage.setItem('multiSelect', JSON.stringify(multiSelect));
    window.localStorage.setItem('choices', JSON.stringify(choices));
    window.localStorage.setItem('order', JSON.stringify(order));
  }, [label, defaultValue, multiSelect, choices, order]);

  function hasDuplicates(array) {
    // Check if an array has duplicates
    return (new Set(array)).size !== array.length;
  }

  const updateMultiValues = () => {
    setMultiSelect(!multiSelect);
  }

  const submitForm = (event) => {
    event.preventDefault(); // Prevent the form from navigating to a new page
    var choicesToSubmit = choices.split(/\r?\n|\r|\n/g);
    if (choicesToSubmit.length > 50) {
      alert("Cannot have more than 50 choices.");
    } else if (hasDuplicates(choicesToSubmit)) {
      alert("Duplicate values are submitted.");
    } else if (!label || label === "") {
      alert("Label cannot be empty.");
    } else {
      if (!choicesToSubmit.includes(defaultValue)) {
        // If the default value is not in the options, add it
        choicesToSubmit.push(defaultValue);
        const defaultValueToBePushed = "\n" + defaultValue;
        setChoices(choices + defaultValueToBePushed);
      }
      // Log and submit the form data
      console.log(JSON.stringify({
        'Label': label,
        'Default Value': defaultValue,
        'MultiSelect': multiSelect,
        'Choices': choicesToSubmit,
        'Order': order
      }));
      fetch('http://www.mocky.io/v2/566061f21200008e3aabd919', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'Label': label,
          'Default Value': defaultValue,
          'MultiSelect': multiSelect,
          'Choices': choicesToSubmit,
          'Order': order
        }),
      }).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Server response wasn't OK");
        }
      })
        .then(data => {
          console.log(JSON.stringify(data));
          alert("Data posted successfully!");
        })
        .catch(error => {
          console.log(error);
          alert("There was an error posting the data.");
        });
    }
  }

  return (
    <>
      <div className="box">
        <h1 className="form-style-2-heading heading">Field Builder</h1>
        <form onSubmit={submitForm}>
          <table>
            <tbody>
              <tr className="formRow">
                <td className="field">Label:</td>
                <td>
                  <input
                    type="text"
                    placeholder="Label"
                    name="label"
                    onChange={(e) => setLabel(e.target.value)}
                    value={label}
                    required
                    title="This is the label for your field"
                  ></input>
                </td>
              </tr>

              <tr className="formRow">
                <td className="field">Type:</td>
                <td>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="MultiSelect"
                      id="MultiSelect"
                      checked={multiSelect}
                      onChange={updateMultiValues}
                      title="Enable multi-select"
                    ></input>
                    Multi Select
                  </label>
                </td>
              </tr>

              <tr className="formRow">
                <td className="field">Default Value: </td>
                <td>
                  <input
                    type="text"
                    placeholder="Default Value"
                    name="defaultValue"
                    value={defaultValue}
                    onChange={(e) => setDefaultValue(e.target.value)}
                    title="Set a default value for this field"
                  ></input>
                </td>
              </tr>

              <tr className="formRow">
                <td className="field">Choices: </td>
                <td>
                  <div className={`choicesContainer ${isInputTooLong ? 'highlight' : ''}`}>
                    <textarea
                      className="choices"
                      type="text"
                      placeholder="Choices"
                      onChange={updateChoices}
                      value={choices}
                      title="Enter choices for this field (one per line)"
                    ></textarea>
                  </div>
                </td>
              </tr>

              <tr className="formRow">
                <td className="field">Order: </td>
                <td>
                  <Dropdown order={order} setOrder={setOrder} title="Select the order for this field"></Dropdown>
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button name={"Save"} />
            <Button
              name={"Cancel"}
              setChoices={setChoices}
              setLabel={setLabel}
              setMultiSelect={setMultiSelect}
              setDefaultValue={setDefaultValue}
              setOrder={setOrder}
            />
          </div>
        </form>
      </div>
    </>
  );
}
