import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchZones } from "./productSlice";
import { useDispatch, useSelector } from "react-redux";

function convertStr(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const Products = () => {
  const dispatch = useDispatch();
  const zones = useSelector((state) => state.product.zones);

  useEffect(() => {
    if (!zones.length) dispatch(fetchZones());
  }, []);

  return (
    <div className="grid lg:grid-cols-3 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
      {zones.map((zone, i) => (
        <NavLink key={i} to={`/app/zones/${zone.name}`}>
          <div className="block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div className="p-6">
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {convertStr(zone.name)}
              </h5>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Products;
