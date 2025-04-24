
export const useNumberInput = () => {
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      e.preventDefault();
      return false;
    }
    return true;
  };

  return { handleNumberInput };
};
