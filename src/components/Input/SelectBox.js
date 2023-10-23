import React, { useState, useEffect } from "react";
import InformationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon";

function SelectBox(props) {
  const {
    labelTitle,
    labelDescription,
    defaultValue,
    containerStyle,
    placeholder,
    labelStyle,
    options,
    updateType,
    updateFormValue,
  } = props;

  const [value, setValue] = useState(defaultValue || "");

  const updateValue = (newValue) => {
    if (updateType) {
      updateFormValue({ updateType, value: newValue });
      setValue(newValue);
    } else {
      updateFormValue(newValue);
      setValue(newValue);
    }
  };

  return (
    <div className={`${containerStyle}`}>
      <label className={`label ${labelStyle}`}>
        <div className="label-text">
          {labelTitle}
          {labelDescription && (
            <div className="tooltip tooltip-right" data-tip={labelDescription}>
              <InformationCircleIcon className="w-4 h-4" />
            </div>
          )}
        </div>
      </label>

      <select
        className="select select-bordered w-full"
        value={value}
        onChange={(e) => updateValue(e.target.value)}
      >
        <option
          disabled={placeholder || placeholder === "" ? false : true}
          value="PLACEHOLDER"
        >
          {placeholder}
        </option>
        {options.map((o, k) => {
          return (
            <option value={o.value || o.text} key={k}>
              {o.text}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectBox;
