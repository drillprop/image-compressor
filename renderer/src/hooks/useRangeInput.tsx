import { useState } from 'react';

type RangeObj = {
  [key: string]: number;
};

const useRangeInput = (rangeObj: RangeObj) => {
  const [ranges, setRanges] = useState(rangeObj);

  const handleRanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRanges({
      ...ranges,
      [e.target.name]: Number(e.target.value),
    });
  };

  return { ranges, handleRanges };
};

export default useRangeInput;
