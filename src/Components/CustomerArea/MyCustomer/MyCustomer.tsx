import { createRef, useEffect, useState } from "react";
import notify, { SccMsg } from "../../../Services/Notification";
import { FaPlus } from "react-icons/fa";
import web from "../../../Services/WebApi";
import store from "../../../Redux/Store";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import { CustomerModel } from "../../../Models/Customer";
import CustomerCard from "../CustomerCard/CustomerCard";
import { updateCustomerAction, updateCustomersAction } from "../../../Redux/CustomerState";
import { Button, Form, InputGroup } from "react-bootstrap";

function MyCustomer(): JSX.Element {
    const [customers, setCustomers] = useState<CustomerModel[]>(store.getState().customersReducer.customers);

    useEffect(() => {
        web.getMyCustomer()
            .then((res) => {
                notify.success(SccMsg.I_GOT_MY_INFO);
                console.log(res.data);
                // Update Component State (Local state)
                setCustomers(res.data);
                // Update App State (Global State)
                store.dispatch(updateCustomersAction(res.data));
            })
            .catch((err) => {
                notify.error(err.message);
            });
    }, []);


    console.log(customers.length)

    return (
        <div className="flex-center-col">
            <h2>Customer Details</h2>
            {/* console.log(customers.length) */}
            <div className="flex-row-none-wrap-list">
                {

                    (customers.length > 0)
                        ?
                        // tasks.map(t => <TodoItem key={t.id} task={t} />)
                        customers.map(t => <CustomerCard key={t.id} customer={t} />)
                        :
                        <EmptyView msg='No Info' />
                }
            </div>
        </div>
    );
}

export default MyCustomer;