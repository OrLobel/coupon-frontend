import { createRef, useEffect, useState } from "react";
import notify, { SccMsg } from "../../../Services/Notification";
import { FaPlus } from "react-icons/fa";
import web from "../../../Services/WebApi";
import store from "../../../Redux/Store";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import CompanyCard from "../CompanyCard/CompanyCard";
import { CompanyModel } from "../../../Models/Company";
import { updateCompaniesAction, updateCompanyAction } from "../../../Redux/CompanyState";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import { Button, Form, InputGroup } from "react-bootstrap";

function CompanyList(): JSX.Element {
    const [companies, setCompanies] = useState<CompanyModel[]>(store.getState().companiesReducer.comapnies);

    useEffect(() => {
        web.getCompanies()
            .then((res) => {
                notify.success(SccMsg.ALL_COMPANIES);
                // Update Component State (Local state)
                setCompanies(res.data);
                // Update App State (Global State)
                store.dispatch(updateCompaniesAction(res.data));
            })
            .catch((err) => {
                notify.error(err.message);
            });
    }, []);

    const companyRef = createRef<HTMLInputElement>()

    const companyIdClick = () => {
        const companyId = +companyRef.current.value
        console.log(`category is ${companyId}`)
        web.getSingleCompany(companyId)
            .then((res) => {
                notify.success(SccMsg.ALL_COMPANIES);
                // Update Component State (Local state)
                setCompanies(res.data);
                // Update App State (Global State)
                store.dispatch(updateCompaniesAction(res.data));
            })
            .catch((err) => {
                notify.error(err.message);
            });
    }

    return (
        <div className="flex-center-col">
            <h2>Company List</h2>
            <CustomLink to="add"><FaPlus size={56} /></CustomLink>
            <InputGroup className="mb-3">
                <InputGroup.Text id="companyId">Company ID</InputGroup.Text>
                <Form.Control
                    placeholder="Company ID"
                    aria-label="CompanyId"
                    aria-describedby="company-id"
                    ref={companyRef}
                />
                <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={companyIdClick}>
                    Search
                </Button>
            </InputGroup>
            <div className="companies-container">
                {
                    (companies.length > 0)
                        ?
                        // tasks.map(t => <TodoItem key={t.id} task={t} />)
                        companies.map(t => <CompanyCard key={t.id} company={t} />)
                        :
                        <EmptyView msg='No Comany info For you' />
                }
            </div>
        </div>
    );
}

export default CompanyList;
