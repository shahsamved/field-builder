import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../Button/Button';

describe('Tests Button component', () => {
  it('renders button with the provided name', () => {
    // Render the Button component with the "Save" button name
    const { getByText } = render(<Button name="Save" />);
    const buttonElement = getByText(/Save/i);
    // Assert that the button with the name "Save" is rendered
    expect(buttonElement).toBeInTheDocument();
  });


  it('clears text area values when Cancel button is clicked', () => {
    const mockSetChoices = jest.fn();
    const mockSetLabel = jest.fn();
    const mockSetDefaultValue = jest.fn();
    const mockSetMultiSelect = jest.fn();
    const mockSetOrder = jest.fn();

    const { getByText } = render(
      <Button 
        name="Cancel" 
        setChoices={mockSetChoices}
        setLabel={mockSetLabel}
        setDefaultValue={mockSetDefaultValue}
        setMultiSelect={mockSetMultiSelect}
        setOrder={mockSetOrder}
      />
    );

    // Find the Cancel button in the rendered component
    const cancelButton = getByText(/Cancel/i);

    // Simulate a click on the Cancel button
    fireEvent.click(cancelButton);

    // Assert that the mock prop functions were called with specific arguments
    expect(mockSetChoices).toHaveBeenCalledWith("");
    expect(mockSetLabel).toHaveBeenCalledWith("");
    expect(mockSetDefaultValue).toHaveBeenCalledWith("");
    expect(mockSetMultiSelect).toHaveBeenCalledWith(false);
    expect(mockSetOrder).toHaveBeenCalledWith("asc");
  });
});
