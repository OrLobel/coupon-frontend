import Card from 'react-bootstrap/Card';
import moment from "moment";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { CompanyModel } from "../../../Models/Company";

interface CompanyCardProps {
    company: CompanyModel;
}
function MyCompanyCard(props: CompanyCardProps): JSX.Element {
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

            </Card.Footer>
        </Card>
    );
}

export default MyCompanyCard;
