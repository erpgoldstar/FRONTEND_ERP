import { useEffect, useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import { baseUrl } from "../../../utils/globalVariables";
import Table from "../../employeeManagement/components/Table";

function UserChannels() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/employees/allemployees`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <TitleCard title={"Available Employees"}>
      <div className="overflow-x-auto">
        <Table
          tableHeader={["Name", "Nic", "Address", "Salary", "Actions"]}
          tableBody={data}
          showAction={false}
        />
      </div>
    </TitleCard>
  );
}

export default UserChannels;
