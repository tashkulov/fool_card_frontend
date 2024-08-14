import { configureStore } from '@reduxjs/toolkit'
import { User } from '../../home-page/home-page'

type State = {
    isReady: boolean,
    playersNum: number,
    readyPlayers: number,
    user: User,
}

const initUser = {
    photo_url: '',
    first_name: '',
}

const initialState: State = {
    isReady: false,
    playersNum: 2,
    readyPlayers: 0,
    user: initUser,
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
                isReady: true,
                // readyPlayers: state.readyPlayers + 1
            }
            

            default:
                return state
    }
    
}

export const store = configureStore({
    reducer: reducer,
})