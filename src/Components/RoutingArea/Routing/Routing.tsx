import { Route, Routes } from "react-router-dom";
import App from "../../../App";
// import Main from "../../LayoutArea/Main/Main";
import About from "../../PagesArea/About/About";
// import Donate from "../../PagesArea/Donate/Donate";
import Home from "../../PagesArea/Home/Home";
import Page404 from "../Page404/Page404";
// import AddTodo from "../../TodoArea/AddTodo/AddTodo";
// import DeleteTodo from "../../TodoArea/DeleteTodo/DeleteTodo";
// import EditTodo from "../../TodoArea/EditTodo/EditTodo";
// import TodoList from "../../TodoArea/TodoList/TodoList";
import "./Routing.css";
import Login from "../../AuthArea/Login/Login";
// import Register from "../../AuthArea/Register/Register";
import Logout from "../../AuthArea/Logout/Logout";
import CompanyList from "../../CompanyArea/CompnayList/CompanyList";
import DeleteCompany from "../../CompanyArea/DeleteCompany/DeleteCompany";
import UpdateCompany from "../../CompanyArea/UpdateCompany/UpdateCompany";
import AddComapny from "../../CompanyArea/AddCompany/AddComapny";
import CustomerList from "../../CustomerArea/CustomerItem/CustomerList";
import DeleteCustomer from "../../CustomerArea/DeleteCustomer/DeleteCustomer";
import UpdateCustomer from "../../CustomerArea/UpdateCustomer/UpdateCustomer";
import AddCustomer from "../../CustomerArea/AddCustomer/AddCustomer";
import CouponList from "../../CouponArea/CouponList/CouponList";
import DeleteCoupon from "../../CouponArea/DeleteCoupon/DeleteCoupon";
import UpdateCoupon from "../../CouponArea/UpdateCoupon/UpdateCoupon";
import AddCoupon from "../../CouponArea/AddCoupon/AddCoupon";
import CompanySingle from "../../CompanyArea/CompanySingle/CompanySingle";
import AllCoupon from "../../CouponArea/AllCoupon/AllCoupon";
import BuyCoupon from "../../CouponArea/BuyCoupon/BuyCoupon";
import MyCoupons from "../../CouponArea/MyCoupons/MyCoupons";
import MyCustomer from "../../CustomerArea/MyCustomer/MyCustomer";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/home" element={<Home />} />
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/companies" element={<CompanyList />} />
                <Route path="/companies/delete/:id" element={<DeleteCompany />} />
                <Route path="/companies/update/:id" element={<UpdateCompany />} />
                <Route path="/companies/add" element={<AddComapny />} />
                <Route path="/customers" element={<CustomerList />} />
                <Route path="/customers/delete/:id" element={<DeleteCustomer />} />
                <Route path="/customers/update/:id" element={<UpdateCustomer />} />
                <Route path="/customers/add" element={<AddCustomer />} />
                <Route path="/coupons" element={<CouponList />} />
                <Route path="/coupons/delete/:id" element={<DeleteCoupon />} />
                <Route path="/coupons/update/:id" element={<UpdateCoupon />} />
                <Route path="/coupons/add" element={<AddCoupon />} />
                <Route path="/companyinfo" element={<CompanySingle />} />
                <Route path="/all/coupons" element={<AllCoupon />} />
                <Route path="/all/coupons/buy/:id" element={<BuyCoupon />} />
                <Route path="/customer/mycoupons" element={<MyCoupons />} />
                <Route path="/customer/myinfo" element={<MyCustomer />} />
                


                {/* <Route path="/donate" element={<Donate to={"kobi"} bank={12} branch={150} account={123456} />} />
                <Route path="/tasks" element={<TodoList />} />
                <Route path="/tasks/add" element={<AddTodo />} />
                 */}
                <Route path="login" element={<Login />} />
                {/* <Route path="register" element={<Register />} /> */}
                <Route path="logout" element={<Logout />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}

export default Routing;