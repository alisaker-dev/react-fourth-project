import Topbar from "../../Components/Dashboard/Topbar";
import Sidebar from "../../Components/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import "./dashboard.css";
export default function Dashboard() {
  return (
    <div className="position-relative">
      <Topbar />
      <div className="dashboard d-flex gap-1" style={{ marginTop: "70px" }}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
