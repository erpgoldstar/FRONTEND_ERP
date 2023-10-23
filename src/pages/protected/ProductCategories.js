import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setPageTitle } from "../../features/common/headerSlice";
import { AVAILABLE_ZONES_DETAILS } from "../../features/products/components/data";
import ProductCategories from "../../features/products/ProductCategories";

function InternalPage() {
  const dispatch = useDispatch();
  const { zone } = useParams();

  function convertToTitleCase(str) {
    return str
      .split("-") // Split the string by hyphens
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(" "); // Join the words with spaces
  }

  function getAvailableCategories(zoneText) {
    const zoneObject = AVAILABLE_ZONES_DETAILS.find(
      (zone) => zone.zoneSlug === zoneText
    );

    if (zoneObject) {
      return zoneObject.availableCategories;
    } else {
      return [];
    }
  }

  useEffect(() => {
    dispatch(setPageTitle({ title: `${convertToTitleCase(zone)}` }));
  }, []);

  return <ProductCategories products={getAvailableCategories(zone)} />;
}

export default InternalPage;
