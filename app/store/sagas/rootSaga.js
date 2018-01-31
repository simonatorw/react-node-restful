import { all } from 'redux-saga/effects';

import watchFetchData from './fetchData';

export default function* rootSaga() {
	yield all([
		watchFetchData()
	]);
}