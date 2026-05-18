const BASE_URL = "http://localhost:5285/api";

// ---------- CUSTOMER ----------
export const getCustomerDetails = async (id) => {
    const res = await fetch(`${BASE_URL}/customers/${id}/details`);
    return res.json();
};

// ---------- INVOICE / SALES ----------
export const createInvoice = async (data) => {
    const res = await fetch(`${BASE_URL}/sales/create-invoice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    return res.json();
};

// ---------- PARTS ----------
export const getParts = async () => {
    const res = await fetch(`${BASE_URL}/parts`);
    return res.json();
};

export const addPart = async (part) => {
    const res = await fetch(`${BASE_URL}/parts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(part),
    });

    return res.json();
};

// ---------- PURCHASE ----------
export const createPurchase = async (invoice) => {
    const res = await fetch(`${BASE_URL}/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoice),
    });

    return res.json();
};

// ---------- VENDORS  ----------


export const getVendors = async () => {
    const res = await fetch(`${BASE_URL}/vendors`);
    return res.json();
};

export const createVendor = async (vendor) => {
    const res = await fetch(`${BASE_URL}/vendors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vendor),
    });

    return res.json();
};

export const updateVendor = async (id, vendor) => {
    const res = await fetch(`${BASE_URL}/vendors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vendor),
    });

    return res.json();
};

export const deleteVendor = async (id) => {
    const res = await fetch(`${BASE_URL}/vendors/${id}`, {
        method: "DELETE",
    });

    return res.json();
};

const BASE_URL = "http://localhost:5285/api/customers";

export const searchCustomers = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search?query=${query}`
  );

  return response.json();
};