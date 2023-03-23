import MenuLink from "../../RoutingArea/MenuLink/MenuLink";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

import "./Menu.css";
import { useEffect, useState } from "react";
import store from "../../../Redux/Store";

function Menu(): JSX.Element {
    const location = useLocation();
    const isRoot = location.pathname === '/'

    const [clientType, setClientType] = useState<string>(store.getState().authReducer.user?.clientType);

    useEffect(() => {
        return store.subscribe(() => {
            setClientType(store.getState().authReducer.user?.clientType)
        });
    }, [])

    return (
        <div className="Menu flex-col-top-center">
            <MenuLink to="home"><div className={(isRoot) ? 'active' : ''}>Home</div></MenuLink>
            <MenuLink to="about">About</MenuLink>
            { clientType === 'ADMINISTRATOR' &&
                <MenuLink to="companies">Companies</MenuLink> 
            }
            { clientType === 'ADMINISTRATOR' &&
                <MenuLink to="customers">Customers</MenuLink>
            }
            { clientType === 'COMPANY' &&
                <MenuLink to="coupons">Coupons</MenuLink>
            }
            { clientType === 'COMPANY' &&
                <MenuLink to="companyinfo">Company Info</MenuLink>
            }
            { clientType === 'CUSTOMER' &&
                <MenuLink to="all/coupons">All Coupons</MenuLink>
            }
            { clientType === 'CUSTOMER' &&
                <MenuLink to="customer/mycoupons">My Coupons</MenuLink>
            }
            { clientType === 'CUSTOMER' &&
                <MenuLink to="customer/myinfo">My info</MenuLink>
            }
        </div>
    );
}

export default Menu;
