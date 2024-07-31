import { AxiosInstance } from "axios";
import {IFooterState, stateFooterReducerName} from "../../Entites/stateFooter/slice/stateFooter";


export interface StateSchema {
    [stateFooterReducerName]: IFooterState
}

export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema
}
