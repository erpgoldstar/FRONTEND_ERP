import React, { useState } from "react";

const SelectOption = ({
  label,
  id,
  defaultValue,
  defaultText,
  options,
  updateType,
  updateFormValue,
}) => {
  const [value, setValue] = useState(defaultValue);
  // console.log(defaultText);

  const updateInputValue = (val) => {
    setValue(val);
    if (!updateType) {
      updateFormValue(val);
    } else {
      updateFormValue({ updateType, value: val });
    }
  };

  return (
    <div className={`form-control w-full mt-4`}>
      <label htmlFor={id} className="label">
        <span className={"label-text text-base-content"}>{label}</span>
      </label>

      <select
        id={id}
        className="input input-bordered w-full "
        value={value}
        onChange={(e) => updateInputValue(e.target.value)}
      >
        {<option value=""></option>}
        {options?.map((item, i) => (
          <option key={i} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectOption;
