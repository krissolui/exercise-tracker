import axios, { AxiosError } from 'axios';
import { Exercise, User } from '../types/types';

const API_ENDPOINT = 'http://localhost:3000';

export const listUsers = async (): Promise<User[]> => {
	return axios
		.get<User[]>(`${API_ENDPOINT}/users`)
		.then((res) => {
			const data = res.data;
			return data;
		})
		.catch((ex: AxiosError) => {
			throw { error: ex.response?.data };
		});
};

export const createUser = async (username: string): Promise<string> => {
	return axios
		.post<string>(`${API_ENDPOINT}/users/add`, {
			username,
		})
		.then((res) => {
			const data = res.data;
			return data;
		})
		.catch((ex: AxiosError) => {
			throw { error: ex.response?.data };
		});
};

export const listExercises = async (): Promise<Exercise[]> => {
	return axios
		.get<Exercise[]>(`${API_ENDPOINT}/exercises`)
		.then((res) => {
			const data = res.data;
			return data;
		})
		.catch((ex: AxiosError) => {
			throw { error: ex.response?.data };
		});
};

export const createExercise = async (exercise: Exercise): Promise<Exercise> => {
	return axios
		.post<Exercise>(`${API_ENDPOINT}/exercises/add`, exercise)
		.then((res) => {
			const data = res.data;
			return data;
		})
		.catch((ex: AxiosError) => {
			throw { error: ex.response?.data };
		});
};

export const editExercise = async (exercise: Exercise): Promise<Exercise> => {
	return axios
		.put<Exercise>(`${API_ENDPOINT}/exercise/${exercise._id}`, exercise)
		.then((res) => {
			const data = res.data;
			return data;
		})
		.catch((ex: AxiosError) => {
			throw { error: ex.response?.data };
		});
};

export const removeExercises = async (id: string): Promise<string> => {
	return axios
		.delete<string>(`${API_ENDPOINT}/exercises/${id}`)
		.then((res) => {
			const data = res.data;
			return data;
		})
		.catch((ex: AxiosError) => {
			throw { error: ex.response?.data };
		});
};
