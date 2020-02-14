import axios from "../utils/axios";

import { GET_ERRORS, SET_TASKS, CLEAR_ERRORS } from "./types";

export const getTasks = taskParams => dispatch => {
	console.log(taskParams);
	return axios
		.get(
			`/tasks/assigned?page=${taskParams.page}&limit=${taskParams.limit}&order=${taskParams.order}&orderMethod=${taskParams.orderMethod}`,
			{ headers: { accessToken: `${localStorage.getItem("jwtToken")}` } }
		)
		.then(res => {
			dispatch({
				type: SET_TASKS,
				payload: res.data
			});

			return res.data;
		})
		.catch(error => {
			console.log(error);
		});
};
