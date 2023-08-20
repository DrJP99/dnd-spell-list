import axios from 'axios';
const base_url = 'https://www.dnd5eapi.co';

export const get_cleric_spells = async () => {
	//There's probably a more efficient way to do this :P
	const response = await axios.get(`${base_url}/api/classes/cleric/spells`);
	const result = await response.data.results.map(
		async (spell) => await get_spell(spell.index)
	);
	try {
		return await Promise.all(result);
	} catch (e) {
		console.error(e.message);
	}
};

export const get_spell = async (index) => {
	const response = await axios.get(`${base_url}/api/spells/${index}`);
	// console.log(response.data);
	return response.data;
};
