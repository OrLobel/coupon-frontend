import "./Login.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CredentialsModel, LoginModel } from "../../../Models/Welcome";
import web from "../../../Services/WebApi";
import notify, { SccMsg } from "../../../Services/Notification";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import { loginAction } from "../../../Redux/UserAppState";
function Login(): JSX.Element {

    const navigate = useNavigate();

    const schema = yup.object().shape({
        email:
            yup.string()
                .email("Invalid Email Pattern")
                .required("Email is required"),
        password:
            yup.string()
                .required("Password is required")
                .min(3, "at least 3 characters required")
                .max(8, "at most 8 characters required")
    });

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<LoginModel>({ mode: "all", resolver: yupResolver(schema) });



    const loginUser = async (model: LoginModel) => {
        const credentials = new CredentialsModel();
        credentials.email = model.email;
        credentials.password = model.password;

        console.log('going to send to remote server...' + credentials + JSON.stringify(credentials));

        web.login(credentials)
            .then((res) => {
                console.log(res);
                notify.success(SccMsg.LOGIN);
                store.dispatch(loginAction(res.data));
                navigate('/home');//change afterwards to different page

            })
            .catch(err => {
                notify.error(err.message);
            });
    }

    return (
        <div className="Login flex-center-col">
            <h1>Login</h1>
            {/* Step 9 - handleSubmit your form  */}
            <form onSubmit={handleSubmit(loginUser)} className="flex-center-col">
                <label htmlFor="email">Email</label>
                <input {...register("email")} type="email" placeholder="email" id="email" />
                <span>{errors.email?.message}</span>
                <label htmlFor="password">Password</label>
                <input  {...register("password")} type="password" placeholder="password" id="password" />
                <span>{errors.password?.message}</span>

                <button className="button-success" disabled={!isValid}>Login</button>
            </form>
        </div>
    );
}

export default Login;
