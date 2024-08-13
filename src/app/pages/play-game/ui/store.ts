import { configureStore } from '@reduxjs/toolkit'

type State = {
    isReady: boolean,
}

const initialState: State = {
    isReady: false,
}

export type setReadinessAction = {
    type: 'setReadiness',
}


type Action = setReadinessAction;

const reducer = (state = initialState, action: Action): State => {
    switch (action.type) {
        case 'setReadiness':
            return {
                ...state,
                isReady: true,
            }
        
            default:
                return state
    }
}

export const store = configureStore({
    reducer: reducer,
})