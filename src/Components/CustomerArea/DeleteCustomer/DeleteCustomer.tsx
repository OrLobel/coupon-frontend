import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCompanyAction } from "../../../Redux/CompanyState";
import { deleteCustomerAction } from "../../../Redux/CustomerState";
import store from "../../../Redux/Store";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";

function DeleteCustomer(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const taskId = +(params.id || 0);

    const [id, setId] = useState<number>(taskId);


    const no = () => {
        navigate('/customers');
    }

    const yes = () => {
        web.deleteCustomer(id)
            .then(res => {
                notify.success(SccMsg.DELETE_TASK);
                // Update App State (Global State)
                store.dispatch(deleteCustomerAction(id));
                navigate('/customers');
            })
            .catch(err => {
                notify.error(err.message);
                navigate('/customers');
            });
    }

    return (
        <div className="flex-center-col">
            <h1>Delete Customer</h1>
            <h3>Are you sure you want to delete customer #{id}?</h3>
            <div className="flex-row">
                <button className="button-danger" onClick={yes} >YES</button>
                <button className="button" onClick={no}>NO</button>
            </div>
        </div>
    );
}

export default DeleteCustomer;
