export type User = {
	_id?: string;
	username: string;
	createAt?: string;
	updatedAt?: string;
};

export type Exercise = {
	_id?: string;
	username: string;
	description: string;
	duration: number;
	date: string;
	createAt?: string;
	updatedAt?: string;
};

export type ErrorResponse = {
	error: string;
};
