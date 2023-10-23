import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";
import TitleCard from "../../components/Cards/TitleCard";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import { openModal } from "../common/modalSlice";
import Table from "./components/Table";
import { fetchZoneDetails, fetchZoneDetailsBySearch } from "./productSlice";
import Paginate from "../../components/Pagination/Paginate";
import SearchBar from "../../components/Input/SearchBar";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const open = () => {
    dispatch(
      openModal({
        title: "Add zone details",
        bodyType: MODAL_BODY_TYPES.ADD_ZONE_DETAILS,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button className="btn btn-primary btn-sm ml-5" onClick={() => open()}>
        Add New
      </button>
    </div>
  );
};

function convertProductName(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SectionData = () => {
  const { zone, section } = useParams();
  const zoneSlug = zone;
  const category = convertProductName(section);
  const query = useQuery();
  const page = query.get("page") || 1;
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (searchText) {
      if (searchText.trim() !== "") {
        const obj = { category, zoneSlug, searchText };
        dispatch(fetchZoneDetailsBySearch(obj));
      }
    } else {
      const obj = { category, page, zoneSlug };
      dispatch(fetchZoneDetails(obj));
    }
  }, [searchText, page, dispatch]);

  const { isLoading, zoneDetails } = useSelector((state) => state.product);

  let emptyText;
  if (zoneDetails.zoneDetailsResults?.modelResults?.length === 0) {
    emptyText = "No data available, Please add one";
  }
  if (zoneDetails.details?.length === 0) {
    emptyText = `No search results for "${searchText}"`;
  }

  const deleteZoneDetails = (id) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this zone details?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.ZONE_DETAILS_DELETE,
          _id: id,
          category,
          zone,
          toastMsg: "Successfully Deleted!",
        },
      })
    );

    setSearchText("");
  };

  const editZoneDetails = (id) => {
    let selectedData;

    if (zoneDetails.zoneDetailsResults?.modelResults) {
      selectedData = zoneDetails.zoneDetailsResults?.modelResults?.filter(
        (z) => z._id === id
      );
    } else {
      selectedData = zoneDetails.details?.filter((z) => z._id === id);
    }

    const dataObj = { page, selectedData };
    dispatch(
      openModal({
        title: "Edit zone details",
        bodyType: MODAL_BODY_TYPES.ADD_ZONE_DETAILS,
        extraObject: dataObj,
      })
    );
    setSearchText("");
  };

  return (
    <>
      <div className="dark:text-white flex justify-end">
        <NavLink className={"btn btn-primary btn-sm"} to={`/app/zones/${zone}`}>
          Back
        </NavLink>
      </div>

      <div className="grid lg:grid-cols-3 mt-4 mb-8 md:grid-cols-2 grid-cols-1 gap-6">
        <div className="stats shadow p-4">
          <div className="text-center">
            <div className={`text-2xl dark:text-slate-300`}>Total Income:</div>
            <div className="text-2xl">{zoneDetails.totalIncomes}</div>
          </div>
        </div>
        <div className="stats shadow p-4">
          <div className="text-center">
            <div className={`text-2xl dark:text-slate-300`}>Total Expense:</div>
            <div className="text-2xl">{zoneDetails.totalExpenses}</div>
          </div>
        </div>
        <div className="stats shadow p-4">
          <div className="text-center">
            <div className={`text-2xl dark:text-slate-300`}>
              Total Net Income(Profit):
            </div>
            <div className="text-2xl">
              {zoneDetails.totalIncomes - zoneDetails.totalExpenses}
            </div>
          </div>
        </div>
      </div>

      {/* <TopSideButtons /> */}
      <TitleCard
        title="Zone Details"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
        SearchBar={
          <SearchBar
            placeholderText={"Search Details By Name"}
            searchText={searchText}
            setSearchText={setSearchText}
          />
        }
      >
        {zoneDetails.zoneDetailsResults?.modelResults?.length === 0 ||
        zoneDetails.details?.length === 0 ? (
          <h1 className="font-semibold text-center">
            {!isLoading && emptyText}
          </h1>
        ) : (
          <>
            <div className="overflow-x-auto w-full">
              <Table
                tableHeader={[
                  "employee name / resource",
                  "description",
                  "expense / income",
                  "amount",
                  "date",
                  "actions",
                ]}
                tableBody={
                  zoneDetails.zoneDetailsResults?.modelResults
                    ? zoneDetails.zoneDetailsResults.modelResults
                    : zoneDetails.details
                }
                editData={editZoneDetails}
                deleteData={deleteZoneDetails}
              />
            </div>
          </>
        )}
        <div className="flex justify-center">
          <Paginate
            page={parseInt(page) || 1}
            totalPages={zoneDetails.zoneDetailsResults?.totalPages}
            navigationLink={`/app/zones/${zone}/${section}?page=`}
          />
        </div>
      </TitleCard>
    </>
  );
};

export default SectionData;
