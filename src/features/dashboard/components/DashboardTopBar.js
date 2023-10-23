import { useState } from "react";
import SelectBox from "../../../components/Input/SelectBox";

const periodOptions = [
  { text: "This Week", value: "THIS_WEEK" },
  { text: "Last Week", value: "LAST_WEEK" },
  { text: "This Month", value: "THIS_MONTH" },
  { text: "Last Month", value: "LAST_MONTH" },
  { text: "This Year", value: "THIS_YEAR" },
];

function DashboardTopBar({ setPeriod }) {
  const [defaultValue, setDefaultValue] = useState(periodOptions[0].value);

  const updateFormValue = (value) => {
    setPeriod(value);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
      <div className="">
        <SelectBox
          options={periodOptions}
          containerStyle="w-[50%]"
          defaultValue={defaultValue}
          updateFormValue={updateFormValue}
        />
      </div>
      <div className="text-right "></div>
    </div>
  );
}

export default DashboardTopBar;
