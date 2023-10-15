interface IDeleteExercise {
	onDelete: () => void;
}

const DeleteExercise = ({ onDelete }: IDeleteExercise) => {
	return (
		<button
			className="bg-red-500 text-white px-3 py-2 rounded-md"
			onClick={onDelete}
		>
			&#10007;
		</button>
	);
};

export default DeleteExercise;
