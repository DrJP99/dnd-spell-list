import { useContext, useEffect, useState } from 'react';
import {
	Button,
	Card,
	Col,
	Form,
	InputGroup,
	Row,
	Stack,
} from 'react-bootstrap';
import AppContext from '../reducer';

const CharacterForm = () => {
	const [name, setName] = useState('');
	const [className, setClassName] = useState('cleric');
	const [level, setLevel] = useState(1);
	const [spellcastingAbility, setspellcastingAbility] = useState('WIS');
	const [abilityScore, setAbilityScore] = useState(10);
	const [abilityScoreMod, setAbilityScoreMod] = useState(0);
	const [proficiencyBonus, setProficiencyBonus] = useState(2);

	const [store, appDispatch] = useContext(AppContext);

	useEffect(() => {
		calculateAbilityMod();
	}, [abilityScore]);

	useEffect(() => {
		calculateProficiencyBonus();
	}, [level]);

	const calculateAbilityMod = () => {
		setAbilityScoreMod(Math.floor((abilityScore - 10) / 2));
	};

	const calculateProficiencyBonus = () => {
		setProficiencyBonus(Math.floor((level - 1) / 4) + 2);
	};

	const calculateSpells = () => {
		// Total # = WIS mod + lvl
		const max_spells = Number(level) + Number(abilityScoreMod);
		console.log('level', level, '+ score MOD', abilityScoreMod);
		console.log('max spells:', max_spells);
		let max_cantrips = 3;
		let slots = new Array(10).fill(0);

		if (level >= 10) {
			max_cantrips = 5;
		} else if (level >= 4) {
			max_cantrips = 4;
		} else {
			max_cantrips = 3;
		}

		if (level >= 3) {
			slots[1] = 4;
		} else if (level === 2) {
			slots[1] = 3;
		} else if (level === 1) {
			slots[1] = 2;
		}

		if (level >= 4) {
			slots[2] = 3;
		} else if (level === 3) {
			slots[2] = 2;
		}

		if (level >= 6) {
			slots[3] = 3;
		} else if (level === 5) {
			slots[3] = 2;
		}

		if (level >= 9) {
			slots[4] = 3;
		} else if (level === 8) {
			slots[4] = 2;
		} else if (level === 7) {
			slots[4] = 1;
		}

		if (level >= 18) {
			slots[5] = 3;
		} else if (level >= 10) {
			slots[5] = 2;
		} else if (level === 9) {
			slots[5] = 1;
		}

		if (level >= 19) {
			slots[6] = 2;
		} else if (level >= 11) {
			slots[6] = 1;
		}

		if (level === 20) {
			slots[7] = 2;
		} else if (level >= 13) {
			slots[7] = 1;
		}

		if (level >= 15) {
			slots[8] = 1;
		}

		if (level >= 17) {
			slots[9] = 1;
		}

		const new_object = {
			max_spells,
			total_prepared: 0,
			spells_per_level: slots.map((slot, i) => {
				return {
					max_cantrips: i === 0 ? max_cantrips : undefined,
					spell_level: i,
					slots: slot,
					spent_slots: 0,
					prepared: [],
				};
			}),
		};

		return new_object;
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const newCharacter = {
			name,
			class: className,
			level,
			ability: spellcastingAbility,
			abilityScore: abilityScore,
			modifier: abilityScoreMod,
			proficiencyBonus,
			dc: 8 + proficiencyBonus + abilityScoreMod,
			attackBonus: abilityScoreMod + proficiencyBonus,
			spells: calculateSpells(),
		};

		appDispatch({
			type: 'CHAR_SAVE',
			payload: { character: newCharacter },
		});
	};

	return (
		<Card>
			<Card.Header as={'h2'}>Create a new character</Card.Header>
			<Card.Body>
				<Form onSubmit={handleSubmit}>
					<Row>
						<Col sm={6}>
							<Form.Group className='mb-3'>
								<Form.Label>
									Enter your character's name
								</Form.Label>
								<Form.Control
									type='text'
									value={name}
									onChange={({ target }) =>
										setName(target.value)
									}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className='mb-3'>
								<Form.Label>Class</Form.Label>
								<Form.Select
									aria-label='Default select'
									disabled
								>
									<option value={'cleric'}>Cleric</option>
								</Form.Select>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className='mb-3'>
								<Form.Label>Level</Form.Label>
								<Form.Control
									type='number'
									value={level}
									onChange={({ target }) => {
										setLevel(target.value);
									}}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col md sm={12}>
							<Form.Group className='mb-3'>
								<Form.Label>
									Spellcasting Ability Score
								</Form.Label>
								<InputGroup>
									<InputGroup.Text id='ability-type'>
										{spellcastingAbility}
									</InputGroup.Text>
									<Form.Control
										aria-describedby='ability-type'
										type='number'
										value={abilityScore}
										onChange={({ target }) =>
											setAbilityScore(target.value)
										}
									/>
								</InputGroup>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className='mb-3'>
								<Form.Label>Ability Score Modifier</Form.Label>
								<InputGroup>
									<InputGroup.Text>+</InputGroup.Text>
									<Form.Control
										type='number'
										value={abilityScoreMod}
										onChange={({ target }) =>
											setAbilityScoreMod(target.value)
										}
									/>
									<Button
										variant='outline-secondary'
										onClick={() => calculateAbilityMod()}
									>
										calculate
									</Button>
								</InputGroup>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className='mb-3'>
								<Form.Label>Proficiency Bonus</Form.Label>
								<InputGroup>
									<InputGroup.Text>+</InputGroup.Text>
									<Form.Control
										type='number'
										value={proficiencyBonus}
										onChange={({ target }) =>
											setProficiencyBonus(target.value)
										}
									/>
									<Button
										variant='outline-secondary'
										onClick={() =>
											calculateProficiencyBonus()
										}
									>
										calculate
									</Button>
								</InputGroup>
							</Form.Group>
						</Col>
					</Row>
					<Stack direction='horizontal' gap={3}>
						<Button variant='danger' className='ms-auto'>
							Cancel
						</Button>
						<Button variant='primary' type='submit'>
							Save
						</Button>
					</Stack>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default CharacterForm;
