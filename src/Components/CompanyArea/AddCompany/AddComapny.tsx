
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import notify, { SccMsg } from "../../../Services/Notification";
import { useNavigate } from "react-router-dom";
import web from "../../../Services/WebApi";
import store from "../../../Redux/Store";
import Button from 'react-bootstrap/Button';
import { CompanyModel, CompanyModelRequest } from "../../../Models/Company";
import { addCompanyAction } from "../../../Redux/CompanyState";
function AddComapny(): JSX.Element {


    const navigate = useNavigate();

    // Step 6 - Manage Your schema
    const schema = yup.object().shape({
        email:
            yup.string()
                .email()
                .required("Email is required"),
        name:
            yup.string()
                .required("Name is required"),
        password:
            yup.string()
                .min(4)
                .required("Password is required"),

    });

    // Step 7 - useHook for the rescue!!!!!!!!
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<CompanyModel>({ mode: "all", resolver: yupResolver(schema) });

    //  Step 8 - Send to Remote as post request
    const yalla = async (company: CompanyModel) => {

        console.log(company);
        console.log(JSON.stringify(company));

        web.addCompany(company)
            .then(res => {
                notify.success(SccMsg.ADD_COMPANY);
                navigate('/companies');
                // Update App State (Global State)
                store.dispatch(addCompanyAction(res.data));
            })
            .catch(err => {
                notify.error('Oppsy : ' + err.message);
                navigate('/companies');
            });
    }

    return (
        <div className="AddTodo flex-center-col">
            <h1>Add Company</h1>
            {/* Step 9 - handleSubmit your form  */}
            <form onSubmit={handleSubmit(yalla)} className="flex-center-col">
                <label htmlFor="email">Email</label>
                <input  {...register("email")} type="text" placeholder="email" id="email" />
                <span>{errors.email?.message}</span>
                <label htmlFor="name">Name</label>
                <input {...register("name")} type="text" placeholder="name" id="name" />
                <span>{errors.name?.message}</span>
                <label htmlFor="password">Password</label>
                <input  {...register("password")} type="password" placeholder="password" id="password" />
                <span>{errors.password?.message}</span>
                {/* <button className="button-success" disabled={!isValid}>Add</button> */}
                <Button disabled={!isValid} variant="success" type="submit">Add</Button>
            </form>
        </div>
    );
}

export default AddComapny;
