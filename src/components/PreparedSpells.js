import { useContext, useEffect, useState } from "react"
import { Button, Card, Col, Form, Modal, Row, Stack } from "react-bootstrap"
import SpellList from "./SpellList"
import AppContext from "../reducer"

const AddSpellModal = ({ spell_list, spell_level, show, setShow }) => {
	const handleClose = () => setShow(false)

	const filters = {
		text: "",
		level: spell_level,
		time: "any",
		concentration: "any",
		classes: "any",
	}

	return (
		<Modal
			show={show}
			onHide={handleClose}
			size="xl"
			fullscreen="sm-down"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title>Add Spell</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ overflowY: "auto" }}>
				<SpellList
					spell_list={spell_list}
					add={true}
					spell_level={spell_level}
					filters={filters}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-danger" onClick={handleClose}>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

const PreparedSpells = ({
	spell_level,
	prepared,
	slots,
	spent_slots,
	max_cantrips,
	prepared_cantrips,
	has_available,
}) => {
	const [expended, setExpended] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [store, appDispatch] = useContext(AppContext)

	useEffect(() => {
		let copy = []
		for (let i = 0; i < slots; i++) {
			copy = copy.concat(i < spent_slots)
		}
		setExpended(copy)
	}, [spent_slots])

	const handleSlot = (event) => {
		let slot_index = Number(event.target.value)
		if (!event.target.checked) {
			slot_index = slot_index - 1
		}

		const ex_list = expended.map((slot, i) => (i <= slot_index ? true : false))
		setExpended(ex_list)

		const expended_slots = ex_list.filter((s) => s).length

		appDispatch({
			type: "CHAR_SET_SLOTS",
			payload: {
				expended: expended_slots,
				spell_level,
			},
		})
	}

	const check_box_style = {
		display: "inlineBlock",
		width: 30,
		height: 30,
	}

	if (slots === 0 && spell_level > 0) {
		return null
	}

	const spell_filter = {
		text: "",
		level: spell_level,
		time: "any",
		concentration: "any",
		classes: "any",
	}

	return (
		<>
			<AddSpellModal
				spell_list={store.spell_list}
				spell_level={spell_level}
				show={showModal}
				setShow={setShowModal}
			/>
			<Card className="h-100">
				<Card.Header>
					<Stack direction="horizontal">
						{spell_level === 0 ? (
							<>
								<Card.Title as="h5">Cantrips</Card.Title>
								<div className="ms-auto">
									Cantrips known: ({prepared_cantrips}/{max_cantrips})
								</div>
							</>
						) : (
							<Card.Title as={"h5"}>lvl {spell_level}</Card.Title>
						)}
					</Stack>
				</Card.Header>
				<Card.Body>
					<Form>
						{spell_level !== 0 ? (
							<Form.Group>
								<Form.Label>Spell Slots:</Form.Label>
								<Stack direction="horizontal" gap={1}>
									{expended.map((slot, i) => {
										return (
											<div key={i}>
												<Form.Check
													value={i}
													checked={slot}
													onChange={(event) => handleSlot(event)}
													style={check_box_style}
												/>
											</div>
										)
									})}
								</Stack>
							</Form.Group>
						) : null}
					</Form>
					<SpellList
						spell_list={prepared}
						remove={true}
						filters={spell_filter}
					/>
					{spell_level === 0 ? (
						max_cantrips > prepared_cantrips ? (
							<Button
								variant="outline-primary"
								className="w-100"
								onClick={() => setShowModal(true)}
							>
								+ Add Spell
							</Button>
						) : null
					) : has_available ? (
						<Button
							variant="outline-primary"
							className="w-100"
							onClick={() => setShowModal(true)}
						>
							+ Add Spell
						</Button>
					) : null}
				</Card.Body>
			</Card>
		</>
	)
}

export default PreparedSpells
