import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Calculator from './calculator';

describe('Calculator', () => {

  it('should contain an element with text "1"', () => {
    render(<Calculator />);
    const linkElement = screen.getByText(/1/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('Calculator displays "4" after pressing "1 + 3 =', () => {
    const { getByText } = render(<Calculator />);
  
    // Press NumericKey.ONE
    fireEvent.click(getByText(/1/));
    // Press OperatorKey.PLUS
    fireEvent.click(getByText(/+/));
    // Press NumericKey.THREE
    fireEvent.click(getByText(/3/));
    // Press ActionKey.EQUALS
    fireEvent.click(getByText(/=/));
  
    // Check if display shows "4"
    expect(getByText(/4/)).toBeInTheDocument();
  });

});
