import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { setPageTitle } from "../../features/common/headerSlice";
import SectionData from "../../features/products/SectionData";

function convertString(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function InternalPage() {
  const dispatch = useDispatch();
  const { zone, section } = useParams();

  useEffect(() => {
    dispatch(
      setPageTitle({
        title: `${convertString(zone)} zone > ${convertString(
          section
        )} section`,
      })
    );
  }, []);

  return <SectionData />;
}

export default InternalPage;
