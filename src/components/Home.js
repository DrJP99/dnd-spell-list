import { Container } from 'react-bootstrap';
import SpellList from './SpellList';
import { useContext } from 'react';
import AppContext from '../reducer';

const Home = () => {
	const [store, appDispatch] = useContext(AppContext);

	return (
		<Container>
			<h1>Welcome to my home!</h1>
			<SpellList spell_list={store.spell_list} />
		</Container>
	);
};

export default Home;
