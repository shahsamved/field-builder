import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from '../Form';

describe('<Form />', () => {
  it('renders the form', () => {
    // Render the Form component
    render(<Form />);
    
    // Find an input element with a placeholder text containing Label case-insensitively
    const labelElement = screen.getByPlaceholderText(/Label/i);

    // Assert that the label input element is rendered
    expect(labelElement).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    // Render the Form component
    render(<Form />);
    
    // Find an input element with a placeholder text containing Label case-insensitively
    const inputElement = screen.getByPlaceholderText(/Label/i);

    // Simulate a change event on the input element, setting its value to Test Label
    fireEvent.change(inputElement, { target: { value: 'Test Label' } });

    // Assert that the input element's value has been updated to Test Label
    expect(inputElement.value).toBe('Test Label');
  });
});
