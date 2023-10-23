/** Icons are imported separatly to reduce build time */
import {
  BellIcon,
  DocumentTextIcon,
  Squares2X2Icon,
  TableCellsIcon,
  WalletIcon,
  CodeBracketSquareIcon,
  DocumentIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  Cog6ToothIcon,
  BoltIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  InboxArrowDownIcon,
  UsersIcon,
  KeyIcon,
  DocumentDuplicateIcon,
  ListBulletIcon,
  UserGroupIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  },
  {
    path: "/app/zones",
    icon: <ListBulletIcon className={iconClasses} />,
    name: "Zones",
  },
  {
    path: "/app/employee-management",
    icon: <UserGroupIcon className={iconClasses} />,
    name: "Employee Management",
  },
  {
    path: "/app/salary-management",
    icon: <BanknotesIcon className={iconClasses} />,
    name: "Salary Management",
  },
  // {
  //   path: "/app/leads", // url
  //   icon: <InboxArrowDownIcon className={iconClasses} />, // icon component
  //   name: "Leads", // name that appear in Sidebar
  // },
  // {
  //   path: "/app/transactions", // url
  //   icon: <CurrencyDollarIcon className={iconClasses} />, // icon component
  //   name: "Transactions", // name that appear in Sidebar
  // },
  // {
  //   path: "/app/charts", // url
  //   icon: <ChartBarIcon className={iconClasses} />, // icon component
  //   name: "Analytics", // name that appear in Sidebar
  // },
  // {
  //   path: "/app/integration", // url
  //   icon: <BoltIcon className={iconClasses} />, // icon component
  //   name: "Integration", // name that appear in Sidebar
  // },
  // {
  //   path: "/app/calendar", // url
  //   icon: <CalendarDaysIcon className={iconClasses} />, // icon component
  //   name: "Calendar", // name that appear in Sidebar
  // },

  // {
  //   path: "", //no url needed as this has submenu
  //   icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
  //   name: "Pages", // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: "/login",
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
  //       name: "Login",
  //     },
  //     {
  //       path: "/register", //url
  //       icon: <UserIcon className={submenuIconClasses} />, // icon component
  //       name: "Register", // name that appear in Sidebar
  //     },
  //     {
  //       path: "/forgot-password",
  //       icon: <KeyIcon className={submenuIconClasses} />,
  //       name: "Forgot Password",
  //     },
  //     {
  //       path: "/app/blank",
  //       icon: <DocumentIcon className={submenuIconClasses} />,
  //       name: "Blank Page",
  //     },
  //     {
  //       path: "/app/404",
  //       icon: <ExclamationTriangleIcon className={submenuIconClasses} />,
  //       name: "404",
  //     },
  //   ],
  // },
  // {
  //   path: "", //no url needed as this has submenu
  //   icon: <Cog6ToothIcon className={`${iconClasses} inline`} />, // icon component
  //   name: "Settings", // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: "/app/settings-profile", //url
  //       icon: <UserIcon className={submenuIconClasses} />, // icon component
  //       name: "Profile", // name that appear in Sidebar
  //     },
  //     {
  //       path: "/app/settings-billing",
  //       icon: <WalletIcon className={submenuIconClasses} />,
  //       name: "Billing",
  //     },
  //     {
  //       path: "/app/settings-team", // url
  //       icon: <UsersIcon className={submenuIconClasses} />, // icon component
  //       name: "Team Members", // name that appear in Sidebar
  //     },
  //   ],
  // },
  // {
  //   path: "", //no url needed as this has submenu
  //   icon: <DocumentTextIcon className={`${iconClasses} inline`} />, // icon component
  //   name: "Documentation", // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: "/app/getting-started", // url
  //       icon: <DocumentTextIcon className={submenuIconClasses} />, // icon component
  //       name: "Getting Started", // name that appear in Sidebar
  //     },
  //     {
  //       path: "/app/features",
  //       icon: <TableCellsIcon className={submenuIconClasses} />,
  //       name: "Features",
  //     },
  //     {
  //       path: "/app/components",
  //       icon: <CodeBracketSquareIcon className={submenuIconClasses} />,
  //       name: "Components",
  //     },
  //   ],
  // },
];

export default routes;
