import React, { useState, useEffect } from 'react';

const AddPerson = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const savedPeople = JSON.parse(localStorage.getItem('people') || '[]');
    setRows(savedPeople);
  }, []);

  const addRow = () => {
    setRows([...rows, { name: '', dob: '', aadhar: '', mobile: '', age: '', isSaved: false }]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = rows.map((row, i) => i === index ? { ...row, [name]: value } : row);
    if (name === 'dob') {
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      updatedRows[index].age = age;
    }
    setRows(updatedRows);
  };

  const saveRow = (index) => {
    const row = rows[index];
    if (row.name && row.dob && row.aadhar.length === 12 && row.mobile.length === 10) {
      row.isSaved = true;
      const savedPeople = JSON.parse(localStorage.getItem('people') || '[]');
      savedPeople.push(row);
      localStorage.setItem('people', JSON.stringify(savedPeople));
      setRows([...rows]);
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

  const deleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    const savedPeople = JSON.parse(localStorage.getItem('people') || '[]').filter((_, i) => i !== index);
    localStorage.setItem('people', JSON.stringify(savedPeople));
    setRows(updatedRows);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Aadhar Number</th>
            <th>Mobile Number</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td><input type="text" name="name" value={row.name} onChange={(e) => handleInputChange(index, e)} /></td>
              <td><input type="date" name="dob" value={row.dob} onChange={(e) => handleInputChange(index, e)} /></td>
              <td><input type="text" name="aadhar" value={row.aadhar} onChange={(e) => handleInputChange(index, e)} /></td>
              <td><input type="text" name="mobile" value={row.mobile} onChange={(e) => handleInputChange(index, e)} /></td>
              <td>{row.age}</td>
              <td>
                {row.isSaved ? (
                  <button onClick={() => deleteRow(index)}>Delete</button>
                ) : (
                  <button onClick={() => saveRow(index)}>Save</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'center' }}>
        <button onClick={addRow}>Add New Person</button>
      </div>
    </div>
  );
};

export default AddPerson;
