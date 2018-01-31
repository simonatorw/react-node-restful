import actionTypes from '../actions/actionTypes';
import stateTree from '../stateTree';

export default function dataReducer(state = stateTree, action) {

    switch(action.type) {
	    case actionTypes.data.GET_DATA_SUCCEEDED:
			return { ...state, configurations: action.data.configurations };
			
        default:
            return state;
    }
}