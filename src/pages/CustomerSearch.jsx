import { useState } from "react";
import { searchCustomers } from "../services/api.js";

function CustomerSearch() {
  const [query, setQuery] = useState("");
  const [customers, setCustomers] = useState([]);

  const handleSearch = async () => {
    const data = await searchCustomers(query);
    setCustomers(data);
  };

  return (
    <div className="container">
      <h2>Customer Search</h2>

      <input
        type="text"
        placeholder="Search by name, phone, ID, vehicle no"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Vehicle No</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.fullName}</td>
              <td>{c.phone}</td>
              <td>{c.vehicleNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerSearch;