import "./CustomerCard.css";
import Card from 'react-bootstrap/Card';
import moment from "moment";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { CustomerModel } from "../../../Models/Customer";

interface CustomerCardProps {
    customer: CustomerModel;
}
function CustomerCard(props: CustomerCardProps): JSX.Element {
    return (
        <Card border="secondary" style={{ width: '18rem' }} className="text-dark text-lowercase">
            <Card.Header><span>{props.customer.firstName +" "+ props.customer.lastName}</span></Card.Header>
            <Card.Body>
                {/* <Card.Title><span className="text-dark text-lowercase">{props.company.classification}</span></Card.Title> */}
                <Card.Text>
                    {props.customer.email}
                </Card.Text>
                {/* <Card.Text>
                    {props.company.email}
                </Card.Text> */}
                <Card.Img src="https://media.giphy.com/media/TAuI4vAYY3DMs/giphy.gif" />

            </Card.Body>
            <Card.Footer className="flex-around">      
                <CustomLink to={`delete/${props.customer.id}`}><MdDelete size={42} /></CustomLink>
                <CustomLink to={`update/${props.customer.id}`}><MdModeEdit size={42} /></CustomLink>
            </Card.Footer>
        </Card>
    );
}

export default CustomerCard;
