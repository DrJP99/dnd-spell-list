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
			<h1>Home</h1>
			<FilterForm />
			<CustomSpellForm />
			<SpellList spell_list={store.spell_list} filters={filters} add />
			<CustomSpellForm />
		</Container>
	)
}

export default Home
