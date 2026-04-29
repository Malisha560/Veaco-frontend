const BASE_URL = "http://localhost:5285/api";

export const getCustomerDetails = (id) =>
    fetch(`${BASE_URL}/customers/${id}/details`).then(res => res.json());

export const createInvoice = (data) =>
    fetch(`${BASE_URL}/sales/create-invoice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(res => res.json());