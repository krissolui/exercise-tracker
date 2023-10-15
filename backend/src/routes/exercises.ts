import { Router } from 'express';
import Exercise from '../models/exercise.model';

const router = Router();

router.route('/').get((req, res) => {
	Exercise.find()
		.then((exercises) => res.json(exercises))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const { username, description, duration, date } = req.body;

	const newExercise = new Exercise({ username, description, duration, date });
	newExercise
		.save()
		.then(() => res.json('Exercise added!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
	Exercise.findById(req.params.id)
		.then((exercise) => res.json(exercise))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
	Exercise.findByIdAndDelete(req.params.id)
		.then(() => res.json('Exercise deleted.'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
	Exercise.findByIdAndUpdate(req.params.id, req.body)
		.then((exercise) => res.json(exercise))
		.catch((err) => res.status(400).json('Error: ' + err));
});

export default router;
