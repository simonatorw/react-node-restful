import { call, put, takeEvery } from 'redux-saga/effects';

import actionTypes from '../actions/actionTypes';
import { dataSucceeded, dataFailed } from '../actions/actionCreators';
import { fetchGet } from '../../api/async';

export function* fetchData(action) {
	try {
		const data = yield call(fetchGet, action.url);

		yield put(dataSucceeded(data));
	} catch (err) {
		console.log(err);
		yield put(dataFailed(err));
	}
}

export default function* watchFetchData() {
	yield takeEvery(actionTypes.data.GET_DATA, fetchData);
}
