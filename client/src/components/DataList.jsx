import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { fetchData, updateData, deleteData } from '../services/api';
import { Card, Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

const DataList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await fetchData();
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataFromApi();
  }, []);

  const handleDeleteClick = async (id) => {
    try {
      await deleteData(id);
      const updatedData = await fetchData();
      setData(updatedData);
      Swal.fire('Success', 'Data deleted successfully!', 'success');
    } catch (error) {
      console.error("Error deleting data:", error);
      Swal.fire('Error', 'Failed to delete data', 'error');
    }
  };

  const handleEditClick = async (item) => {
    const { value: updatedDataArray } = await Swal.fire({
      title: 'Edit Data',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Name" value="${item.Name}">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Age" value="${item.Age}">` +
        `<input id="swal-input3" class="swal2-input" placeholder="City" value="${item.City}">` +
        `<input id="swal-input4" class="swal2-input" placeholder="Email" value="${item.Email}">` +
        `<input id="swal-input5" class="swal2-input" placeholder="Phone Number" value="${item['Phone Number']}">`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
          document.getElementById('swal-input3').value,
          document.getElementById('swal-input4').value,
          document.getElementById('swal-input5').value,
        ];
      }
    });

    if (updatedDataArray) {
      const updatedDataObject = {
        Name: updatedDataArray[0],
        Age: updatedDataArray[1],
        City: updatedDataArray[2],
        Email: updatedDataArray[3],
        'Phone Number': updatedDataArray[4],
      };

      try {
        await updateData(item.ID, updatedDataObject);
        const updatedData = await fetchData();
        setData(updatedData);
        Swal.fire('Success', 'Data updated successfully!', 'success');
      } catch (error) {
        console.error("Error updating data:", error);
        Swal.fire('Error', 'Failed to update data', 'error');
      }
    }
  };

  return (
    <div>
      <h1>Data List</h1>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {["Name", "Age", "City", "Email", "Phone Number", "Actions"].map((head, index) => (
                <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item.Name}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item.Age}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item.City}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item.Email}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item['Phone Number']}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Button color='blue' onClick={() => handleEditClick(item)}>Edit</Button>
                  <Button color='red' onClick={() => handleDeleteClick(item.ID)}>Delete</Button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default DataList;
