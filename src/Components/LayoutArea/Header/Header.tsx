import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Login from "../../AuthArea/Login/Login";
import "./Header.css";

interface HeaderProps {
	
}

function Header(props: HeaderProps): JSX.Element {
    return (
        <div className="Header flex-around">

			<div>Hello coupon main header</div>
            <AuthMenu/>

            {/* <Login/> */}
        </div>
    );
}

export default Header;
