import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import EmployeeManagement from "../../features/employeeManagement";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Employee Management" }));
  }, []);

  return <EmployeeManagement />;
}

export default InternalPage;
