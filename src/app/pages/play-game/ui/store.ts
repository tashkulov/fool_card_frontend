import { configureStore } from '@reduxjs/toolkit'

type State = {
    isReady: boolean,
    playersNum: number,
    readyPlayers: number,
}

const initialState: State = {
    isReady: false,
    playersNum: 2,
    readyPlayers: 0,
}

export type setReadinessAction = {
    type: 'setReadiness',
}


type Action = setReadinessAction;

const reducer = (state = initialState, action: Action): State => {
    switch (action.type) {
        case 'setReadiness':
            console.log(state.readyPlayers)
            return {
                ...state,
                readyPlayers: state.readyPlayers + 1
            }
            

            default:
                return state
    }
    
}

export const store = configureStore({
    reducer: reducer,
})