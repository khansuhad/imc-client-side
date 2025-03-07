export const reactSelectFormatOne = (array, valueKey, labelKeys) => {
    if (!Array.isArray(array) || array.length === 0) return [];
  
    return array.map(item => ({
      value: item[valueKey],
      label: labelKeys.map(key => item[key]).join("/")
    }));
  };
  export const reactSelectFormatTwo = (array, valueKeys, labelKeys) => {
    if (!Array.isArray(array) || array.length === 0) return [];
  
    return array.map(item => ({
      value: Array.isArray(valueKeys) 
        ? Object.fromEntries(valueKeys.map(key => [key, item[key]])) 
        : item[valueKeys],
      label: labelKeys.map(key => item[key]).join("/")
    }));
  };
  
  