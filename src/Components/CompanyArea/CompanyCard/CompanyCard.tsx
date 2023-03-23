import "./CompanyCard.css";
import Card from 'react-bootstrap/Card';
import moment from "moment";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { CompanyModel } from "../../../Models/Company";

interface CompanyCardProps {
    company: CompanyModel;
}
function CompanyCard(props: CompanyCardProps): JSX.Element {
    return (
        <Card border="secondary" style={{ width: '18rem' }} className="text-dark text-lowercase">
            <Card.Header><span>{props.company.name}</span></Card.Header>
            <Card.Body>
                {/* <Card.Title><span className="text-dark text-lowercase">{props.company.classification}</span></Card.Title> */}
                <Card.Text>
                    {props.company.name}
                </Card.Text>
                <Card.Text>
                    {props.company.email}
                </Card.Text>
                <Card.Img src="https://cataas.com/cat/gif" />

            </Card.Body>
            <Card.Footer className="flex-around">
                <CustomLink to={`delete/${props.company.id}`}><MdDelete size={42} /></CustomLink>
                <CustomLink to={`update/${props.company.id}`}><MdModeEdit size={42} /></CustomLink>
            </Card.Footer>
        </Card>
    );
}

export default CompanyCard;
