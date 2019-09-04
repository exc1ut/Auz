import {SEARCH_PRODUCT} from '../types'

const INITIAL_STATE = {
    text:'123',
}

export default (state=INITIAL_STATE , action) => {
    
    switch(action.type){
        case SEARCH_PRODUCT: return {...state,text:action.payload};
        default: return state;
    }
}
