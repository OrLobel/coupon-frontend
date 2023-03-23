import { CustomerModel } from "../Models/Customer";

// Step 1 - Create AppState and manage the collection once and in a centralize place
export class CustomerState {
    public customers: CustomerModel[] = [];
}

// Step 2 - Define all possible action for your application state
export enum CustomersActionType {
    UPDATE_ALL = "UPDATE_ALL",
    DELETE = "DELETE",
    UPDATE_ONE = "UPDATE_ONE",
    ADD = "ADD",
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface CustomerAction {
    type: CustomersActionType;
    payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function updateCustomersAction(customers: CustomerModel[]): CustomerAction {
    return { type: CustomersActionType.UPDATE_ALL, payload: customers };
}

export function deleteCustomerAction(id: number): CustomerAction {
    return { type: CustomersActionType.DELETE, payload: id };
}

export function updateCustomerAction(customer: CustomerModel): CustomerAction {
    return { type: CustomersActionType.UPDATE_ONE, payload: customer };
}
export function addCustomerAction(customer: CustomerModel): CustomerAction {
    return { type: CustomersActionType.ADD, payload: customer };
}

// Step 5 - Reducer function perform the required action
export function customersReducer(currentState: CustomerState = new CustomerState(), action: CustomerAction): CustomerState {
    const newState = { ...currentState } // Spread Operator

    switch (action.type) {
        case CustomersActionType.UPDATE_ALL:
            newState.customers = action.payload;
            break;
        case CustomersActionType.DELETE:
            newState.customers = newState.customers.filter(c => c.id !== action.payload);
            break;
        case CustomersActionType.UPDATE_ONE:
            const idx = newState.customers.findIndex(t => t.
                id === action.payload.id);
            newState.customers[idx] = action.payload;
            break;
        case CustomersActionType.ADD:
            newState.customers.push(action.payload);
            break;    
    }

    return newState;
}