import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Website/HomePage";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Users from "./Pages/Dashboard/Users";
import GoogleCallBack from "./Pages/Auth/GoogleCallBack";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireAuth from "./Pages/Auth/RequireAuth";
import User from "./Pages/Dashboard/User";
import AddUser from "./Pages/Dashboard/AddUser";
import Err404 from "./Pages/Auth/404";
import RequireBack from "./Pages/Auth/RequireBack";
import Categories from "./Pages/Dashboard/Categories";
import AddCategories from "./Pages/Dashboard/AddCategories";
import Category from "./Pages/Dashboard/Category";
import Products from "./Pages/Dashboard/Products";
import AddProduct from "./Pages/Dashboard/AddProduct";
import UpdateProduct from "./Pages/Dashboard/Product";
import AllCategories from "./Pages/Website/AllCategories";
import Website from "./Pages/Website/Website";
import SingleProduct from "./Components/Website/Product/Single Product/SingleProduct";

export default function App() {
  return (
    <div className="App">
      <Routes>
        {/* public routes */}
        <Route element={<Website />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/AllCategories" element={<AllCategories />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Route>
        <Route element={<RequireBack />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/users" element={<Users />} />
        <Route path="/auth/google/callback" element={<GoogleCallBack />} />
        <Route path="/*" element={<Err404 />} />
        {/* protected routes */}
        <Route element={<RequireAuth allowedRole={["1996", "1995", "1999"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={["1995"]} />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<User />} />
              <Route path="users/add" element={<AddUser />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1999", "1995"]} />}>
              {/* Categories */}
              <Route path="categories" element={<Categories />} />
              <Route path="categories/:id" element={<Category />} />
              <Route path="category/add" element={<AddCategories />} />
              {/* Products */}
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<UpdateProduct />} />
              <Route path="product/add" element={<AddProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
