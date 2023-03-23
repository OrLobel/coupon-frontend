import { combineReducers, createStore } from "redux";
// import { tasksReducer } from "./TasksAppState";
import { authReducer } from "./UserAppState";
import { companiesReducer } from "./CompanyState";
import { customersReducer } from "./CustomerState";
import { couponsReducer } from "./CouponState";

const reducers = combineReducers({
    authReducer: authReducer,
    companiesReducer: companiesReducer,
    customersReducer: customersReducer,
    couponsReduer: couponsReducer,
});
const store = createStore(reducers)

export default store;