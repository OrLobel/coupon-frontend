import { CouponModel } from "../Models/Coupon";

// Step 1 - Create AppState and manage the collection once and in a centralize place
export class CouponState {
    public coupons: CouponModel[] = [];
}

// Step 2 - Define all possible action for your application state
export enum CouponsActionType {
    UPDATE_ALL = "UPDATE_ALL",
    DELETE = "DELETE",
    UPDATE_ONE = "UPDATE_ONE",
    ADD = "ADD",
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface CouponAction {
    type: CouponsActionType;
    payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function updateCouponsAction(coupons: CouponModel[]): CouponAction {
    return { type: CouponsActionType.UPDATE_ALL, payload: coupons };
}

export function deleteCouponsAction(id: number): CouponAction {
    return { type: CouponsActionType.DELETE, payload: id };
}

export function updateCouponAction(coupon: CouponModel): CouponAction {
    return { type: CouponsActionType.UPDATE_ONE, payload: coupon };
}
export function addCouponAction(coupon: CouponModel): CouponAction {
    return { type: CouponsActionType.ADD, payload: coupon };
}

// Step 5 - Reducer function perform the required action
export function couponsReducer(currentState: CouponState = new CouponState(), action: CouponAction): CouponState {
    const newState = { ...currentState } // Spread Operator

    switch (action.type) {
        case CouponsActionType.UPDATE_ALL:
            newState.coupons = action.payload;
            break;
        case CouponsActionType.DELETE:
            newState.coupons = newState.coupons.filter(c => c.id !== action.payload);
            break;
        case CouponsActionType.UPDATE_ONE:
            const idx = newState.coupons.findIndex(t => t.id === action.payload.id);
            newState.coupons[idx] = action.payload;
            break;
        case CouponsActionType.ADD:
            newState.coupons.push(action.payload);
            break;    
    }

    return newState;
}