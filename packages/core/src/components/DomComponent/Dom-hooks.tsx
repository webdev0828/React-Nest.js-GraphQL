import React, { useState } from 'react';

export const useForceUpdate = () => {
  const [value, setValue] = useState(true);
  return () => setValue(!value);
};
