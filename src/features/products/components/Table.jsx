import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import "./tableStyles.css";
import moment from "moment";

const Table = ({ tableHeader, tableBody, editData, deleteData }) => {
  const colWidth = `calc(100% / ${tableHeader.length})`;
  const style = { width: colWidth };

  return (
    <table className="tableDiv w-full">
      <thead>
        <tr>
          {tableHeader.map((header, i) => (
            <th key={i} style={style} className="text-left">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableBody?.map((data, i) => (
          <tr key={i}>
            <td>{data?.empName || data?.resource}</td>
            <td>
              {data?.eDescription || data?.iDescription}
            </td>
            <td>{data?.type}</td>
            <td>{data?.salary || data?.amount}</td>
            <td>{moment(data?.createdAt).format("MMMM DD, YYYY")}</td>
            <td>
              <button
                className="btn btn-square btn-ghost"
                onClick={() => editData(data?._id)}
              >
                <PencilSquareIcon className="w-5 h-5" />
              </button>
              <button
                className="btn btn-square btn-ghost"
                onClick={() => deleteData(data?._id)}
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
