import DashboardStats from "./components/DashboardStats";
import BarChart from "./components/BarChart";
import DashboardTopBar from "./components/DashboardTopBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllExpensesAndIncomes,
  getDashboardChartData,
} from "./dashboardSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const [period, setPeriod] = useState("THIS_WEEK");

  useEffect(() => {
    dispatch(getAllExpensesAndIncomes());
    dispatch(getDashboardChartData(period));
  }, [period]);

  const fetchTotExpAndInc = useSelector((state) => state.dashboard.total);
  const dashboardData = useSelector((state) => state.dashboard.dashboardData);

  return (
    <>
      {/** ---------------------- Different stats content 1 ------------------------- */}
      <div className="grid lg:grid-cols-3 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        <DashboardStats
          title="Incomes"
          value={fetchTotExpAndInc.totalIncomes}
        />

        <DashboardStats
          title="Expenses"
          value={fetchTotExpAndInc.totalExpenses}
        />

        <DashboardStats
          title="Profit"
          value={
            fetchTotExpAndInc.totalIncomes - fetchTotExpAndInc.totalExpenses
          }
        />
      </div>

      {/** ---------------------- Select Period Content ------------------------- */}
      <DashboardTopBar setPeriod={setPeriod} />

      {/** ---------------------- Different charts ------------------------- */}
      <div className="grid lg:grid-cols-1 mt-1 md:grid-cols-2 grid-cols-1 gap-6">
        {/* <LineChart /> */}
        <BarChart
          chartYaxisName="Total Expenses"
          period={period}
          array={dashboardData?.filteredExpenses}
          xAxisLabels={dashboardData?.xAxisLabels}
        />

        <BarChart
          array={dashboardData?.filteredIncomes}
          chartYaxisName="Total Incomes"
          period={period}
          xAxisLabels={dashboardData?.xAxisLabels}
        />
      </div>

      {/** ---------------------- User source channels table  ------------------------- */}
      {/* <div className="grid lg:grid-cols-1 mt-4 grid-cols-1 gap-6">
        <UserChannels />
      </div> */}
    </>
  );
}

export default Dashboard;
