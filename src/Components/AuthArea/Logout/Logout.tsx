import "./Logout.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import store from "../../../Redux/Store";
import { logoutAction } from "../../../Redux/UserAppState"

interface LogoutProps {
}

function Logout(props: LogoutProps): JSX.Element {
    // debugger;
    const navigate = useNavigate();

    useEffect(() => {
        const res = window.confirm('Are you sure you want to log out?');
        if (res) {
            store.dispatch(logoutAction());
            // store.dispatch(tasksClear());
            navigate("/login");
        }
    })

    return (
        <>
        </>
    );
}

export default Logout;
