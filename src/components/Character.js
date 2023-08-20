import { useContext, useEffect, useState } from "react"
import CharacterForm from "./CharacterForm"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import AppContext from "../reducer"
import PreparedSpells from "./PreparedSpells"

const CharacterPage = ({}) => {
	const [notification, setNotification] = useState(null)
	const [store, appDispatch] = useContext(AppContext)
	const character = store.character

	useEffect(() => {
		if (notification) {
			let notif = notification
			if (store.error) {
				notif = {
					type: "danger",
					message: store.error.message,
					header: "Error!",
				}
				appDispatch({ type: "ERROR_CLEAR" })
			}
			appDispatch({
				type: "NOTIF_ADD",
				payload: notif,
				header: "Success!",
			})
			setTimeout(() => {
				appDispatch({ type: "NOTIF_REMOVE" })
			}, 5000)
		}
	}, [notification])

	const handleDelete = (event) => {
		event.preventDefault()

		if (
			window.confirm(
				`Are you sure you want to permanently delete ${character.name}?`
			)
		) {
			try {
				appDispatch({ type: "CHAR_DELETE" })
				appDispatch({
					type: "NOTIF_ADD",
					payload: {
						type: "success",
						message: `Deleted ${character.name}`,
						header: "Success!",
					},
				})
			} catch (error) {
				appDispatch({
					type: "NOTIF_ADD",
					payload: {
						type: "danger",
						message: `Error deleting ${character.name}: ${error.message}`,
						header: "Error!",
					},
				})
			}
			setTimeout(() => {
				appDispatch({ type: "NOTIF_REMOVE" })
			}, 5000)
		}
	}

	const longRest = (event) => {
		event.preventDefault()

		try {
			appDispatch({
				type: "CHAR_RESET_SLOTS",
			})
			appDispatch({
				type: "NOTIF_ADD",
				payload: {
					type: "success",
					message: `Reset spell slots`,
					header: "Success!",
				},
			})
		} catch (error) {
			console.error(error)
			appDispatch({
				type: "NOTIF_ADD",
				payload: {
					type: "danger",
					message: `Error resetting spell slots: ${error.message}`,
					header: "Error!",
				},
			})
		}
		setTimeout(() => {
			appDispatch({ type: "NOTIF_REMOVE" })
		}, 5000)
	}

	console.log(character)
	return (
		<Card>
			<Card.Header>
				<Card.Title as={"h2"}>{character.name}</Card.Title>
				<h5 className="fst-italic">Level {character.level}</h5>
			</Card.Header>
			<Card.Body>
				<Row>
					<Col className="mb-3">
						<Card className="text-center h-100">
							<Card.Header className="text-muted">spell class</Card.Header>
							<Card.Body className="text-capitalize">
								{character.class}
							</Card.Body>
						</Card>
					</Col>
					<Col className="mb-3">
						<Card className="text-center h-100">
							<Card.Header>{character.ability}</Card.Header>
							<Card.Body>+{character.modifier}</Card.Body>
							<Card.Footer className="text-muted">
								{character.abilityScore}
							</Card.Footer>
						</Card>
					</Col>
					<Col className="mb-3">
						<Card className="text-center h-100">
							<Card.Header className="text-muted">spell dc</Card.Header>
							<Card.Body>{character.dc}</Card.Body>
						</Card>
					</Col>
					<Col md sm={6} xs={6} className="mb-3">
						<Card className="text-center h-100">
							<Card.Header className="text-muted">attack bonus</Card.Header>
							<Card.Body>+{character.attackBonus}</Card.Body>
						</Card>
					</Col>
					<Col className="mb-3">
						<Card className="text-center h-100">
							<Card.Header className="text-muted">
								proficiency bonus
							</Card.Header>
							<Card.Body>+{character.proficiencyBonus}</Card.Body>
						</Card>
					</Col>
				</Row>
				<h5 className="mb-3">
					Saved spells: ({character.spells.total_prepared}/
					{character.spells.max_spells})
				</h5>
				<Button
					variant="primary"
					className="mb-3"
					onClick={(event) => longRest(event)}
				>
					Long rest
				</Button>
				<Row>
					{character.spells.spells_per_level.map((spells) => {
						return (
							<Col className="mb-3" md={6} key={spells.spell_level}>
								<PreparedSpells
									spell_level={spells.spell_level}
									prepared={spells.prepared}
									slots={spells.slots}
									spent_slots={spells.spent_slots}
									max_cantrips={spells.max_cantrips}
									prepared_cantrips={spells.prepared_cantrips}
									has_available={
										character.spells.max_spells >
										character.spells.total_prepared
									}
								/>
							</Col>
						)
					})}
				</Row>
				<Button variant="danger" onClick={handleDelete}>
					Delete Character
				</Button>
			</Card.Body>
		</Card>
	)
}

const Character = () => {
	// const [character, setCharacter] = useState(null);
	const [store, appDispatch] = useContext(AppContext)

	const handleRender = () => {
		return store.character ? <CharacterPage /> : <CharacterForm />
	}

	return (
		<Container>
			<h1 className="mb-4">Character</h1>
			{handleRender()}
		</Container>
	)
}

export default Character
