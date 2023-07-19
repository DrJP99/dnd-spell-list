import { useEffect, useRef, useState } from 'react';
import { get_cleric_spells } from './controllers/spells';
import { Table, Spinner } from 'react-bootstrap';
import SpellModal from './components/SpellModal';

function App() {
	const [spell_list, set_spell_list] = useState([]);
	const [selected_spell, set_selected_spell] = useState(null);

	useEffect(() => {
		get_cleric_spells().then((res) => set_spell_list(res));
	}, []);

	if (spell_list.length === 0) {
		return (
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		);
	}

	// const SpellModalUtil = (spell) => {
	// 	const modal_ref = useRef();
	// 	<SpellModal spell={spell} />;
	// };

	return (
		<div className='container'>
			<h1>Hello world!</h1>
			{selected_spell ? (
				<SpellModal
					spell={selected_spell}
					setSpell={set_selected_spell}
				/>
			) : null}
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Spell name</th>
						<th>Level</th>
					</tr>
				</thead>
				<tbody>
					{spell_list.map((spell) => (
						<tr key={spell.index}>
							<td
								onClick={() => {
									set_selected_spell(spell);
								}}
							>
								{spell.name}
							</td>
							<td>
								{spell.level === 0 ? 'cantrip' : spell.level}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default App;
