import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import InputText from "../../../components/Input/InputText";
import SelectOption from "../../../components/Input/SelectOption";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { getEmployeesContent } from "../../employeeManagement/employeeSlice";
import { addZoneDetails, editZoneDetails } from "../productSlice";

function convertString(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function AddZoneDetailsModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: extraObject ? extraObject[0].id : null,
    type: extraObject ? extraObject[0].type : "Expense",
    description: extraObject ? extraObject[0].description : "",
    empName: extraObject ? extraObject[0].empName : "",
    resource: extraObject ? extraObject[0].resource : "",
    amount: extraObject ? extraObject[0].amount : "",
  });
  const [formErrors, setFormErrors] = useState({
    type: "",
    description: "",
    empName: "",
    resource: "",
    amount: "",
  });
  const { pathname } = useLocation();
  let hasErrors = false;

  const zoneSlug = pathname.split("/")[3];
  const section = pathname.split("/")[4];
  const productName = convertString(section);

  useEffect(() => {
    dispatch(getEmployeesContent());
  }, []);

  const employeesList = useSelector((state) => state.employee.employees);
  const zones = useSelector((state) => state.product.zones);
  const zoneData = zones?.filter((state) => state.zoneSlug === zoneSlug);
  const sectionDetails = zoneData[0]?.details;
  const detailsObjArr = sectionDetails?.filter(
    (state) => state.productName === productName
  );
  const details = detailsObjArr[0]?.data;

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
      { text: "Factory 1", value: "Factory 1" },
      { text: "Factory 2", value: "Factory 2" },
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
      if (formData.description.trim() === "") {
        newFormErrors.description = "Description is required";
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
      if (formData.description.trim() === "") {
        newFormErrors.description = "Description is required";
        hasErrors = true;
      }
    }

    // Update errors and handle form submission
    if (hasErrors) {
      setFormErrors(newFormErrors);
    } else {
      if (formData.type === "Expense") {
        const { empName, description, type } = formData;
        const payloadData = {
          zoneSlug,
          productName,
          data: {
            empName,
            description,
            type,
            id: details?.length === undefined ? 1 : details?.length + 1,
            date: formattedDate,
            salary: getSalary[0].salary,
          },
        };
        if (!extraObject) {
          dispatch(addZoneDetails(payloadData));
          dispatch(
            showNotification({ message: "Zone details added!", status: 1 })
          );
          closeModal();
        } else {
          const { empName, description, type, id } = formData;
          const payloadData = {
            zoneSlug,
            productName,
            data: {
              empName,
              description,
              type,
              id,
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
          const { amount, description, type, resource } = formData;
          dispatch();
          // addZoneDetails(
          //   { text: "hey" },
          //   {
          //     amount,
          //     description,
          //     type,
          //     resource,
          //     id: zoneData.length + 1,
          //     date: formattedDate,
          //   }
          // )
          dispatch(
            showNotification({ message: "Zone details added!", status: 1 })
          );
          closeModal();
        } else {
          const { amount, description, type, resource, id } = formData;
          dispatch();
          // editZoneDetails({
          //   amount,
          //   description,
          //   type,
          //   resource,
          //   id,
          //   date: formattedDate,
          // })
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
    if (updateType === "description") {
      setFormErrors({ ...formErrors, description: "" });
    }
    if (updateType === "resource") {
      setFormErrors({ ...formErrors, resource: "" });
    }
    if (updateType === "amount") {
      setFormErrors({ ...formErrors, amount: "" });
    }
    if (updateType === "description") {
      setFormErrors({ ...formErrors, description: "" });
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
          />
          <ErrorText styleClass="mt-5">{formErrors.amount}</ErrorText>

          <TextAreaInput
            type="text"
            id="description"
            defaultValue={formData.description}
            updateType="description"
            containerStyle="mt-4"
            labelTitle="Description"
            updateFormValue={updateFormValue}
          />
          <ErrorText styleClass="mt-5">{formErrors.description}</ErrorText>
        </>
      )}

      {formData.type === "Expense" && (
        <>
          <SelectOption
            label="Employee Name"
            id="empName"
            defaultValue={formData.empName}
            options={selectOptionValues.employeeList}
            updateFormValue={updateFormValue}
            updateType="empName"
          />
          <ErrorText styleClass="mt-5">{formErrors.empName}</ErrorText>

          <TextAreaInput
            type="text"
            id="description"
            defaultValue={formData.description}
            updateType="description"
            containerStyle="mt-4"
            labelTitle="Description"
            updateFormValue={updateFormValue}
          />
          <ErrorText styleClass="mt-5">{formErrors.description}</ErrorText>
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
          Save
        </button>
      </div>
    </>
  );
}

export default AddZoneDetailsModalBody;
