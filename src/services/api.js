const BASE_URL = "/api";

//  existing functions (keep these) 
export const getCustomerDetails = (id) =>
    fetch(`${BASE_URL}/customers/${id}/details`).then(res => res.json());

export const createInvoice = (data) =>
    fetch(`${BASE_URL}/sales/create-invoice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(res => res.json());

//  Feature 1: Financial Reports 

// Get daily report for a specific date e.g. "2026-04-29"
export const getDailyReport = (date) =>
    fetch(`${BASE_URL}/admin/reports/daily?date=${date}`).then(res => res.json());

// Get monthly report for a year and month e.g. year=2026, month=4
export const getMonthlyReport = (year, month) =>
    fetch(`${BASE_URL}/admin/reports/monthly?year=${year}&month=${month}`).then(res => res.json());

// Get yearly report for a specific year e.g. 2026
export const getYearlyReport = (year) =>
    fetch(`${BASE_URL}/admin/reports/yearly?year=${year}`).then(res => res.json());

// Get a quick summary of today, this month, and this year
export const getReportSummary = () =>
    fetch(`${BASE_URL}/admin/reports/summary`).then(res => res.json());

//  Feature 2: Staff Management 

// Get all staff members
export const getAllStaff = () =>
    fetch(`${BASE_URL}/admin/staff`).then(res => res.json());

// Get one staff member by their ID
export const getStaffById = (id) =>
    fetch(`${BASE_URL}/admin/staff/${id}`).then(res => res.json());

// Register a new staff member
export const registerStaff = (data) =>
    fetch(`${BASE_URL}/admin/staff/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(res => res.json());

// Update a staff member's full details
export const updateStaff = (id, data) =>
    fetch(`${BASE_URL}/admin/staff/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(res => res.json());

// Update only the role of a staff member
export const updateStaffRole = (id, role) =>
    fetch(`${BASE_URL}/admin/staff/${id}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role })
    }).then(res => res.json());

// Delete a staff member
export const deleteStaff = (id) =>
    fetch(`${BASE_URL}/admin/staff/${id}`, {
        method: "DELETE"
    }).then(res => res.json());