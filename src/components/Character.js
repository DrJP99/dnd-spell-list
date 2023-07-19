import { useEffect, useState } from 'react';
import CharacterForm from './CharacterForm';
import { Button, Container } from 'react-bootstrap';

const CharacterPage = ({ character }) => {
	return (
		<div>
			<h1>{character.name}</h1>
			<Button
				variant='danger'
				onClick={() => {
					localStorage.removeItem('spell_app_character');
				}}
			>
				delete
			</Button>
		</div>
	);
};

const Character = () => {
	const [character, setCharacter] = useState(null);

	useEffect(() => {
		const char = JSON.parse(localStorage.getItem('spell_app_character'));
		if (char) {
			setCharacter(char);
		}
	}, []);

	const handleRender = () => {
		return character ? (
			<CharacterPage character={character} />
		) : (
			<CharacterForm />
		);
	};

	return <Container>{handleRender()}</Container>;
};

export default Character;
