import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCouponsAction } from "../../../Redux/CouponState";
import store from "../../../Redux/Store";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";

function DeleteCoupon(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const couponId = +(params.id || 0);

    const [id, setId] = useState<number>(couponId);


    const no = () => {
        navigate('/coupons');
    }

    const yes = () => {
        web.deleteCoupon(id)
            .then(res => {
                notify.success(SccMsg.DELETE_COUPON);
                // Update App State (Global State)
                store.dispatch(deleteCouponsAction(id));
                navigate('/coupons');
            })
            .catch(err => {
                notify.error(err.message);
                navigate('/coupons');
            });
    }

    return (
        <div className="flex-center-col">
            <h1>Delete Coupon</h1>
            <h3>Are you sure you want to delete coupon #{id}?</h3>
            <div className="flex-row">
                <button className="button-danger" onClick={yes} >YES</button>
                <button className="button" onClick={no}>NO</button>
            </div>
        </div>
    );
}

export default DeleteCoupon;
