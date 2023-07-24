import { useContext, useState } from "react"
import SpellModal from "./SpellModal"
import { Button, Modal, Table } from "react-bootstrap"
import AppContext from "../reducer"
import CustomSpellForm from "./CustomSpellForm"

const SpellList = ({
	spell_list,
	add = undefined,
	remove = undefined,
	filters = {},
}) => {
	const [selected_spell, set_selected_spell] = useState(null)
	const [store, appDispatch] = useContext(AppContext)
	const [showModal, setShowModal] = useState(false)

	// console.log(filters)
	const filtered_spell_list = spell_list.filter((spell) => {
		if (filters.text) {
			if (
				!spell.name.toLowerCase().includes(filters.text.toLowerCase()) &&
				!spell.desc.some((d) =>
					d.toLowerCase().includes(filters.text.toLowerCase())
				) &&
				!spell.higher_level.some((d) =>
					d.toLowerCase().includes(filters.text.toLowerCase())
				)
			) {
				return false
			}
		}
		if (filters.level !== "any") {
			if (spell.level !== Number(filters.level)) {
				return false
			}
		}
		if (filters.time !== "any") {
			if (spell.casting_time !== filters.time) {
				if (filters.time === "long") {
					if (
						!spell.casting_time.includes("minute") &&
						!spell.casting_time.includes("hour")
					) {
						return false
					}
				} else {
					return false
				}
			}
		}
		if (filters.concentration !== "any") {
			if (spell.concentration !== (filters.concentration === "yes")) {
				return false
			}
		}
		if (filters.classes !== "any") {
			if (!spell.classes.some((c) => c.name === filters.classes)) {
				return false
			}
		}
		return true
	})

	return (
		<div>
			<SpellModal
				spell={selected_spell}
				showModal={showModal}
				setShowModal={setShowModal}
				add={add}
				remove={remove}
			/>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Spell name</th>
						<th>Level</th>
					</tr>
				</thead>
				<tbody>
					{filtered_spell_list.length === 0
						? null
						: filtered_spell_list.map((spell) => (
								<tr key={spell.index}>
									<td
										onClick={() => {
											set_selected_spell(spell)
											setShowModal(true)
										}}
									>
										{spell.name}
									</td>
									<td>{spell.level === 0 ? "cantrip" : spell.level}</td>
								</tr>
						  ))}
				</tbody>
			</Table>
		</div>
	)
}

export default SpellList
