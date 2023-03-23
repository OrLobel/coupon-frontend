// import "./CustomerCard.css";
import Card from 'react-bootstrap/Card';
import moment from "moment";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import { MdCreditCard, MdDelete, MdModeEdit } from "react-icons/md";
import { CouponModel } from "../../../Models/Coupon";

interface CouponCardProps {
    coupon: CouponModel;
}
function CustomerCard(props: CouponCardProps): JSX.Element {
    return (
        <Card border="secondary" style={{ width: '18rem' }} className="text-dark text-lowercase">
            <Card.Header><span>{props.coupon.title}</span></Card.Header>
            <Card.Body>
                {/* <Card.Title><span className="text-dark text-lowercase">{props.company.classification}</span></Card.Title> */}
                <Card.Text>
                    {props.coupon.category}
                </Card.Text>
                <Card.Text>
                    {props.coupon.description}
                </Card.Text>
                {/* if({props.coupon.category}==="ELECTRICITY") */}
                <Card.Img src="https://media.giphy.com/media/BKLKoUfdBeRG0/giphy.gif" />

            </Card.Body>
            <Card.Footer className="flex-around">      
                <CustomLink to={`delete/${props.coupon.id}`}><MdDelete size={42} /></CustomLink>
                <CustomLink to={`update/${props.coupon.id}`}><MdModeEdit size={42} /></CustomLink>
                {/* <CustomLink to={`update/${props.coupon.id}`}><MdCreditCard size={42} /></CustomLink> */}
            </Card.Footer>
        </Card>
    );
}

export default CustomerCard;
