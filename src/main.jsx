import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./index.css"

import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home/Home"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import AdminDashboard from "./layouts/AdminDashboard"
import AdminHome from "./components/admin/AdminHome"
import AuthProvider from "./context/AuthProvider"
import PendingOrders from "./components/admin/PendingOrders/PendingOrders"
import Orders from "./components/admin/Orders/Orders"
import ManageUsers from "./components/admin/ManageUsers/ManageUsers"
import Category from "./components/admin/Category/Category"
import AddProduct from "./components/admin/AddProduct/AddProduct"
import ManageProducts from "./components/admin/ManageProducts/ManageProducts"
import Settings from "./components/admin/Settings/Settings"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            {/* <Route path="products" element={<Products />} /> */}
            {/* <Route path="about" element={<About />} /> */}
            {/* <Route path="contact" element={<Contact />} /> */}
          </Route>

          {/* Auth Routes (no layout) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminHome />} />
            <Route path="/admin/pending-orders" element={<PendingOrders />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/category" element={<Category />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/manage-products" element={<ManageProducts />} />
            <Route path="/admin/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
