import { useEffect, useState } from 'react';
import { createExercise, listUsers } from '../api/exerciseTracker';

type Form = {
	username: string;
	description: string;
	duration: number;
	date: Date;
};

const CreateExercise = () => {
	const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
	const [form, setForm] = useState<Form>({
		username: '',
		description: '',
		duration: 0,
		date: new Date(Date.now() - timezoneOffset),
	});
	const [usernames, setUsernames] = useState<string[]>([]);
	const [errorMsg, setErrorMsg] = useState<string>('');

	const { username, description, duration, date } = form;

	useEffect(() => {
		const getUsers = async () => {
			try {
				const users = await listUsers();
				setUsernames(users.map((user) => user.username));
				if (users.length > 0)
					setForm({ ...form, username: users[0].username });
			} catch (ex) {
				return;
			}
		};
		getUsers();
	}, []);

	const handleOnChangeUsername = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setForm({ ...form, username: e.target.value });
	};

	const handleOnChangeDescription = (
		e: React.FormEvent<HTMLInputElement>
	) => {
		setForm({ ...form, description: e.currentTarget.value });
	};

	const handleOnChangeDuration = (e: React.FormEvent<HTMLInputElement>) => {
		const value = Number(e.currentTarget.value);
		if (value >= 0) setForm({ ...form, duration: value });
	};

	const handleOnChangeDate = (e: React.FormEvent<HTMLInputElement>) => {
		setForm({ ...form, date: new Date(e.currentTarget.value) });
	};

	const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (username === '') {
			setErrorMsg('Select a user!');
			return;
		}

		if (description === '') {
			setErrorMsg('Description must not be empty!');
			return;
		}

		if (duration === 0) {
			setErrorMsg('Duration must not greater than 0!');
			return;
		}

		if (date.getTime() > Date.now()) {
			setErrorMsg('Date cannot be in the future!');
			return;
		}

		try {
			await createExercise({
				username,
				description,
				duration,
				date: date.toISOString(),
			});
			setErrorMsg('');
			setForm({
				username: usernames[0] ?? '',
				description: '',
				duration: 0,
				date: new Date(Date.now() - timezoneOffset),
			});
		} catch (ex) {
			setErrorMsg(ex.error);
			return;
		}
	};

	return (
		<div>
			<form>
				<div className="sm:col-span-4">
					<label
						key="username"
						form="username"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Username
					</label>
					<div className="mt-2">
						<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
							<select
								name="username"
								id="username"
								className="block flex-1 border-0 outline-none bg-transparent px-4 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
								placeholder="Username must be unique"
								value={username}
								onChange={handleOnChangeUsername}
							>
								{usernames.map((username) => (
									<option value={username}>{username}</option>
								))}
							</select>
						</div>
					</div>

					<label
						key="description"
						form="description"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Description
					</label>
					<div className="mt-2">
						<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
							<input
								type="text"
								name="description"
								id="description"
								min="0"
								className="block flex-1 border-0 outline-none bg-transparent px-4 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
								placeholder="What kind of exercise?"
								value={description}
								onChange={handleOnChangeDescription}
							/>
						</div>
					</div>
					<label
						form="duration"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Duration (min)
					</label>
					<div className="mt-2">
						<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
							<input
								type="number"
								name="duration"
								id="duration"
								autoComplete="duration"
								className="block flex-1 border-0 outline-none bg-transparent px-4 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
								value={duration}
								onChange={handleOnChangeDuration}
							/>
						</div>
					</div>
					<label
						form="date"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Date
					</label>
					<div className="mt-2">
						<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
							<input
								type="date"
								name="date"
								id="date"
								autoComplete="date"
								className="block flex-1 border-0 outline-none bg-transparent px-4 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
								placeholder="Pick you target day"
								value={date.toISOString().slice(0, 10)}
								onChange={handleOnChangeDate}
							/>
						</div>

						{errorMsg.length > 0 && (
							<div className="text-red-500">{errorMsg}</div>
						)}
					</div>

					<button
						className="bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-2"
						onClick={onSubmit}
					>
						Create Exercise Log
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateExercise;
