import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Stack } from 'react-bootstrap';
import SpellList from './SpellList';

const PreparedSpells = ({ level = 1, spell_list = [], max = 3, slots = 4 }) => {
	const [expended, setExpended] = useState([]);

	useEffect(() => {
		let copy = [];
		for (let i = 0; i < slots; i++) {
			copy = copy.concat(false);
		}
		setExpended(copy);
	}, []);

	const resetSlots = () => {
		setExpended(expended.map(() => false));
	};

	const handleSlot = (event) => {
		let slot_index = Number(event.target.value);
		if (!event.target.checked) {
			slot_index = slot_index - 1;
		}
		setExpended(
			expended.map((slot, i) => (i <= slot_index ? true : false))
		);
	};

	const check_box_style = {
		display: 'inlineBlock',
		width: 30,
		height: 30,
	};

	console.log(spell_list);

	return (
		<Card>
			<Card.Header>
				<Stack direction='horizontal'>
					<Card.Title as='h5'>lvl {level}</Card.Title>
					<div className='ms-auto'>Spells known: {max}</div>
				</Stack>
			</Card.Header>
			<Card.Body>
				<Form>
					<Form.Group>
						<Form.Label>Spell Slots:</Form.Label>
						<Stack direction='horizontal' gap={1}>
							{expended.map((slot, i) => {
								return (
									<div key={i}>
										<Form.Check
											value={i}
											checked={slot}
											onChange={(event) =>
												handleSlot(event)
											}
											style={check_box_style}
										/>
									</div>
								);
							})}
							<Button className='ms-auto'>reset slots</Button>
						</Stack>
					</Form.Group>
				</Form>
				<SpellList spell_list={spell_list} />
			</Card.Body>
		</Card>
	);
};

export default PreparedSpells;
