import { createContext, useReducer } from "react"

const initial_state = {
	character: undefined,
	spell_list: [],
	filters: undefined,
	notifications: [],
	error: null,
	custom_spells: [],
}

const saveChar = (character) => {
	localStorage.setItem("spell_app_character", JSON.stringify(character))
}

const saveCustomSpells = (custom_spells) => {
	localStorage.setItem("spell_app_custom_spells", JSON.stringify(custom_spells))
}

const removeSpell = (spell, spell_list) => {
	return spell_list.filter((s) => s.index !== spell.index)
}

const orderSpells = (spell_list) => {
	let ordered_list = spell_list.sort((a, b) => {
		return a.name.localeCompare(b.name)
	})
	ordered_list = ordered_list.sort((a, b) => a.level - b.level)

	return ordered_list
}

const appReducer = (state, action) => {
	let spell_list
	let custom_spells
	let character
	let spell
	let expended
	let spell_level
	let notification
	let notifications

	console.log("action", action)

	switch (action.type) {
		//CHARACTERS
		case "CHAR_SET":
			character = action.payload.character
			console.log("setting char...:", character)
			return { ...state, character }
		case "CHAR_SAVE":
			character = action.payload.character

			saveChar(character)
			return { ...state, character }
		case "CHAR_DELETE":
			localStorage.removeItem("spell_app_character")
			return { ...state, character: undefined }
		case "CHAR_SPELL_SAVE":
			spell = action.payload
			spell_level = spell.level

			character = state.character

			if (
				spell_level > 0 &&
				character.spells.spells_per_level[spell_level].slots === 0
			) {
				return {
					...state,
					error: {
						message: `Error saving ${spell.name}. You do not have any spell slots of level ${spell_level}.`,
					},
				}
			}

			const saved_spell = character.spells.spells_per_level[
				spell_level
			].prepared.find((s) => s.name === spell.name)
			if (saved_spell) {
				console.error(
					`Cannot save spell multiple times: ${saved_spell.name} is already saved`
				)
				return {
					...state,
					error: {
						message: `Error saving ${spell.name}. You have already saved this spell.`,
					},
				}
			}

			if (
				spell_level > 0 &&
				character.spells.total_prepared + 1 <= character.spells.max_spells
			) {
				character.spells.total_prepared += 1
			} else if (spell_level > 0) {
				return {
					...state,
					error: {
						message: `Error saving ${spell.name}. You have reached the maximum number of spells you can prepare.`,
					},
				}
			}

			if (
				spell_level === 0 &&
				character.spells.spells_per_level[0].prepared_cantrips + 1 <=
					character.spells.spells_per_level[0].max_cantrips
			) {
				character.spells.spells_per_level[0].prepared_cantrips += 1
			} else if (spell_level === 0) {
				return {
					...state,
					error: {
						message: `Error saving ${spell.name}. You have reached the maximum number of cantrips you can prepare.`,
					},
				}
			}

			character.spells.spells_per_level[spell_level].prepared =
				character.spells.spells_per_level[spell_level].prepared.concat(spell)

			console.log("attempting to save character with spell", character)

			saveChar(character)

			return { ...state, character }
		case "CHAR_SPELL_DELETE":
			spell = action.payload
			character = state.character

			console.log(spell.level)

			const index = character.spells.spells_per_level[
				spell.level
			].prepared.findIndex((s) => {
				console.log(s.name)
				return s.name === spell.name
			})
			console.log(index)
			if (index !== 0 && !index) {
				console.error("Could not find spell in list")
				return {
					...state,
					error: {
						message: `Error removing ${spell.name}. Could not find spell in list.`,
					},
				}
			}

			if (spell.level === 0) {
				character.spells.spells_per_level[0].prepared_cantrips -= 1
			} else {
				character.spells.total_prepared -= 1
			}

			character.spells.spells_per_level[spell.level].prepared.splice(index, 1)

			saveChar(character)
			return { ...state, character }

		case "CHAR_SET_SLOTS":
			character = state.character

			expended = action.payload.expended
			spell_level = action.payload.spell_level

			character.spells.spells_per_level[spell_level].spent_slots = expended

			saveChar(character)

			return { ...state, character }

		case "CHAR_RESET_SLOTS":
			character = state.character

			character.spells.spells_per_level = character.spells.spells_per_level.map(
				(level) => ({ ...level, spent_slots: 0 })
			)
			saveChar(character)
			return { ...state, character }

		//SPELL LIST
		case "SPELLS_SET":
			spell_list = action.payload
			return { ...state, spell_list }
		case "SPELLS_SAVE":
			spell_list = action.payload
			localStorage.setItem("spell_app_all_spells", JSON.stringify(spell_list))
			return { ...state, spell_list }
		case "SPELLS_DELETE":
			localStorage.removeItem("spell_app_all_spells")
			return { ...state, spell_list: [] }
		case "SPELLS_SET_CUSTOM":
			custom_spells = action.payload
			spell_list = orderSpells(state.spell_list.concat(custom_spells))
			return { ...state, spell_list, custom_spells }
		case "SPELLS_ADD_CUSTOM":
			spell = action.payload
			//TODO:  Check IF SPELL IS UNIQUE
			spell_list = state.spell_list.concat(spell)
			custom_spells = state.custom_spells.concat(spell)
			spell_list = orderSpells(spell_list)

			saveCustomSpells(custom_spells)
			return { ...state, spell_list, custom_spells }
		case "SPELLS_DELETE_CUSTOM":
			spell = action.payload
			spell_list = removeSpell(spell, state.spell_list)
			custom_spells = removeSpell(spell, state.custom_spells)
			saveCustomSpells(custom_spells)

			return { ...state, spell_list, custom_spells }

		case "FILTERS_SET":
			const filters = action.payload
			return { ...state, filters }

		//NOTIFICATIONS
		case "NOTIF_ADD":
			notification = action.payload
			notifications = state.notifications.concat(notification)
			return { ...state, notifications }

		case "NOTIF_REMOVE":
			notifications = state.notifications
			notifications = notifications.filter((_, i) => i !== 0)

			return { ...state, notifications }

		//ERRORS
		case "ERROR_CLEAR":
			return { ...state, error: null }

		//DEFAULT
		default:
			console.log('could not find action type "' + action.type + '"')
			return state
	}
}

const AppContext = createContext()

export const AppContextProvider = (props) => {
	const [store, appDispatch] = useReducer(appReducer, initial_state)

	return (
		<AppContext.Provider value={[store, appDispatch]}>
			{props.children}
		</AppContext.Provider>
	)
}

export default AppContext
