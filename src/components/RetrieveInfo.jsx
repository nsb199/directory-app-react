import React, { useState } from 'react';

const RetrieveInfo = () => {
  const [searchCriteria, setSearchCriteria] = useState('aadhar');
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleRetrieve = () => {
    const people = JSON.parse(localStorage.getItem('people') || '[]');
    let foundPeople = [];

    if (searchCriteria === 'aadhar') {
      foundPeople = people.filter(p => p.aadhar.includes(searchValue));
    } else if (searchCriteria === 'name') {
      foundPeople = people.filter(p => p.name.toLowerCase().includes(searchValue.toLowerCase()));
    } else if (searchCriteria === 'mobile') {
      foundPeople = people.filter(p => p.mobile.includes(searchValue));
    }

    setResults(foundPeople);
    setSearchPerformed(true);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleRetrieve();
    }
  };

  return (
    <div>
      <select 
        value={searchCriteria} 
        onChange={(e) => setSearchCriteria(e.target.value)}
      >
        <option value="aadhar">Aadhar Number</option>
        <option value="name">Name</option>
        <option value="mobile">Mobile Number</option>
      </select>

      <input 
        type="text" 
        placeholder={`Enter ${searchCriteria.charAt(0).toUpperCase() + searchCriteria.slice(1)}`} 
        value={searchValue} 
        onChange={(e) => {
          setSearchValue(e.target.value);
          setSearchPerformed(false);
        }} 
        onKeyPress={handleKeyPress}
      />

      <button onClick={handleRetrieve}>Retrieve Information</button>

      {searchPerformed && results.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Aadhar Number</th>
              <th>Mobile Number</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {results.map((person, index) => (
              <tr key={index}>
                <td>{person.name}</td>
                <td>{person.dob}</td>
                <td>{person.aadhar}</td>
                <td>{person.mobile}</td>
                <td>{person.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : searchPerformed ? (
        <p className="message">No match found</p>
      ) : null}
    </div>
  );
};

export default RetrieveInfo;
