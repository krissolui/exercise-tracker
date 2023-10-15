import { useEffect, useState } from 'react';
import { createExercise, listUsers } from '../api/exerciseTracker';

const CreateExercise = () => {
	const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
	const [usernames, setUsernames] = useState<string[]>([]);
	const [username, setUsername] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [duration, setDuration] = useState<number>(0);
	const [date, setDate] = useState<Date>(
		new Date(Date.now() - timezoneOffset)
	);
	const [errorMsg, setErrorMsg] = useState<string>('');

	useEffect(() => {
		const getUsers = async () => {
			try {
				const users = await listUsers();
				setUsernames(users.map((user) => user.username));
			} catch (ex) {
				return;
			}
		};
		getUsers();
	}, []);

	const handleOnChangeUsername = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setUsername(e.target.value);
	};

	const handleOnChangeDescription = (
		e: React.FormEvent<HTMLInputElement>
	) => {
		setDescription(e.currentTarget.value);
	};

	const handleOnChangeDuration = (e: React.FormEvent<HTMLInputElement>) => {
		const value = Number(e.currentTarget.value);
		if (value >= 0) setDuration(value);
	};

	const handleOnChangeDate = (e: React.FormEvent<HTMLInputElement>) => {
		setDate(new Date(e.currentTarget.value));
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
			setUsername('');
			setDescription('');
			setDuration(0);
			setDate(new Date(Date.now() - timezoneOffset));
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
