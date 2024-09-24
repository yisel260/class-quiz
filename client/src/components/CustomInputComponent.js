import React, { useEffect,useContext, useState } from "react";

const CustomInputComponent = ({ value, onChange }) => {
    const [inputValue, setInputValue] = React.useState(value);
  
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
      onChange(e.target.value);
    };
  
    return (
      <input
        value={inputValue}
        onChange={handleInputChange}
      />
    );
  };

  export default CustomInputComponent