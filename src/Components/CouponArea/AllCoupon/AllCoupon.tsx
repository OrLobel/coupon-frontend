import { createRef, useEffect, useState } from "react";
import notify, { SccMsg } from "../../../Services/Notification";
import { FaPlus } from "react-icons/fa";
import web from "../../../Services/WebApi";
import store from "../../../Redux/Store";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import CouponCard from "../CouponCard/CouponCard";
import { CouponModel } from "../../../Models/Coupon";
import { updateCouponsAction } from "../../../Redux/CouponState";
import { Button, Form, InputGroup } from "react-bootstrap";
import CustomerCouponCard from "../CustomerCouponCard/CustomerCouponCard";

function CustomerList(): JSX.Element {
    const [coupons, SetCoupons] = useState<CouponModel[]>(store.getState().couponsReduer.coupons);

    useEffect(() => {
        web.getAllCoupons()
            .then((res) => {
                notify.success(SccMsg.ALL_COUPONS);
                // Update Component State (Local state)
                SetCoupons(res.data);
                // Update App State (Global State)
                store.dispatch(updateCouponsAction(res.data));
            })
            .catch((err) => {
                notify.error(err.message);
            });
    }, []);
    const maxPriceRef = createRef<HTMLInputElement>()

    const maxPriceClick = () => {
        const maxPrice = +maxPriceRef.current.value
        console.log(`max price is ${maxPrice}`)
        web.getCustomerCouponsWithMaxPrice(maxPrice)
            .then((res) => {
                notify.success(SccMsg.ALL_TASKS);
                // Update Component State (Local state)
                SetCoupons(res.data);
                // Update App State (Global State)
                store.dispatch(updateCouponsAction(res.data));
            })
            .catch((err) => {
                notify.error(err.message);
            });
    }

    const categoryRef = createRef<HTMLInputElement>()

    const catergoryClick = () => {
        const category = categoryRef.current.value
        console.log(`category is ${category}`)
        web.getCouponsWithCategory(category)
            .then((res) => {
                notify.success(SccMsg.ALL_COUPONS);
                // Update Component State (Local state)
                SetCoupons(res.data);
                // Update App State (Global State)
                store.dispatch(updateCouponsAction(res.data));
            })
            .catch((err) => {
                notify.error(err.message);
            });
    }
    return (
        <div className="flex-center-col">
            <h2>All Coupon List</h2>

            {/* <InputGroup className="mb-3">
                <InputGroup.Text id="max-price">Max Price</InputGroup.Text>
                <Form.Control
                    placeholder="Max Price"
                    aria-label="MaxPrice"
                    aria-describedby="max-price"
                    ref={maxPriceRef}
                />
                <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={maxPriceClick}>
                    Search
                </Button>
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="category">Category</InputGroup.Text>
                <Form.Control
                    placeholder="category"
                    aria-label="category"
                    aria-describedby="category"
                    ref={categoryRef}
                />
                <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={catergoryClick}>
                    Search
                </Button>
            </InputGroup> */}

            <div className="flex-row-none-wrap-list">
                {
                    (coupons.length > 0)
                        ?
                        // tasks.map(t => <TodoItem key={t.id} task={t} />)
                        coupons.map(t => <CustomerCouponCard key={t.id} coupon={t} />)
                        :
                        <EmptyView msg='No Coupons For you' />
                }
            </div>
        </div>
    );
}

export default CustomerList;
