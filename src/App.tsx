import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ExerciseList from './components/ExerciseList';
import './App.css';
import EditExercise from './components/EditExercise';
import CreateExercise from './components/CreateExercise';
import CreateUser from './components/CreateUser';

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path="/" element={<ExerciseList />} />
				<Route path="/edit/:id" element={<EditExercise />} />
				<Route path="/create" element={<CreateExercise />} />
				<Route path="/user" element={<CreateUser />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
