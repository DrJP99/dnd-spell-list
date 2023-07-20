import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Stack } from 'react-bootstrap';
import SpellList from './SpellList';

const PreparedSpells = ({
	spell_level,
	prepared,
	slots,
	max_cantrips,
	prepared_cantrips,
}) => {
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

	if (slots === 0 && spell_level > 0) {
		return null;
	}

	return (
		<Card className='h-100'>
			<Card.Header>
				<Stack direction='horizontal'>
					{spell_level === 0 ? (
						<>
							<Card.Title as='h5'>Cantrips</Card.Title>
							<div className='ms-auto'>
								Cantrips known: ({prepared_cantrips}/
								{max_cantrips})
							</div>
						</>
					) : (
						<Card.Title as={'h5'}>lvl {spell_level}</Card.Title>
					)}
				</Stack>
			</Card.Header>
			<Card.Body>
				<Form>
					{spell_level !== 0 ? (
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
					) : null}
				</Form>
				<SpellList spell_list={prepared} remove={true} />
			</Card.Body>
		</Card>
	);
};

export default PreparedSpells;
