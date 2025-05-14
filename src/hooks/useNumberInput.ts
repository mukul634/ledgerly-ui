
import { useState } from 'react';

export const useNumberInput = () => {
  const [value, setValue] = useState<number>(0);

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow empty string (for clearing the input)
    if (inputValue === '') {
      return true;
    }
    
    // Check if the input is a valid number
    const isNumeric = /^\d*\.?\d*$/.test(inputValue);
    const isValidLength = inputValue.length <= 10;
    
    if (!isNumeric || !isValidLength) {
      return false;
    }
    
    return true;
  };

  const increment = (currentValue: number, step: number = 100) => {
    return currentValue + step;
  };

  const decrement = (currentValue: number, step: number = 100) => {
    const newValue = currentValue - step;
    return newValue < 0 ? 0 : newValue;
  };

  return { 
    handleNumberInput,
    increment,
    decrement,
    value,
    setValue
  };
};
