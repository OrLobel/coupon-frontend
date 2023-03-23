import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import axios from "axios";
import notify, { SccMsg } from "../../../Services/Notification";
import { useNavigate, useParams } from "react-router-dom";
import web from "../../../Services/WebApi";
import store from "../../../Redux/Store";
import { CompanyModel } from "../../../Models/Company";
import { updateCompanyAction } from "../../../Redux/CompanyState";

interface EditTodoProps { }
function UpdateCompany(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const taskId = +(params.id || 0);
    console.log(`taskId: ${taskId}`)

    const [id, setId] = useState<number>(taskId);
    // Read from App State (Global State)
    console.log(`companies: ${store.getState().companiesReducer.comapnies}`)
    const [company, setCompany] = useState<CompanyModel>(store.getState().companiesReducer.comapnies.filter(t => t.id === id)[0]);
    console.log(`company: ${company}`)
    // const [origin, setOrigin] = useState<TodoPayloadModel>({ 'caption': '', 'info': '', 'classification': '', 'dueDate': new Date() })
    const [origin, setOrigin] = useState<CompanyModel>({ 'email': company.email, 'name': company.name, 'password': company.password })

    // Step 6 - Manage Your schema
    const schema = yup.object().shape({
        email:
            yup.string()
                .required("Email is required"),
        name:
            yup.string()
                .required("Name is required"),
        password:
            yup.string()
                .required("Password is required"),
    });

    // Step 7 - Prepare the Hook
    let defaultValuesObj = { ...origin };

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
        = useForm<CompanyModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const { dirtyFields } = useFormState({ control });

    //  Step 8 - Send to Remote as put request
    const yalla = async (company: CompanyModel) => {
        web.updateCompany(id, company)
            .then(res => {
                notify.success(SccMsg.UPDATE_TASK);
                navigate('/companies');
                // Update App State (Global State)
                store.dispatch(updateCompanyAction(res.data));
            })
            .catch(err => { notify.error('Oppsy : ' + err.message) });
    }

    return (
        <div className="flex-center-col">
            <h1>Edit Company</h1>
            {/* Step 9 - handleSubmit your form  */}
            <form onSubmit={handleSubmit(yalla)} className="flex-center-col">
                <label htmlFor="email">Email</label>
                <input {...register("email")} type="text" placeholder="email" id="email" />
                <span>{errors.email?.message}</span>
                <label htmlFor="name">Name</label>
                <input  {...register("name")} type="text" placeholder="name" id="name" />
                <span>{errors.name?.message}</span>
                <label htmlFor="password">Password</label>
                <input  {...register("password")} type="password" placeholder="password" id="password" />
                <span>{errors.password?.message}</span>
                <button className="button-success" disabled={!isDirty}>Update</button>
            </form>
        </div>
    );
}

export default UpdateCompany;
