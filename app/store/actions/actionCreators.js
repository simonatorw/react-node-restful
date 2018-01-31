import actionTypes from './actionTypes';

export const dataGet = (url) => ({
	type: actionTypes.data.GET_DATA,
	url
});

export const dataSucceeded = (data) => ({
	type: actionTypes.data.GET_DATA_SUCCEEDED,
	data
});

export const dataFailed = (err) => ({
	type: actionTypes.data.GET_DATA_FAILED,
	err
});