import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

const DataDisplay = () => {
  const [selectedOption, setSelectedOption] = useState("APMC-Pune");
  const [data, setData] = useState([]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0]; // Extract and format the date
    return formattedDate;
  };

  useEffect(() => {
    try {
      fetch(
        `/api/tomatoData/get-tomato-data?selectedOption=${selectedOption}`,
        {
          method: "get",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((jsonData) => {
          console.log(jsonData);

          // Format the date field in the fetched data
          const formattedData = jsonData.map((item) => ({
            ...item,
            todaydate: formatDateString(item.todaydate),
          }));
          // console.log(formattedData);
          setData(formattedData);
        })
        .catch((error) => {
          console.error("Error fetching or processing data: " + error);
        });
    } catch (error) {
      console.error("Error in the fetch request: " + error);
    }
  }, [selectedOption]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/get-tomato-data?selectedOption=${selectedOption}`
      );

      if (response.ok) {
        const jsonData = await response.json();

        // Format the date field in the fetched data
        const formattedData = jsonData.map((item) => ({
          ...item,
          todaydate: formatDateString(item.todaydate),
        }));
        setData(formattedData);
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Make a DELETE request to the backend to delete the data
      const response = await fetch(`/api/tomatoData/delete-tomato/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted item from the data displayed in the frontend
        const updatedData = data.filter((item) => item._id !== id);
        setData(updatedData);
        console.log("Data deleted successfully");
        toast.success("Data deleted successfully");
      } else {
        console.error("Error deleting data");
        toast.error("Error deleting data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating verification status");
    }
  };

  let serialNo = 1;
  return (
    <>
      <div style={{margin: "30px 100px"}}>
        <div>
          <label>Select an option:</label>
          <select
            onChange={handleOptionChange}
            value={selectedOption}
            className="form-select"
            style={{ height: "40px", width: "200px" }}
          >
            <option value="">Select APMC</option>
            <option value="APMC-Jaysingpur">APMC Jaysingpur</option>
            <option value="APMC-Pune">APMC Pune</option>
            <option value="APMC-Satara">APMC Satara</option>
            <option value="APMC-Kolhapur">APMC Kolhapur</option>
          </select>
        </div>
        <div>
          <h3>Tomato Data for {selectedOption}</h3>
          <div className="table-responsive">
            <div></div>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Serial No</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Date</th>
                  {/* <th>Time</th> */}
                  <th>Weight</th>
                  <th>Expected Price</th>
                  <th>Verify</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id}>
                    <td>{serialNo++}</td>
                    <td>{item.name}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.todaydate}</td>
                    {/* <td>{item.currentTime}</td> */}
                    <td>{item.weight}</td>
                    <td>{item.price}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          toast.success("Data Submitted Successfully")
                        }
                      >
                        Submit
                      </button>
                    </td>
                    <td>
                      {/* Add the delete button */}
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default DataDisplay;
