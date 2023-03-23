import { CompanyModel } from "../Models/Company";

// Step 1 - Create AppState and manage the collection once and in a centralize place
export class CompanyState {
    public comapnies: CompanyModel[] = [];
}

// Step 2 - Define all possible action for your application state
export enum CompaniesActionType {
    UPDATE_ALL = "UPDATE_ALL",
    DELETE = "DELETE",
    UPDATE_ONE = "UPDATE_ONE",
    ADD = "ADD",
}

// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface CompanyAction {
    type: CompaniesActionType;
    payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function updateCompaniesAction(companies: CompanyModel[]): CompanyAction {
    return { type: CompaniesActionType.UPDATE_ALL, payload: companies };
}

export function deleteCompanyAction(id: number): CompanyAction {
    return { type: CompaniesActionType.DELETE, payload: id };
}

export function updateCompanyAction(company: CompanyModel): CompanyAction {
    return { type: CompaniesActionType.UPDATE_ONE, payload: company };
}
export function addCompanyAction(company: CompanyModel): CompanyAction {
    return { type: CompaniesActionType.ADD, payload: company };
}

// Step 5 - Reducer function perform the required action
export function companiesReducer(currentState: CompanyState = new CompanyState(), action: CompanyAction): CompanyState {
    const newState = { ...currentState } // Spread Operator

    switch (action.type) {
        case CompaniesActionType.UPDATE_ALL:
            newState.comapnies = action.payload;
            break;
        case CompaniesActionType.DELETE:
            newState.comapnies = newState.comapnies.filter(c => c.id !== action.payload);
            break;
        case CompaniesActionType.UPDATE_ONE:
            const idx = newState.comapnies.findIndex(t => t.id === action.payload.id);
            newState.comapnies[idx] = action.payload;
            break;
        case CompaniesActionType.ADD:
            newState.comapnies.push(action.payload);
            break;    
    }

    return newState;
}