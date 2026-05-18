import { useEffect, useState } from "react";
import {
  getVendors,
  createVendor,
  deleteVendor,
} from "../services/vendorService";

function Vendors() {
  const [vendors, setVendors] = useState([]);

  const [form, setForm] = useState({
    vendorName: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
  });

  const loadVendors = async () => {
    const data = await getVendors();
    setVendors(data);
  };

  useEffect(() => {
    loadVendors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createVendor(form);

    setForm({
      vendorName: "",
      contactPerson: "",
      phone: "",
      email: "",
      address: "",
    });

    loadVendors();
  };

  const handleDelete = async (id) => {
    await deleteVendor(id);
    loadVendors();
  };

  return (
    <div className="container">
      <h2>Vendor Management</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Vendor Name"
          value={form.vendorName}
          onChange={(e) =>
            setForm({ ...form, vendorName: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Contact Person"
          value={form.contactPerson}
          onChange={(e) =>
            setForm({ ...form, contactPerson: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
        />

        <button type="submit">Add Vendor</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {vendors.map((v) => (
            <tr key={v.id}>
              <td>{v.vendorName}</td>
              <td>{v.contactPerson}</td>
              <td>{v.phone}</td>
              <td>{v.email}</td>

              <td>
                <button onClick={() => handleDelete(v.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Vendors;