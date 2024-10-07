import axios, { AxiosPromise } from "axios";

export const getTest = (): AxiosPromise<string> => {
	return axios.get('test/');
}