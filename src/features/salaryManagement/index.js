import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import TitleCard from "../../components/Cards/TitleCard";
import SearchBar from "../../components/Input/SearchBar";
import Paginate from "../../components/Pagination/Paginate";
import { openModal } from "../common/modalSlice";
import Table from "./components/Table";
import { getSalaries, getSalariesByName, withdraw } from "./salarySlice";

const TopSideButtons = ({ page }) => {
  const dispatch = useDispatch();

  const openAddNewEmployeeModal = () => {
    dispatch(
      openModal({
        title: "Add New Employee",
        // bodyType: MODAL_BODY_TYPES.EMPLOYEE_ADD_NEW,
        // extraObject: { page },
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewEmployeeModal()}
      >
        Add New
      </button>
    </div>
  );
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SalaryManagement = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const page = query.get("page") || 1;
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (searchText) {
      if (searchText.trim() !== "") {
        dispatch(getSalariesByName(searchText));
      }
    } else {
      dispatch(getSalaries(page));
    }
  }, [page, dispatch, searchText]);

  const fetchSalaries = useSelector((state) => state.salary.salaries);
  const { isLoading } = useSelector((state) => state.salary);

  let emptyText;
  if (fetchSalaries.modelResults?.length === 0) {
    emptyText = "No salary details available";
  }
  if (fetchSalaries?.length === 0) {
    emptyText = `No search results for "${searchText}"`;
  }

  const handleWithdraw = (id) => {
    const amount = document.getElementById(id).value;
    const payloadObj = { id, amount };
    dispatch(withdraw(payloadObj));
    document.getElementById(id).value = "";
  };

  return (
    <>
      <TitleCard
        title="title"
        topMargin="mt-2"
        // TopSideButtons={<TopSideButtons />}
        SearchBar={
          <SearchBar
            placeholderText={"Search Employees"}
            searchText={searchText}
            setSearchText={setSearchText}
          />
        }
      >
        {fetchSalaries.modelResults?.length === 0 ||
        fetchSalaries?.length === 0 ? (
          <h1 className="font-semibold text-center">
            {!isLoading && emptyText}
          </h1>
        ) : (
          <Table
            tableHeader={[
              "name",
              "available salary",
              "last withrawal amount and date",
              "actions",
            ]}
            tableBody={
              fetchSalaries.modelResults
                ? fetchSalaries?.modelResults
                : fetchSalaries
            }
            showAction={true}
            onHandleWithdraw={handleWithdraw}
          />
        )}
        <div className="flex justify-center">
          <Paginate
            page={parseInt(page) || 1}
            totalPages={fetchSalaries.totalPages}
            navigationLink="/app/salary-management?page="
          />
        </div>
      </TitleCard>
    </>
  );
};

export default SalaryManagement;
