import axios from "axios";

const BASE_URL = "http://localhost:5285/api";

const api = axios.create({
    baseURL: BASE_URL,
});

// ---------- AUTH ----------
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

// ---------- CUSTOMER ----------
export const getCustomerDetails = async (id) => {
    const res = await fetch(`${BASE_URL}/customers/${id}/details`);
    return res.json();
};

export const searchCustomers = async (query) => {
    const res = await fetch(`${BASE_URL}/customers/search?query=${query}`);
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

// ---------- VENDORS ----------
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

// ---------- ADMIN REPORTS ----------
export const getDailyReport = (date) =>
    api.get(`/admin/reports/daily?date=${date}`);

export const getMonthlyReport = (year, month) =>
    api.get(`/admin/reports/monthly?year=${year}&month=${month}`);

export const getYearlyReport = (year) =>
    api.get(`/admin/reports/yearly?year=${year}`);

export const getReportSummary = () =>
    api.get("/admin/reports/summary");

export const getNotificationSummary = () =>
    api.get("/notifications/summary");

// ---------- STAFF MANAGEMENT ----------
export const getAllStaff = () =>
    api.get("/admin/staff");

export const registerStaff = (data) =>
    api.post("/admin/staff/register", data);

export const getStaff = () =>
    api.get("/admin/staff");

export const updateStaffRole = (id, role) =>
    api.put(`/admin/staff/${id}/role`, { role });

export const updateStaff = (id, data) =>
    api.put(`/admin/staff/${id}`, data);

export const deleteStaff = (id) =>
    api.delete(`/admin/staff/${id}`);

export default api;