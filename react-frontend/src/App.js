import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import Users from "./Pages/Dashboard/Users";
import Logout from "./Pages/Auth/LogOut";
import GoogleCallBack from "./Pages/Auth/GoogleCallBack";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireAuth from "./Pages/Auth/RequireAuth";
import User from "./Pages/Dashboard/User";
import AddUser from "./Pages/Dashboard/AddUser";
import "flowbite";
import Error403 from "./Pages/Auth/Error403";
import Writer from "./Pages/Dashboard/Writer";
import Error404 from "./Pages/Auth/Error404";
import RequireBack from "./Pages/Auth/RequireBack";
import Categories from "./Pages/Dashboard/Categories";
import AddCategory from "./Pages/Dashboard/AddCategory";
import Category from "./Pages/Dashboard/Category";
import Products from "./Pages/Dashboard/Products";
import AddProduct from "./Pages/Dashboard/AddProduct";
import UpdateProduct from "./Pages/Dashboard/UpdateProduct";
import HomeWebSite from "./Pages/WebSite/HomePage/HomePage";
import WebSite from "./Pages/WebSite/WebSite";
import WebSiteCategories from "./Pages/WebSite/Categories/Categories";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route  element={<WebSite />}>
        <Route path="/"  element={<HomeWebSite />}/>
          <Route path="/categories" element={<WebSiteCategories />} />
        </Route>
        <Route element={<RequireBack />}>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>

        <Route path="/users" element={<Users />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/auth/google/callback" element={<GoogleCallBack />} />
        <Route path="/*" element={<Error404 />}></Route>
        {/*Protected Routes*/}
        <Route element={<RequireAuth allowedRole={["1996", "1995", "1999"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            {/* <Route index element={<Users/>}/> */}

            <Route path="users" index element={<Users />} />
            <Route path="users/:id" element={<User />} />
            <Route path="user/add" element={<AddUser />} />

            <Route
              element={<RequireAuth allowedRole={["1996", "1999", "1995"]} />}
            >
              {/*categories */}
              <Route path="categories" element={<Categories />} />
              <Route path="categories/:id" element={<Category />} />
              <Route path="categories/add" element={<AddCategory />} />
              {/*products */}
              <Route path="products" element={<Products />} />
              <Route path="updateProduct/:id" element={<UpdateProduct />} />
              <Route path="products/add" element={<AddProduct />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1996", "1995"]} />}>
              <Route path="writer" element={<Writer />} />
            </Route>
          </Route>
        </Route>
        <Route path="403" element={<Error403 />} />
      </Routes>
    </div>
  );
}

export default App;
