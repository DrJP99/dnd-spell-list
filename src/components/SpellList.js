import { useState } from 'react';
import SpellModal from './SpellModal';
import { Table } from 'react-bootstrap';

const SpellList = ({ spell_list, add = undefined, remove = undefined }) => {
	const [selected_spell, set_selected_spell] = useState(null);

	return (
		<div>
			{selected_spell ? (
				<SpellModal
					spell={selected_spell}
					setSpell={set_selected_spell}
					add={add}
					remove={remove}
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
					{spell_list.length === 0
						? null
						: spell_list.map((spell) => (
								<tr key={spell.index}>
									<td
										onClick={() => {
											set_selected_spell(spell);
										}}
									>
										{spell.name}
									</td>
									<td>
										{spell.level === 0
											? 'cantrip'
											: spell.level}
									</td>
								</tr>
						  ))}
				</tbody>
			</Table>
		</div>
	);
};

export default SpellList;
