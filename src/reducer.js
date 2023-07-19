import { createContext, useReducer } from 'react';

const initial_state = {
	character: {},
	spell_list: [],
};

const appReducer = (state, action) => {
	switch (action.type) {
		//CHARACTERS
		case 'CHAR_SAVE':
			const character = action.payload;
			localStorage.setItem(
				'spell_app_character',
				JSON.stringify(character)
			);
			return { ...state, character };
		case 'CHAR_DELETE':
			localStorage.removeItem('spell_app_character');
			return { ...state, character: {} };

		//SPELL LIST
		case 'SPELLS_SET':
			const spell_list = action.payload;
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
