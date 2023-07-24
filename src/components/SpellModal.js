import { Modal, Button, Table } from "react-bootstrap"
import { useCallback, useContext, useEffect, useState } from "react"
import Markdown from "markdown-to-jsx"
import AppContext from "../reducer"

const SpellModal = ({
	spell,
	showModal,
	setShowModal,
	add = undefined,
	remove = undefined,
}) => {
	const [notification, setNotification] = useState(null)
	const [store, appDispatch] = useContext(AppContext)

	useEffect(() => {
		console.log("notification", notification)
		console.log("store", store)
		if (notification) {
			let notif = notification
			if (store.error) {
				notif = {
					type: "danger",
					message: store.error.message,
					header: "Error!",
				}
				appDispatch({ type: "ERROR_CLEAR" })
			} else {
				handleClose()
			}
			appDispatch({
				type: "NOTIF_ADD",
				payload: notif,
			})
			setTimeout(() => {
				appDispatch({ type: "NOTIF_REMOVE" })
			}, 5000)
		}
	}, [notification])

	const handleSave = (event) => {
		event.preventDefault()

		console.log("saving", spell.name)
		appDispatch({ type: "CHAR_SPELL_SAVE", payload: spell })

		setNotification({
			type: "success",
			message: `Saved ${spell.name}`,
			header: "Success!",
		})
	}

	const handleRemove = (event) => {
		event.preventDefault()

		appDispatch({ type: "CHAR_SPELL_DELETE", payload: spell })
		setNotification({
			type: "success",
			message: `Removed ${spell.name} from prepared spells`,
			header: "Success!",
		})
	}

	const handleClose = () => {
		setShowModal(false)
		// setShowModal(false)
	}
	console.log(spell)

	if (!spell) {
		return null
	}

	return (
		<>
			<Modal
				show={showModal}
				onHide={handleClose}
				centered
				size="lg"
				animation={false}
				style={{ zIndex: 9999 }}
			>
				<Modal.Header closeButton>
					<div>
						<Modal.Title>
							<div>{spell.name}</div>
						</Modal.Title>
						<div style={{ fontStyle: "italic" }}>
							{spell.level === 0 ? "Cantrip" : `Level ${spell.level}`},{" "}
							{spell.school.name}
						</div>
					</div>
				</Modal.Header>
				<Modal.Body>
					<Table borderless className="text-center">
						<tbody>
							<tr>
								<td>
									Casting time:
									<br />
									{spell.casting_time}
								</td>
								<td>
									Range: <br />
									{spell.range}
								</td>
							</tr>
							<tr>
								<td>
									Components: <br />
									{spell.components.map((comp) => {
										return comp === "M" ? comp + "* " : comp + " "
									})}
								</td>
								<td>
									Duration:
									<br />
									{spell.concentration ? `Concentration, ` : null}
									{spell.duration}
								</td>
							</tr>
						</tbody>
					</Table>
					<p>
						<strong>Description: </strong>
						{spell.desc}
					</p>
					{spell.higher_level.length !== 0 ? (
						<p>
							<strong>At higher levels: </strong>
							{spell.higher_level}
						</p>
					) : null}
					{spell.material ? <p>* - ({spell.material})</p> : null}
				</Modal.Body>
				<Modal.Footer>
					{remove ? (
						<Button variant="danger" onClick={handleRemove}>
							Remove Spell
						</Button>
					) : null}
					{add ? (
						<Button variant="success" onClick={handleSave}>
							Save spell
						</Button>
					) : null}
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default SpellModal
