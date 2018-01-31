import actionTypes from '../actions/actionTypes';
import stateTree from '../stateTree';

export default function appReducer(state = stateTree, action) {
    switch(action.type) {

        default:
            return state;
    }
}