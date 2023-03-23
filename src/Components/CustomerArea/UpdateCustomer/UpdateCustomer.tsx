import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import axios from "axios";
import notify, { SccMsg } from "../../../Services/Notification";
import { useNavigate, useParams } from "react-router-dom";
import web from "../../../Services/WebApi";
import store from "../../../Redux/Store";
import { CustomerModel } from "../../../Models/Customer";
import { updateCustomerAction } from "../../../Redux/CustomerState";

interface EditCustomerProps { }
function UpdateCustomer(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const taskId = +(params.id || 0);

    const [id, setId] = useState<number>(taskId);
    // Read from App State (Global State)
    const [customer, setCustomers] = useState<CustomerModel>(store.getState().customersReducer.customers.filter(t => t.id === id)[0]);
    // const [origin, setOrigin] = useState<TodoPayloadModel>({ 'caption': '', 'info': '', 'classification': '', 'dueDate': new Date() })
    const [origin, setOrigin] = useState<CustomerModel>({ 'email': customer.email, 'firstName': customer.firstName, 'lastName': customer.lastName, 'password': customer.password })

    // Step 6 - Manage Your schema
    const schema = yup.object().shape({
        email:
            yup.string()
                .required("Email is required"),
        firstName:
            yup.string()
                .required("First Name is required"),
        lastName:
            yup.string()
                .required("Last Name is required"),
        password:
            yup.string()
                .required("Password is required"),
    });

    // Step 7 - Prepare the Hook
    let defaultValuesObj = { ...origin };

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
        = useForm<CustomerModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const { dirtyFields } = useFormState({ control });

    //  Step 8 - Send to Remote as put request
    const yalla = async (customer: CustomerModel) => {
        web.updateCustomer(id, customer)
            .then(res => {
                notify.success(SccMsg.UPDATE_TASK);
                navigate('/customers');
                // Update App State (Global State)
                store.dispatch(updateCustomerAction(res.data));
            })
            .catch(err => { notify.error('Oppsy : ' + err.message) });
    }

    return (
        <div className="flex-center-col">
            <h1>Edit Customer</h1>
            {/* Step 9 - handleSubmit your form  */}
            <form onSubmit={handleSubmit(yalla)} className="flex-center-col">
                <label htmlFor="email">Email</label>
                <input {...register("email")} type="text" placeholder="email" id="email" />
                <span>{errors.email?.message}</span>
                <label htmlFor="firstName">Name</label>
                <input  {...register("firstName")} type="text" placeholder="firstName" id="firstName" />
                <span>{errors.firstName?.message}</span>
                <label htmlFor="lastName">Name</label>
                <input  {...register("lastName")} type="text" placeholder="lastName" id="lastName" />
                <span>{errors.lastName?.message}</span>
                <label htmlFor="password">Password</label>
                <input  {...register("password")} type="password" placeholder="password" id="password" />
                <span>{errors.password?.message}</span>
                <button className="button-success" disabled={!isDirty}>Update</button>
            </form>
        </div>
    );
}

export default UpdateCustomer;
