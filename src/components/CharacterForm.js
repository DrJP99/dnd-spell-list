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
