import { createContext, useReducer } from 'react';

const initial_state = {
	character: undefined,
	spell_list: [],
};

const appReducer = (state, action) => {
	let spell_list;
	let character;
	switch (action.type) {
		//CHARACTERS
		case 'CHAR_SET':
			character = action.payload.character;
			console.log('setting char...:', character);
			return { ...state, character };
		case 'CHAR_SAVE':
			character = action.payload.character;
			localStorage.setItem(
				'spell_app_character',
				JSON.stringify(character)
			);
			return { ...state, character };
		case 'CHAR_DELETE':
			localStorage.removeItem('spell_app_character');
			return { ...state, character: undefined };
		case 'CHAR_SPELL_SAVE':
			const spell = action.payload;
			const spell_level = spell.level;

			character = state.character;

			if (
				spell_level > 0 &&
				character.spells.spells_per_level[spell_level].slots === 0
			) {
				console.error(
					'You must have a spell slot for that level to prepare spell'
				);
				return state;
			}

			if (
				spell_level > 0 &&
				character.spells.total_prepared + 1 <=
					character.spells.max_spells
			) {
				character.spells.total_prepared += 1;
			} else if (spell_level > 0) {
				console.error('Max number of spells');
				return state;
			}

			if (
				spell_level === 0 &&
				character.spells.spells_per_level[0].prepared_cantrips + 1 <=
					character.spells.spells_per_level[0].max_cantrips
			) {
				character.spells.spells_per_level[0].prepared_cantrips += 1;
			} else if (spell_level === 0) {
				console.error('Max number of cantrips');
				return state;
			}

			const saved_spell = character.spells.spells_per_level[
				spell_level
			].prepared.find((s) => s.name === spell.name);
			if (saved_spell) {
				console.error(
					`Cannot save spell multiplet times: ${saved_spell.name} is already saved`
				);
				return state;
			}

			character.spells.spells_per_level[spell_level].prepared =
				character.spells.spells_per_level[spell_level].prepared.concat(
					spell
				);

			console.log('attempting to save character with spell', character);
			localStorage.setItem(
				'spell_app_character',
				JSON.stringify(character)
			);

			return { ...state, character };

		//SPELL LIST
		case 'SPELLS_SET':
			spell_list = action.payload;
			return { ...state, spell_list };
		case 'SPELLS_SAVE':
			spell_list = action.payload;
			localStorage.setItem(
				'spell_app_all_spells',
				JSON.stringify(spell_list)
			);
			return { ...state, spell_list };
		case 'SPELLS_DELETE':
			localStorage.removeItem('spell_app_all_spells');
			return { ...state, spell_list: [] };
	}
};

const AppContext = createContext();

export const AppContextProvider = (props) => {
	const [store, appDispatch] = useReducer(appReducer, initial_state);

	return (
		<AppContext.Provider value={[store, appDispatch]}>
			{props.children}
		</AppContext.Provider>
	);
};

export default AppContext;
