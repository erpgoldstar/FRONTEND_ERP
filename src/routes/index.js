// All components mapping with path for internal routes

import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Page404 = lazy(() => import("../pages/protected/404"));
const Blank = lazy(() => import("../pages/protected/Blank"));
const Charts = lazy(() => import("../pages/protected/Charts"));
const Zones = lazy(() => import("../pages/protected/Zones"));
const SingleProduct = lazy(() => import("../pages/protected/SectionData"));
const EmployeeManagement = lazy(() =>
  import("../pages/protected/EmployeeManagement")
);
const SalaryManagement = lazy(() =>
  import("../pages/protected/SalaryManagement")
);
const ProductCategories = lazy(() =>
  import("../pages/protected/ProductCategories")
);
const SectionData = lazy(() => import("../pages/protected/SectionData"));

const routes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/employee-management", component: EmployeeManagement },
  { path: "/salary-management", component: SalaryManagement },
  { path: "/zones", component: Zones },
  { path: "/product", component: SingleProduct },
  { path: "/charts", component: Charts },
  { path: "/zones/:zone", component: ProductCategories },
  { path: "/zones/:zone/:section", component: SectionData },
  { path: "/404", component: Page404 },
  { path: "/blank", component: Blank },
];

export default routes;
