import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCouponsAction } from "../../../Redux/CouponState";
import store from "../../../Redux/Store";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";

function BuyCoupon(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const couponId = +(params.id || 0);

    const [id, setId] = useState<number>(couponId);


    const no = () => {
        navigate('/all/coupons');
    }

    const yes = () => {
        web.buyCoupon(id)
            .then(res => {
                notify.success(SccMsg.BOUGHT_COUPON);
                // Update App State (Global State)
                // web.deleteCoupon(id);
                store.dispatch(deleteCouponsAction(id));
                navigate('/all/coupons');
            })
            .catch(err => {
                notify.error(err.message);
                navigate('/all/coupons');
            });
    }

    return (
        <div className="flex-center-col">
            <h1>Buy Coupon</h1>
            <h3>Are you sure you want to Buy coupon number #{id}?</h3>
            <div className="flex-row">
                <button className="button-danger" onClick={yes} >YES</button>
                <button className="button" onClick={no}>NO</button>
            </div>
        </div>
    );
}

export default BuyCoupon;
