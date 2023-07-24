import { Card, Container } from "react-bootstrap"
import SpellList from "./SpellList"
import { useContext } from "react"
import AppContext from "../reducer"
import FilterForm from "./FilterForm"
import CustomSpellForm from "./CustomSpellForm"

const Home = () => {
	const [store, appDispatch] = useContext(AppContext)

	const filters = store.filters

	return (
		<Container>
			<h1>Welcome to my home!</h1>
			<Card>
				<Card.Body>
					<CustomSpellForm />
				</Card.Body>
			</Card>
			<FilterForm />
			<SpellList spell_list={store.spell_list} filters={filters} add />
		</Container>
	)
}

export default Home
