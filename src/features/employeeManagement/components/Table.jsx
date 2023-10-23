import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import "./tableStyles.css";

const Table = ({ tableHeader, tableBody, editEmp, deleteEmp, showAction }) => {
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
        {tableBody?.map((emp, i) => (
          <tr key={i}>
            <td>{emp.name}</td>
            <td>{emp.nic}</td>
            <td>{emp.address}</td>
            <td>{emp.salary}</td>
            {showAction && (
              <td>
                <button
                  className="btn btn-square btn-ghost"
                  onClick={() => editEmp(emp._id)}
                >
                  <PencilSquareIcon className="w-5 h-5" />
                </button>
                <button
                  className="btn btn-square btn-ghost"
                  onClick={() => deleteEmp(emp._id)}
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
