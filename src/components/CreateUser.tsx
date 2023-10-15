import { useState } from 'react';
import { createUser } from '../api/exerciseTracker';

const CreateUser = () => {
	const [username, setUsername] = useState<string>('');
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [showSuccess, setShowSuccess] = useState<boolean>(false);

	const handleOnChangeUsername = (e: React.FormEvent<HTMLInputElement>) => {
		setUsername(e.currentTarget.value);
		setShowSuccess(false);
	};

	const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			await createUser(username);
			setShowSuccess(true);
			setErrorMsg('');
		} catch (ex: any) {
			setErrorMsg(ex.error);
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
							<input
								type="text"
								name="username"
								id="username"
								autoComplete="username"
								className="block flex-1 border-0 outline-none bg-transparent px-4 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
								placeholder="Username must be unique"
								value={username}
								onChange={handleOnChangeUsername}
							/>
						</div>
						{showSuccess && (
							<div className="text-green-500">User Created!</div>
						)}
						{errorMsg.length > 0 && (
							<div className="text-red-500">{errorMsg}</div>
						)}
					</div>

					<button
						className="bg-gray-200 hover:bg-gray-300 rounded-md px-3 py-2"
						onClick={onSubmit}
					>
						Create User
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateUser;
