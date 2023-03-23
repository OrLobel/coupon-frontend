
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import notify, { SccMsg } from "../../../Services/Notification";
import { useNavigate } from "react-router-dom";
import web from "../../../Services/WebApi";
import store from "../../../Redux/Store";
import Button from 'react-bootstrap/Button';
import { CustomerModel } from "../../../Models/Customer";
import { addCustomerAction } from "../../../Redux/CustomerState";
function AddCustomer(): JSX.Element {


    const navigate = useNavigate();

    // Step 6 - Manage Your schema
    const schema = yup.object().shape({
        email:
        yup.string()
            .email()
            .required("Email is required"),
    firstName:
        yup.string()
            .required("First Name is required"),
    lastName:
        yup.string()
            .required("Last Name is required"),
    password:
        yup.string()
            .min(4)
            .required("Password is required"),

    });

    // Step 7 - useHook for the rescue!!!!!!!!
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<CustomerModel>({ mode: "all", resolver: yupResolver(schema) });

    //  Step 8 - Send to Remote as post request
    const yalla = async (customer: CustomerModel) => {

        console.log(customer);
        console.log(JSON.stringify(customer));

        web.addCustomer(customer)
            .then(res => {
                notify.success(SccMsg.ADD_Customer);
                navigate('/customers');
                // Update App State (Global State)
                store.dispatch(addCustomerAction(res.data));
            })
            .catch(err => {
                notify.error('Oppsy : ' + err.message);
                navigate('/customers');
            });
    }

    return (
        <div className="AddTodo flex-center-col">
            <h1>Add Customer</h1>
            {/* Step 9 - handleSubmit your form  */}
            <form onSubmit={handleSubmit(yalla)} className="flex-center-col">
                <label htmlFor="email">Email</label>
                <input  {...register("email")} type="text" placeholder="email" id="email" />
                <span>{errors.email?.message}</span>
                <label htmlFor="firstName">First Name</label>
                <input  {...register("firstName")} type="text" placeholder="firstName" id="firstName" />
                <span>{errors.firstName?.message}</span>
                <label htmlFor="lastName">Last Name</label>
                <input  {...register("lastName")} type="text" placeholder="lastName" id="lastName" />
                <span>{errors.lastName?.message}</span>
                <label htmlFor="password">Password</label>
                <input  {...register("password")} type="password" placeholder="password" id="password" />
                <span>{errors.password?.message}</span>
                {/* <button className="button-success" disabled={!isValid}>Add</button> */}
                <Button disabled={!isValid} variant="success" type="submit">Add</Button>
            </form>
        </div>
    );
}

export default AddCustomer;
