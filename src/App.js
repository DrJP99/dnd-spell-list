import { useContext, useEffect, useRef, useState } from 'react';
import { get_cleric_spells } from './controllers/spells';
import { Table, Spinner } from 'react-bootstrap';
import SpellModal from './components/SpellModal';
import NavigationBar from './components/NavigationBar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Character from './components/Character';
import AppContext from './reducer';

function App() {
	const [store, appDispatch] = useContext(AppContext);

	useEffect(() => {
		//Save and get all spells to local storage to avoid many GET requests
		const spells = JSON.parse(localStorage.getItem('spell_app_all_spells'));
		if (!spells) {
			get_cleric_spells().then((res) => {
				localStorage.setItem(
					'spell_app_all_spells',
					JSON.stringify(res)
				);
				appDispatch({ type: 'SPELLS_SET', payload: res });
			});
		} else {
			appDispatch({ type: 'SPELLS_SET', payload: spells });
		}
	}, []);

	// if (spell_list.length === 0) {
	// 	return (
	// 		<Spinner animation='border' role='status'>
	// 			<span className='visually-hidden'>Loading...</span>
	// 		</Spinner>
	// 	);
	// }

	return (
		<div>
			<NavigationBar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/character' element={<Character />} />
			</Routes>
		</div>
	);
}

export default App;
