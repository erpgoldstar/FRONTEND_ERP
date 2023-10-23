import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeesContent } from "../../features/employeeManagement/employeeSlice";
import { Pagination, PaginationItem } from "@material-ui/lab";

const Paginate = ({ page, totalPages, navigationLink }) => {
  return (
    <Pagination
      count={totalPages}
      page={Number(page) || 1}
      color="secondary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`${navigationLink}${item.page}`}
        />
      )}
    />
  );
};
export default Paginate;
