import { IdentificationIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { deleteTeaZone } from "../productSlice";

const ZoneCard = ({ zone, id, name }) => {
  const { type } = useParams();
  const dispatch = useDispatch();

  return (
    <div className="flex bg-gray-300 rounded-lg shadow">
      <NavLink
        to={`/app/products/${type}/${zone}`}
        className="flex-grow flex items-center justify-center"
      >
        <span className="pl-5">{name}</span>
      </NavLink>

      <button
        onClick={() => dispatch(deleteTeaZone(id))}
        className="rounded-tr-lg rounded-br-lg bg-red-400 hover:bg-red-500 p-3 transition-bg duration-300 ease-in-out hover:text-white"
      >
        <TrashIcon className="w-7 h-7" />
      </button>
    </div>
  );
};

export default ZoneCard;
