import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Settings from "./pages/Settings";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import ThemeProvider from "./context/ThemeContext";
import AdminLayout from "./layouts/AdminLayout";
import AdminRoute from "./routes/AdminRoute";
import RouteLoader from "./components/RouteLoader";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <RouteLoader>
          <Routes>

            {/* Auth */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-register" element={<AdminRegister />} />

            {/* Protected Admin Layout */}
            <Route
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<OrderDetails />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

          </Routes>
        </RouteLoader>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
