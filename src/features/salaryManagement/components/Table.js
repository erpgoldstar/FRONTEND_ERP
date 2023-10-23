import moment from "moment/moment";
import "./tableStyles.css";

const Table = ({ tableHeader, tableBody, showAction, onHandleWithdraw }) => {
  const colWidth = `calc(100% / ${tableHeader.length})`;
  const style = { width: colWidth };

  return (
    <table className="tableDiv w-full">
      <thead>
        <tr>
          {showAction
            ? tableHeader.map((header, i) => (
                <th key={i} style={style} className="text-left">
                  {header}
                </th>
              ))
            : tableHeader.slice(0, -1).map((header, i) => (
                <th key={i} style={style} className="text-left">
                  {header}
                </th>
              ))}
        </tr>
      </thead>
      <tbody>
        {tableBody?.map((sal, i) => (
          <tr key={i}>
            <td>{sal.empName}</td>
            <td>Rs.{sal.salary}</td>
            <td>
              {sal.lastWithdrawals.amount === 0
                ? "-"
                : `Rs.${sal.lastWithdrawals.amount} - ${moment(
                    sal.lastWithdrawals.date
                  ).format("YYYY/MM/DD - HH:mm:ss")}`}
            </td>
            {showAction && (
              <td>
                <div className="flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id={sal._id}
                    className="border border-[#303640] p-2 rounded-tr-none rounded-br-none rounded-lg"
                  />
                  <button
                    type="button"
                    className="btn rounded-tl-none rounded-bl-none"
                    onClick={() => onHandleWithdraw(sal._id)}
                  >
                    withdraw
                  </button>
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
