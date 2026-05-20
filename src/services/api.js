import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5285/api",
});

/* REPORTS */
export const getDailyReport = (date) =>
    api.get(`/admin/reports/daily?date=${date}`);

export const getMonthlyReport = (year, month) =>
    api.get(`/admin/reports/monthly?year=${year}&month=${month}`);

export const getYearlyReport = (year) =>
    api.get(`/admin/reports/yearly?year=${year}`);

/* DASHBOARD */
export const getReportSummary = () =>
    api.get("/admin/reports/summary");

export const getNotificationSummary = () =>
    api.get("/notifications/summary");

export const getAllStaff = () =>
    api.get("/admin/staff");
/* STAFF */

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