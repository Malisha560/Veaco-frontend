const BASE_URL = "http://localhost:5285/api";

export const loginUser = async (data) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Invalid email or password");
    }

    return response.json();
};

export const getCustomerDetails = (id) =>
    fetch(`${BASE_URL}/customers/${id}/details`).then((res) => res.json());

export const createInvoice = (data) =>
    fetch(`${BASE_URL}/sales/create-invoice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then((res) => res.json());