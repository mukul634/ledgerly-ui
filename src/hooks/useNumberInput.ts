
export const useNumberInput = () => {
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isNumeric = /^\d*$/.test(value);
    const isValidLength = value.length <= 10;
    
    if (!isNumeric || !isValidLength) {
      e.preventDefault();
      return false;
    }
    return true;
  };

  return { handleNumberInput };
};

