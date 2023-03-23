import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCompanyAction } from "../../../Redux/CompanyState";
import store from "../../../Redux/Store";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";

function DeleteCompany(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const taskId = +(params.id || 0);

    const [id, setId] = useState<number>(taskId);


    const no = () => {
        navigate('/companies');
    }

    const yes = () => {
        web.deleteCompany(id)
            .then(res => {
                notify.success(SccMsg.DELETE_TASK);
                // Update App State (Global State)
                store.dispatch(deleteCompanyAction(id));
                navigate('/companies');
            })
            .catch(err => {
                notify.error(err.message);
                navigate('/companies');
            });
    }

    return (
        <div className="flex-center-col">
            <h1>Delete Company</h1>
            <h3>Are you sure you want to delete company #{id}?</h3>
            <div className="flex-row">
                <button className="button-danger" onClick={yes} >YES</button>
                <button className="button" onClick={no}>NO</button>
            </div>
        </div>
    );
}

export default DeleteCompany;
