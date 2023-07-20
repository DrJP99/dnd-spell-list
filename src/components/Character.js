import { useContext, useEffect, useState } from 'react';
import CharacterForm from './CharacterForm';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import AppContext from '../reducer';
import PreparedSpells from './PreparedSpells';

const CharacterPage = ({}) => {
	const [store, appDispatch] = useContext(AppContext);
	const character = store.character;
	let spells = [];

	spells = spells.concat(store.spell_list[0]);
	spells = spells.concat(store.spell_list[1]);

	console.log(character);
	return (
		<Card>
			<Card.Header>
				<Card.Title as={'h2'}>{character.name}</Card.Title>
				<h3>Level {character.level}</h3>
			</Card.Header>
			<Card.Body>
				<Row>
					<Col className='mb-3'>
						<Card className='text-center h-100'>
							<Card.Header className='text-muted'>
								spell class
							</Card.Header>
							<Card.Body>{character.class}</Card.Body>
						</Card>
					</Col>
					<Col className='mb-3'>
						<Card className='text-center h-100'>
							<Card.Header>{character.ability}</Card.Header>
							<Card.Body>+{character.modifier}</Card.Body>
							<Card.Footer className='text-muted'>
								{character.abilityScore}
							</Card.Footer>
						</Card>
					</Col>
					<Col className='mb-3'>
						<Card className='text-center h-100'>
							<Card.Header className='text-muted'>
								spell dc
							</Card.Header>
							<Card.Body>{character.dc}</Card.Body>
						</Card>
					</Col>
					<Col md sm={6} xs={6} className='mb-3'>
						<Card className='text-center h-100'>
							<Card.Header className='text-muted'>
								attack bonus
							</Card.Header>
							<Card.Body>+{character.attackBonus}</Card.Body>
						</Card>
					</Col>
					<Col className='mb-3'>
						<Card className='text-center h-100'>
							<Card.Header className='text-muted'>
								proficiency bonus
							</Card.Header>
							<Card.Body>+{character.proficiencyBonus}</Card.Body>
						</Card>
					</Col>
				</Row>
				<p>Max prepared level spells: {character.spells.max_spells}</p>
				<h5 className='mb-3'>Saved spells:</h5>
				<Row>
					{character.spells.spells_per_level.map((spells) => {
						return (
							<Col
								className='mb-3'
								md={6}
								key={spells.spell_level}
							>
								<PreparedSpells
									spell_level={spells.spell_level}
									prepared={spells.prepared}
									slots={spells.slots}
									max_cantrips={spells.max_cantrips}
								/>
							</Col>
						);
					})}
				</Row>
			</Card.Body>
		</Card>
	);
};

const Character = () => {
	// const [character, setCharacter] = useState(null);
	const [store, appDispatch] = useContext(AppContext);

	const handleRender = () => {
		return store.character ? <CharacterPage /> : <CharacterForm />;
	};

	return (
		<Container>
			<h1 className='mb-4'>Character</h1>
			{handleRender()}
		</Container>
	);
};

export default Character;
