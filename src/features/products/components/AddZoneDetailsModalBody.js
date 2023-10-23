import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import InputText from "../../../components/Input/InputText";
import SelectOption from "../../../components/Input/SelectOption";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { getEmployeesContent } from "../../employeeManagement/employeeSlice";
import {
  addZoneDetails,
  editZoneDetails,
  fetchAllEmployees,
  fetchZones,
} from "../productSlice";
import SelectBox from "../../../components/Input/SelectBox";

function convertString(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function AddZoneDetailsModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: extraObject?.selectedData ? extraObject.selectedData[0]._id : null,
    type: extraObject?.selectedData
      ? extraObject.selectedData[0].type
      : "Expense",
    eDescription: extraObject?.selectedData
      ? extraObject.selectedData[0].eDescription
      : "",
    iDescription: extraObject?.selectedData
      ? extraObject.selectedData[0].iDescription
      : "",
    empName: extraObject?.selectedData
      ? extraObject.selectedData[0].empName
      : "",
    resource: extraObject?.selectedData
      ? extraObject.selectedData[0].resource
      : "",
    amount: extraObject?.selectedData ? extraObject.selectedData[0].amount : "",
  });
  const [formErrors, setFormErrors] = useState({
    type: "",
    eDescription: "",
    iDescription: "",
    empName: "",
    resource: "",
    amount: "",
  });
  const { pathname } = useLocation();

  let hasErrors = false;

  const zoneSlug = pathname.split("/")[3];
  const section = pathname.split("/")[4];
  const category = convertString(section);

  useEffect(() => {
    if (!zones.length) dispatch(fetchZones());
    dispatch(fetchAllEmployees());
  }, [dispatch]);

  const zones = useSelector((state) => state.product.zones);
  const zone = useSelector((state) =>
    state.product.zones.find((z) => z.name === zoneSlug)
  );

  const employeesList = useSelector((state) => state.product.employeeList);

  const empNames = employeesList.map((empName) => {
    return { text: empName.name, value: empName.name };
  });

  const getSalary = employeesList.filter(
    (emp) => emp.name === formData.empName
  );

  const selectOptionValues = {
    type: [
      { text: "Expense", value: "Expense" },
      { text: "Income", value: "Income" },
    ],
    employeeList: empNames,
    resource: [
      { text: "Wathurawila Tea Factory", value: "Wathurawila Tea Factory" },
      { text: "Hilkandura Tea Factory", value: "Hilkandura Tea Factory" },
    ],
  };

  const saveZoneDetails = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${month}/${day}/${year}`;
    const newFormErrors = {};

    if (formData.type.trim() === "") {
      newFormErrors.type = "Type is required";
      hasErrors = true;
    }

    if (formData.type === "Expense") {
      if (formData.empName.trim() === "") {
        newFormErrors.empName = "Name is required";
        hasErrors = true;
      }
      if (formData.eDescription.trim() === "") {
        newFormErrors.eDescription = "Description is required";
        hasErrors = true;
      }
    }

    if (formData.type === "Income") {
      if (formData.resource.trim() === "") {
        newFormErrors.resource = "Resource is required";
        hasErrors = true;
      }
      if (formData.amount.trim() === "") {
        newFormErrors.amount = "Amount is required";
        hasErrors = true;
      }
      if (formData.iDescription.trim() === "") {
        newFormErrors.iDescription = "Description is required";
        hasErrors = true;
      }
    }

    // Update errors and handle form submission
    if (hasErrors) {
      setFormErrors(newFormErrors);
    } else {
      if (formData.type === "Expense") {
        if (!extraObject) {
          const { empName, eDescription, type } = formData;
          const payloadData = {
            zoneSlug,
            categoryName: category,
            zoneId: zone._id,
            data: {
              empName,
              eDescription,
              type,
              date: formattedDate,
              salary: getSalary[0].salary,
            },
          };
          dispatch(addZoneDetails(payloadData));
          dispatch(
            showNotification({ message: "Zone details added!", status: 1 })
          );
          closeModal();
        } else {
          const { empName, eDescription, type, id } = formData;
          const payloadData = {
            zoneSlug,
            category,
            id,
            page: extraObject.page,
            data: {
              empName,
              eDescription,
              type,
              date: formattedDate,
              salary: getSalary[0].salary,
            },
          };
          dispatch(editZoneDetails(payloadData));
          dispatch(
            showNotification({ message: "Zone details Updated!", status: 1 })
          );
          closeModal();
        }
      } else {
        if (!extraObject) {
          const { amount, iDescription, type, resource } = formData;
          const payloadData = {
            zoneSlug,
            categoryName: category,
            zoneId: zone._id,
            data: {
              amount,
              iDescription,
              type,
              resource,
              date: formattedDate,
            },
          };
          dispatch(addZoneDetails(payloadData));
          dispatch(
            showNotification({ message: "Zone details added!", status: 1 })
          );
          closeModal();
        } else {
          const { amount, iDescription, type, resource, id } = formData;
          const payloadData = {
            zoneSlug,
            category,
            id,
            page: extraObject.page,
            data: {
              amount,
              iDescription,
              type,
              resource,
              id,
              date: formattedDate,
            },
          };
          dispatch(editZoneDetails(payloadData));
          dispatch(
            showNotification({ message: "Zone details Updated!", status: 1 })
          );
          closeModal();
        }
      }
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    if (updateType === "type") {
      setFormErrors({ ...formErrors, type: "" });
    }
    if (updateType === "empName") {
      setFormErrors({ ...formErrors, empName: "" });
    }
    if (updateType === "eDescription") {
      setFormErrors({ ...formErrors, eDescription: "" });
    }
    if (updateType === "iDescription") {
      setFormErrors({ ...formErrors, iDescription: "" });
    }
    if (updateType === "resource") {
      setFormErrors({ ...formErrors, resource: "" });
    }
    if (updateType === "amount") {
      setFormErrors({ ...formErrors, amount: "" });
    }
    setFormData({ ...formData, [updateType]: value });
  };

  return (
    <>
      <SelectOption
        label="Expense / Income"
        id="type"
        defaultValue={formData.type}
        options={selectOptionValues.type}
        updateFormValue={updateFormValue}
        updateType="type"
      />
      <ErrorText styleClass="mt-5">{formErrors.type}</ErrorText>

      {formData.type === "Income" && (
        <>
          <SelectOption
            label="Resource"
            id="resource"
            defaultValue={formData.resource}
            options={selectOptionValues.resource}
            updateFormValue={updateFormValue}
            updateType="resource"
          />
          <ErrorText styleClass="mt-5">{formErrors.resource}</ErrorText>

          <InputText
            type="number"
            id="amount"
            defaultValue={formData.amount}
            updateType="amount"
            containerStyle="mt-4"
            labelTitle="Amount"
            updateFormValue={updateFormValue}
            defaultText={true}
          />
          <ErrorText styleClass="mt-5">{formErrors.amount}</ErrorText>

          <TextAreaInput
            type="text"
            id="iDescription"
            defaultValue={formData.iDescription}
            updateType="iDescription"
            containerStyle="mt-4"
            labelTitle="Description"
            updateFormValue={updateFormValue}
          />
          <ErrorText styleClass="mt-5">{formErrors.iDescription}</ErrorText>
        </>
      )}

      {formData.type === "Expense" && (
        <>
          {/* <SelectOption
            label="Employee Name"
            id="empName"
            defaultValue={formData.empName}
            options={selectOptionValues.employeeList}
            updateFormValue={updateFormValue}
            updateType="empName"
            defaultText={false}
          /> */}
          <SelectBox
            labelTitle="Select Employee"
            // labelDescription={}
            defaultValue={formData.empName}
            containerStyle={"w-full"}
            placeholder={""}
            // labelStyle={}
            options={selectOptionValues.employeeList}
            updateType={"empName"}
            updateFormValue={updateFormValue}
          />
          <ErrorText styleClass="mt-5">{formErrors.empName}</ErrorText>

          <TextAreaInput
            type="text"
            id="eDescription"
            defaultValue={formData.eDescription}
            updateType="eDescription"
            containerStyle="mt-4"
            labelTitle="Description"
            updateFormValue={updateFormValue}
          />
          <ErrorText styleClass="mt-5">{formErrors.eDescription}</ErrorText>
        </>
      )}

      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => saveZoneDetails()}
        >
          {extraObject ? "Update" : "Save"}
        </button>
      </div>
    </>
  );
}

export default AddZoneDetailsModalBody;
