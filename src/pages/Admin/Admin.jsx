import { Link, Routes, Route } from "react-router-dom";
import Parts from "./Parts";
import Purchase from "./Purchase";
import Vendors from "./Vendors";

export default function Admin() {
  return (
	<div style={{ display: "flex" }}>
	  <aside style={{ width: 220, padding: 16, borderRight: "1px solid #ddd" }}>
		<h3>Admin</h3>
		<nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
		  <Link to="/admin/parts">Parts</Link>
		  <Link to="/admin/purchase">Purchase</Link>
		  <Link to="/admin/vendors">Vendors</Link>
		</nav>
	  </aside>

	  <main style={{ flex: 1, padding: 16 }}>
		<Routes>
		  <Route path="parts" element={<Parts />} />
		  <Route path="purchase" element={<Purchase />} />
		  <Route path="vendors" element={<Vendors />} />
		</Routes>
	  </main>
	</div>
  );
}
