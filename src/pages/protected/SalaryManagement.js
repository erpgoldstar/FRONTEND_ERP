import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import SalaryManagement from "../../features/salaryManagement";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Salary Management" }));
  }, []);

  return <SalaryManagement />;
}

export default InternalPage;
