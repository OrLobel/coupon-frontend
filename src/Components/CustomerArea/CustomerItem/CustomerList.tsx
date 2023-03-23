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

function CustomerList(): JSX.Element {
    const [customers, setCustomers] = useState<CustomerModel[]>(store.getState().customersReducer.customers);

    useEffect(() => {
        web.getCustomers()
            .then((res) => {
                notify.success(SccMsg.ALL_CUSTOMERS);
                // Update Component State (Local state)
                setCustomers(res.data);
                // Update App State (Global State)
                store.dispatch(updateCustomersAction(res.data));
            })
            .catch((err) => {
                notify.error(err.message);
            });
    }, []);

    const customerRef = createRef<HTMLInputElement>()

    const customerIdClick = () => {
        const customerId = +customerRef.current.value
        console.log(`category is ${customerId}`)
        web.getSingleCustomer(customerId)
            .then((res) => {
                notify.success(SccMsg.ALL_TASKS);
                // Update Component State (Local state)
                setCustomers(res.data);
                // Update App State (Global State)
                store.dispatch(updateCustomersAction(res.data));
            })
            .catch((err) => {
                notify.error(err.message);
            });
    }



    return (
        <div className="flex-center-col">
            <h2>Customer List</h2>
            <CustomLink to="add"><FaPlus size={56} /></CustomLink>
            <InputGroup className="mb-3">
                <InputGroup.Text id="customerId">Customer ID</InputGroup.Text>
                <Form.Control
                    placeholder="Customer ID"
                    aria-label="CustomerId"
                    aria-describedby="customer-id"
                    ref={customerRef}
                />
                <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={customerIdClick}>
                    Search
                </Button>
            </InputGroup>
            <div className="flex-row-none-wrap-list">
                {
                    (customers.length > 0)
                        ?
                        // tasks.map(t => <TodoItem key={t.id} task={t} />)
                        customers.map(t => <CustomerCard key={t.id} customer={t} />)
                        :
                        <EmptyView msg='No Tasks For you' />
                }
            </div>
        </div>
    );
}

export default CustomerList;