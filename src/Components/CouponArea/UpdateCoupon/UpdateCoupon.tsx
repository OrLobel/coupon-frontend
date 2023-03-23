import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import axios from "axios";
import notify, { SccMsg } from "../../../Services/Notification";
import { useNavigate, useParams } from "react-router-dom";
import web from "../../../Services/WebApi";
import store from "../../../Redux/Store";

import { CouponModel } from "../../../Models/Coupon";
import { updateCouponAction } from "../../../Redux/CouponState";

interface EditCouponProps { }
function UpdateCoupon(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const taskId = +(params.id || 0);

    const [id, setId] = useState<number>(taskId);
    // Read from App State (Global State)
    const [coupon, SetCoupons] = useState<CouponModel>(store.getState().couponsReduer.coupons.filter(t => t.id === id)[0]);
    // const [origin, setOrigin] = useState<TodoPayloadModel>({ 'caption': '', 'info': '', 'classification': '', 'dueDate': new Date() })
    const [origin, setOrigin] = useState<CouponModel>({ 'category': coupon.category, 'description': coupon.description, 'price': coupon.price,
     'amount': coupon.amount,'image': coupon.image, 'startDate': coupon.startDate,'endDate':coupon.endDate,'title':coupon.title })

    // Step 6 - Manage Your schema
    const schema = yup.object().shape({
        category:
            yup.string()
                .required("category is required"),
        title:
            yup.string()
                .required("title is required"),
        description:
            yup.string()
                .required("description is required"),
        startDate:
            yup.date()
                // .min(new Date(), 'Umm... past due date? come on!')
                .default(new Date())
                .typeError("You must specify a due date")
                .required("due date is required")
                .nullable().default(() => new Date()),
        endDate:
            yup.date()
                // .min(new Date(), 'Umm... past due date? come on!')
                .default(new Date())
                .typeError("You must specify a due date")
                .required("due date is required")
                .nullable().default(() => new Date()),    

        amount:
            yup.number()
                    .min(0)
                    .required("amount is required"),
        price:
                yup.number()
                    .min(0)
                    .required("price link is required"),
        image:
            yup.string()
                .required("image is required"),
    });
    

    // Step 7 - Prepare the Hook
    let defaultValuesObj = { ...origin };

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
        = useForm<CouponModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const { dirtyFields } = useFormState({ control });

    //  Step 8 - Send to Remote as put request
    const yalla = async (coupon: CouponModel) => {
        web.updateCoupon(id, coupon)
            .then(res => {
                notify.success(SccMsg.UPDATE_TASK);
                navigate('/coupons');
                // Update App State (Global State)
                store.dispatch(updateCouponAction(res.data));
            })
            .catch(err => { notify.error('Oppsy : ' + err.message) });
    }

    return (
        <div className="flex-center-col">
            <h1>Edit Coupon</h1>
            {/* Step 9 - handleSubmit your form  */}
            <form onSubmit={handleSubmit(yalla)} className="flex-center-col">
            <label htmlFor="category">Category</label>  
                <select    
                {...register("category")}
                 id="category" 
                 name="category" >
                    <option value="" disabled={true} selected style={{ color: 'red' }}>Choose Category</option>
                    <option value="Food">Food</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Vacation">Vacation</option>   
                </select>
                <span>{errors.category?.message}</span>
                <label htmlFor="title">title</label>
                <input  {...register("title")} type="text" placeholder="title" id="title" />
                <span>{errors.title?.message}</span>
                <label htmlFor="description">price</label>
                <input  {...register("description")} type="text" placeholder="description" id="description" />
                <span>{errors.description?.message}</span>
                <label htmlFor="startDate">startDate</label>
                <input  {...register("startDate")} type="datetime-local" placeholder="startDate" id="startDate" />
                <span>{errors.startDate?.message}</span>
                <label htmlFor="endDate">endDate</label>
                <input  {...register("endDate")} type="datetime-local" placeholder="endDate" id="endDate" />
                <span>{errors.endDate?.message}</span>
                <label htmlFor="amount">amount</label>
                <input  {...register("amount")} type="text" placeholder="amount" id="amount" />
                <span>{errors.amount?.message}</span>
                <label htmlFor="price">price</label>
                <input  {...register("price")} type="text" placeholder="price" id="price" />
                <span>{errors.title?.message}</span>
                <label htmlFor="price">image</label>
                <input  {...register("image")} type="text" placeholder="image" id="image" />
                <span>{errors.image?.message}</span>
                <button className="button-success" disabled={!isDirty}>Update</button>
            </form>
        </div>
    );
}

export default UpdateCoupon;
