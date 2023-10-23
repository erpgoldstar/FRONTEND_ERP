import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addEmployee, editEmployee } from "../employeeSlice";
import { useNavigate } from "react-router-dom";

function AddEmployeeModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [employeeObj, setEmployeeObj] = useState({
    name: extraObject.selectedEmp ? extraObject.selectedEmp[0].name : "",
    nic: extraObject.selectedEmp ? extraObject.selectedEmp[0].nic : "",
    address: extraObject.selectedEmp ? extraObject.selectedEmp[0].address : "",
    salary: extraObject.selectedEmp ? extraObject.selectedEmp[0].salary : "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    nic: "",
    address: "",
    salary: "",
  });
  let hasErrors = false;
  const navigate = useNavigate();

  const saveNewEmployee = () => {
    const newFormErrors = {};

    if (employeeObj.name.trim() === "") {
      newFormErrors.name = "Name is required";
      hasErrors = true;
    }
    if (employeeObj.nic.trim() === "") {
      newFormErrors.nic = "NIC is required";
      hasErrors = true;
    }
    if (employeeObj.address.trim() === "") {
      newFormErrors.address = "Address is required";
      hasErrors = true;
    }
    if (employeeObj.salary.trim() === "") {
      newFormErrors.salary = "Salary is required";
      hasErrors = true;
    } else if (isNaN(employeeObj.salary)) {
      newFormErrors.age = "Salary must be a number";
      hasErrors = true;
    }

    // Update errors and handle form submission
    if (hasErrors) {
      setFormErrors(newFormErrors);
    } else {
      if (!extraObject.selectedEmp) {
        dispatch(addEmployee({ ...employeeObj, page: extraObject.page }));
        dispatch(
          showNotification({ message: "New Employee Added!", status: 1 })
        );
        navigate("/app/employee-management");
        closeModal();
      } else {
        dispatch(
          editEmployee({
            ...employeeObj,
            _id: extraObject.selectedEmp[0]._id,
            page: extraObject.page,
          })
        );
        dispatch(showNotification({ message: "Employee Updated!", status: 1 }));
        closeModal();
      }
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    if (updateType === "name") {
      setFormErrors({ ...formErrors, name: "" });
    }
    if (updateType === "nic") {
      setFormErrors({ ...formErrors, nic: "" });
    }
    if (updateType === "address") {
      setFormErrors({ ...formErrors, address: "" });
    }
    if (updateType === "salary") {
      setFormErrors({ ...formErrors, salary: "" });
    }
    setEmployeeObj({ ...employeeObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={employeeObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Name"
        updateFormValue={updateFormValue}
      />
      <ErrorText styleClass="mt-5">{formErrors.name}</ErrorText>
      <InputText
        type="text"
        defaultValue={employeeObj.nic}
        updateType="nic"
        containerStyle="mt-4"
        labelTitle="NIC"
        updateFormValue={updateFormValue}
      />
      <ErrorText styleClass="mt-5">{formErrors.nic}</ErrorText>
      <InputText
        type="text"
        defaultValue={employeeObj.address}
        updateType="address"
        containerStyle="mt-4"
        labelTitle="Address"
        updateFormValue={updateFormValue}
      />
      <ErrorText styleClass="mt-5">{formErrors.address}</ErrorText>
      <InputText
        type="number"
        defaultValue={employeeObj.salary}
        updateType="salary"
        containerStyle="mt-4"
        labelTitle="Salary"
        updateFormValue={updateFormValue}
      />
      <ErrorText styleClass="mt-5">{formErrors.salary}</ErrorText>

      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => saveNewEmployee()}
        >
          {extraObject.selectedEmp ? "Update" : "Save"}
        </button>
      </div>
    </>
  );
}

export default AddEmployeeModalBody;
