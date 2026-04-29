const BASE_URL = "http://localhost:5285/api";

export const getCustomerDetails = (id) =>
    fetch(`${BASE_URL}/customers/${id}/details`).then(res => res.json());

export const createInvoice = (data) =>
    fetch(`${BASE_URL}/sales/create-invoice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(res => res.json());

// ---------- PARTS ----------
export const getParts = async () => {
    const res = await fetch(`${BASE_URL}/parts`);
    return res.json();
};

export const addPart = async (part) => {
    const res = await fetch(`${BASE_URL}/parts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(part)
    });

    return res.json();
};

// ---------- PURCHASE ----------
export const createPurchase = async (invoice) => {
    const res = await fetch(`${BASE_URL}/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoice)
    });

    return res.json();
};