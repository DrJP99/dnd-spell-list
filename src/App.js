import { useContext, useEffect } from "react"
import { get_cleric_spells } from "./controllers/spells"
import NavigationBar from "./components/NavigationBar"
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Character from "./components/Character"
import AppContext from "./reducer"
import Notifications from "./components/Notification"
import Footer from "./components/Footer"

function App() {
	const [store, appDispatch] = useContext(AppContext)

	useEffect(() => {
		//Save and get all spells to local storage to avoid many GET requests
		const spells = JSON.parse(localStorage.getItem("spell_app_all_spells"))
		const custom_spells = JSON.parse(
			localStorage.getItem("spell_app_custom_spells")
		)
		if (!spells) {
			get_cleric_spells().then((res) => {
				localStorage.setItem("spell_app_all_spells", JSON.stringify(res))
				appDispatch({ type: "SPELLS_SAVE", payload: res })
			})
		} else {
			appDispatch({ type: "SPELLS_SET", payload: spells })
		}
		if (custom_spells) {
			appDispatch({
				type: "SPELLS_SET_CUSTOM",
				payload: custom_spells,
			})
		}
	}, [])

	useEffect(() => {
		const character = JSON.parse(localStorage.getItem("spell_app_character"))
		console.log("TRYING TO SET:", character)
		if (character) {
			appDispatch({ type: "CHAR_SET", payload: { character } })
		}
	}, [])

	// if (spell_list.length === 0) {
	// 	return (
	// 		<Spinner animation='border' role='status'>
	// 			<span className='visually-hidden'>Loading...</span>
	// 		</Spinner>
	// 	);
	// }

	return (
		<div>
			<NavigationBar />
			<Notifications />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/character" element={<Character />} />
			</Routes>
			<Footer />
		</div>
	)
}

export default App
