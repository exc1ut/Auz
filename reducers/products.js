import {FETCH_PRODUCT,LOADING_PRODUCT} from '../types'

const INITIAL_STATE = {
    data:[],
    loading:false,
}

export default (state=INITIAL_STATE , action) => {
    
    switch(action.type){
        case FETCH_PRODUCT: return {...state,data:action.payload};
        case LOADING_PRODUCT: console.log("test",action.payload);return {...state,loading:action.payload};
        default: return state;
    }
}
