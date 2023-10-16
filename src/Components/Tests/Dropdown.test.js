import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from '../Dropdown/Dropdown'; 

describe('Tests Dropdown Component', () => {
  it('renders the dropdown component with default value', () => {
    // Render the Dropdown component with a default order of "asc"
    render(<Dropdown order="asc" setOrder={() => {}} />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue('asc');
  });

  it('handles order change when a new option is selected', () => {
    const setOrderMock = jest.fn();
    render(<Dropdown order="asc" setOrder={setOrderMock} />);
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'desc' } });

    expect(setOrderMock).toHaveBeenCalledWith('desc');
  });
});
