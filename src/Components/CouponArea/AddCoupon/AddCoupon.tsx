
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import notify, { SccMsg } from "../../../Services/Notification";
import { useNavigate } from "react-router-dom";
import web from "../../../Services/WebApi";
import store from "../../../Redux/Store";
import Button from 'react-bootstrap/Button';
import { CustomerModel } from "../../../Models/Customer";
import { addCustomerAction } from "../../../Redux/CustomerState";
import { CouponModel } from "../../../Models/Coupon";
function AddCoupon(): JSX.Element {


    const navigate = useNavigate();

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
            .min(new Date(), 'Umm... past due date? come on!')
            .default(new Date())
            .typeError("You must specify a due date")
            .required("due date is required")
            .nullable().default(() => new Date()),
    endDate:
        yup.date()
            .min(new Date(), 'Umm... past due date? come on!')
            .default(new Date())
            .typeError("You must specify a due date")
            .required("due date is required")
            .nullable().default(() => new Date()),    
            //validate end date cant be before startdate

    amount:
        yup.number()
            .min(0)
            .required("amount is required"),
    price:
        yup.number()
            .min(0)
            .required("price is required"),
    image:
        yup.string()
            .required("image is required"),

    });

    // Step 7 - useHook for the rescue!!!!!!!!
    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<CouponModel>({ mode: "all", resolver: yupResolver(schema) });

    //  Step 8 - Send to Remote as post request
    const yalla = async (coupon: CouponModel) => {

        console.log(coupon);
        console.log(JSON.stringify(coupon));

        web.addCoupon(coupon)
            .then(res => {
                notify.success(SccMsg.ADD_Coupon);
                navigate('/coupons');
                // Update App State (Global State)
                store.dispatch(addCustomerAction(res.data));
            })
            .catch(err => {
                notify.error('Oppsy : ' + err.message);
                navigate('/coupons');
            });
    }

    return (
        <div className="AddTodo flex-center-col">
            <h1>Add Coupon</h1>
                {/* Step 9 - handleSubmit your form  */}
                <form onSubmit={handleSubmit(yalla)} className="flex-center-col">
                
                <label htmlFor="category">category</label>  
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
                <label htmlFor="description">description</label>
                <input  {...register("description")} type="text" placeholder="description" id="description" />
                <span>{errors.description?.message}</span>
                <label htmlFor="startDate">startDate</label>
                <input  {...register("startDate")} type="datetime-local" placeholder="startDate" id="startDate" />
                <span>{errors.startDate?.message}</span>
                <label htmlFor="endDate">endDate</label>
                <input  {...register("endDate")} type="datetime-local" placeholder="endDate" id="endDate" />
                <span>{errors.endDate?.message}</span>
                <label htmlFor="amount">amount</label>
                <input  {...register("amount")} type="number" placeholder="amount" id="amount" />
                <span>{errors.amount?.message}</span>
                <label htmlFor="price">price</label>
                <input  {...register("price")} type="number" placeholder="price" id="price" />
                <span>{errors.price?.message}</span>
                <label htmlFor="image">image</label>
                <input  {...register("image")} type="text" placeholder="image" id="image" />
                <span>{errors.image?.message}</span>
                <button className="button-success" disabled={!isDirty}>Add</button>
            </form>
        </div>
    );
}

export default AddCoupon;
