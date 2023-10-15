import { useEffect, useState } from 'react';
import { listExercises, removeExercises } from '../api/exerciseTracker';
import { Exercise } from '../types/types';
import DeleteExercise from './DeleteExercise';

const getExercises = async (): Promise<Exercise[]> => {
	try {
		const data = await listExercises();
		return data;
	} catch (ex) {
		return [];
	}
};

const ExerciseList = () => {
	const [exercises, setExercises] = useState<Exercise[]>([]);

	useEffect(() => {
		const getData = async () => {
			const res = await getExercises();
			setExercises(res);
		};
		getData();
	}, []);

	const onDelete = (id: string) => async () => {
		try {
			await removeExercises(id);
			const res = await getExercises();
			setExercises(res);
		} catch (ex) {
			return;
		}
	};

	return (
		<div>
			<table>
				<thead>
					<th>Username</th>
					<th>Description</th>
					<th>Duration (min)</th>
					<th>Date</th>
					<th>Remove</th>
				</thead>
				<tbody>
					{exercises.map(
						({ _id, username, description, duration, date }) => (
							<tr key={_id}>
								<td>{username}</td>
								<td>{description}</td>
								<td>{duration} min</td>
								<td>{new Date(date).toLocaleDateString()}</td>
								<td>
									<DeleteExercise
										onDelete={onDelete(_id ?? '')}
									/>
								</td>
							</tr>
						)
					)}
				</tbody>
			</table>
		</div>
	);
};

export default ExerciseList;
