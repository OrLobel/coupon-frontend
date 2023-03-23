import Page404 from "../../RoutingArea/Page404/Page404";
import { Outlet } from "react-router-dom";
import Routing from "../../RoutingArea/Routing/Routing";


import "./main.css";

function Main(): JSX.Element {
    return (
        <div className="main">
	       <Routing/>
            <Outlet/>
        </div>
    );
}

export default Main;
