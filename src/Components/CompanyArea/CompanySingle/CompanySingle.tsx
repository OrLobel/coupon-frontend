import { useEffect, useState } from "react";
import notify, { SccMsg } from "../../../Services/Notification";
import { FaPlus } from "react-icons/fa";
import web from "../../../Services/WebApi";
import store from "../../../Redux/Store";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import CompanyCard from "../CompanyCard/CompanyCard";
import { CompanyModel } from "../../../Models/Company";
import { updateCompaniesAction } from "../../../Redux/CompanyState";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import { Form, InputGroup } from "react-bootstrap";
import MyCompanyCard from "../MyCompanyCard/MyCompanyCard";

function CompanySingle(): JSX.Element {
    const [companies, setCompanies] = useState<CompanyModel[]>(store.getState().companiesReducer.comapnies);

    useEffect(() => {
        web.getMyCompany()
            .then((res) => {
                notify.success(SccMsg.ALL_TASKS);
                // Update Component State (Local state)
                setCompanies(res.data);
                // Update App State (Global State)
                store.dispatch(updateCompaniesAction(res.data));
            })
            .catch((err) => {
                notify.error(err.message);
            });
    }, []);

    return (
        <div className="flex-center-col">
            <h2>My Company Info</h2>
            <div className="flex-row-none-wrap-list">
                {
                    (companies.length > 0)
                        ?
                        // tasks.map(t => <TodoItem key={t.id} task={t} />)
                        companies.map(t => <MyCompanyCard key={t.id} company={t} />)
                        :
                        <EmptyView msg='No Company info For you' />
                }
            </div>
        </div>
    );
}

export default CompanySingle;
