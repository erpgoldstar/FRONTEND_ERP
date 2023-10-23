import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import TeaImage from "./images/tea.jpg";
import CoconutImage from "./images/coconut.jpg";
import DurianImage from "./images/durian.jpg";
import CinnamonImage from "./images/cinnamon.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchZones } from "./productSlice";
import { baseUrl } from "../../utils/globalVariables";

const ProductCategories = () => {
  const { zone } = useParams();
  const dispatch = useDispatch();
  const zoneData = useSelector((state) =>
    state.product.zones.filter((z) => z.name === zone)
  );
  const categoires = zoneData?.map((z) => z.categories);
  const zones = useSelector((state) => state.product.zones);
  const [incomesAndExpenses, setIncomesAndExpenses] = useState({
    totalIncomes: "",
    totalExpenses: "",
  });

  useEffect(() => {
    if (!zones.length) dispatch(fetchZones());

    fetch(`${baseUrl}/zone-details/${zone}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        setIncomesAndExpenses({
          ...incomesAndExpenses,
          totalExpenses: data.totalExpenses,
          totalIncomes: data.totalIncomes,
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <div>
      <div className="flex items-center justify-end">
        <NavLink className={"btn btn-primary btn-sm"} to={`/app/zones`}>
          Back
        </NavLink>
      </div>

      <div className="grid lg:grid-cols-3 mt-4 mb-8 md:grid-cols-2 grid-cols-1 gap-6">
        <div className="stats shadow p-4">
          <div className="text-center">
            <div className={`text-2xl dark:text-slate-300`}>Total Income:</div>
            <div className="text-2xl">{incomesAndExpenses.totalIncomes}</div>
          </div>
        </div>
        <div className="stats shadow p-4">
          <div className="text-center">
            <div className={`text-2xl dark:text-slate-300`}>Total Expense:</div>
            <div className="text-2xl">{incomesAndExpenses.totalExpenses}</div>
          </div>
        </div>
        <div className="stats shadow p-4">
          <div className="text-center">
            <div className={`text-2xl dark:text-slate-300`}>
              Total Net Income(Profit):
            </div>
            <div className="text-2xl">
              {incomesAndExpenses.totalIncomes -
                incomesAndExpenses.totalExpenses}
            </div>
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-3 gap-4 pt-8`}>
        {categoires[0]?.map((product, i) => (
          <NavLink
            key={i}
            to={`/app/zones/${zone}/${product
              .toLowerCase()
              .replace(/ /g, "-")}`}
          >
            <div className="relative w-full h-56 rounded-lg overflow-hidden shadow-lg bg-black">
              <div className="absolute top-0 left-0 w-full h-full filter opacity-50">
                {product.toLowerCase().includes("tea") && (
                  <img
                    src={TeaImage}
                    alt="Blurred Background"
                    className="object-cover w-full h-full"
                  />
                )}
                {product.toLowerCase().includes("coconut") && (
                  <img
                    src={CoconutImage}
                    alt="Blurred Background"
                    className="object-cover w-full h-full"
                  />
                )}
                {product.toLowerCase().includes("durian") && (
                  <img
                    src={DurianImage}
                    alt="Blurred Background"
                    className="object-cover w-full h-full"
                  />
                )}
                {product.toLowerCase().includes("cinnamon") && (
                  <img
                    src={CinnamonImage}
                    alt="Blurred Background"
                    className="object-cover w-full h-full"
                  />
                )}
              </div>

              <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-white">
                <h2 className="text-3xl font-semibold">{product}</h2>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
