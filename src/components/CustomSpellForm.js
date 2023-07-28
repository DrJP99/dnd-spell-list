import { useContext, useState } from "react"
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap"
import AppContext from "../reducer"

const CustomSpellForm = () => {
	const [name, setName] = useState("")
	const [level, setLevel] = useState(0)
	const [castingType, setCastingType] = useState("1 action")
	const [castingTime, setCastingTime] = useState("1")
	const [castingTimeUnit, setCastingTimeUnit] = useState("minutes")
	const [classes, setClasses] = useState([])
	const [components, setComponents] = useState([])
	const [material, setMaterial] = useState("")
	const [concentration, setConcentration] = useState(false)
	const [description, setDescription] = useState("")
	const [duration, setDuration] = useState("Instantaneous")
	const [durationTime, setDurationTime] = useState("1")
	const [durationTimeUnit, setDurationTimeUnit] = useState("minutes")
	const [higherLevel, setHigherLevel] = useState("")
	const [range, setRange] = useState("Self")
	const [rangeDistance, setRangeDistance] = useState(0)
	const [rangeDistanceType, setRangeDistanceType] = useState("none")
	// NONE, RADIUS, SPHERE, CONE, LINE
	const [ritual, setRitual] = useState(false)

	const [show, setShow] = useState(false)

	const [store, appDispatch] = useContext(AppContext)

	const allClasses = [
		"Bard",
		"Cleric",
		"Druid",
		"Paladin",
		"Ranger",
		"Sorcerer",
		"Warlock",
		"Wizard",
	]

	const allSchools = [
		"Abjuration",
		"Conjuration",
		"Divination",
		"Enchantment",
		"Evocation",
		"Illusion",
		"Necromancy",
		"Transmutation",
	]

	const [school, setSchool] = useState(allSchools[0])

	const handleChangeClasses = ({ target }) => {
		if (target.checked) {
			setClasses([...classes, target.value])
		} else {
			setClasses(classes.filter((c) => c !== target.value))
		}
	}

	const handleChangeComponents = ({ target }) => {
		if (target.checked) {
			setComponents([...components, target.value])
		} else {
			setComponents(components.filter((c) => c !== target.value))
		}
	}

	const handleClose = () => {
		setName("")
		setLevel(0)
		setCastingType("1 action")
		setCastingTime("1")
		setCastingTimeUnit("minutes")
		setClasses([])
		setComponents([])
		setMaterial("")
		setConcentration(false)
		setDescription("")
		setDuration("Instantaneous")
		setHigherLevel("")
		setRange("Self")
		setRitual(false)
		setSchool(allSchools[0])

		setShow(false)
	}

	const handleOpen = () => {
		setShow(true)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log("submit")

		const new_spell = {
			name,
			index: name.toLowerCase().replace(/ /g, "-"),
			level: Number(level),
			casting_time:
				castingType !== "long"
					? castingType
					: `${castingTime} ` +
					  (Number(castingTime) === 1
							? `${castingTimeUnit.substring(0, castingTimeUnit.length - 1)}`
							: `${castingTimeUnit}`),
			classes: classes.map((c) => {
				return { name: c, index: c.toLowerCase() }
			}),
			components,
			concentration,
			desc: [description],
			duration:
				duration !== "Time"
					? duration
					: `${durationTime} ` +
					  (Number(durationTime) === 1
							? `${durationTimeUnit.substring(0, durationTimeUnit.length - 1)}`
							: `${durationTimeUnit}`),
			higher_level: higherLevel !== "" ? [higherLevel] : [],
			range:
				range === "Range"
					? `${rangeDistance} ` +
					  (rangeDistanceType !== "none"
							? `foot ${rangeDistanceType}`
							: "feet")
					: range,
			ritual,
			school: { name: school, index: school.toLowerCase() },
			material: components.includes("M") ? material : undefined,
			custom: true,
		}

		appDispatch({
			type: "SPELLS_ADD_CUSTOM",
			payload: new_spell,
		})

		handleClose()
	}

	return (
		<div>
			<Button onClick={handleOpen} className="mb-3" variant="outline-primary">
				+ Create custom spell
			</Button>
			<Modal show={show} onHide={() => handleClose()} centered size="lg">
				<Modal.Header closeButton>
					<Modal.Title>Create a custom spell</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Row>
							<Col sm={9}>
								<Form.Group className="mb-3">
									<Form.Label>Name</Form.Label>
									<Form.Control
										type="text"
										value={name}
										onChange={({ target }) => setName(target.value)}
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className="mb-3">
									<Form.Label>Level</Form.Label>
									<Form.Control
										type="number"
										value={level}
										onChange={({ target }) => setLevel(target.value)}
									/>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col sm={6}>
								<Form.Group className="mb-3">
									<Form.Label>Casting Time</Form.Label>
									<Form.Check
										type="radio"
										name="castingType"
										label="Action"
										value="1 action"
										defaultChecked
										onChange={({ target }) => setCastingType(target.value)}
									/>
									<Form.Check
										type="radio"
										name="castingType"
										label="Bonus Action"
										value="1 bonus action"
										onChange={({ target }) => setCastingType(target.value)}
									/>
									<Form.Check
										type="radio"
										name="castingType"
										label="Reaction"
										value="1 reaction"
										onChange={({ target }) => setCastingType(target.value)}
									/>
								</Form.Group>
							</Col>
							<Col sm={6}>
								<Form.Group className="mb-3">
									<Form.Label>Classes</Form.Label>
									{allClasses.map((c) => {
										return (
											<Form.Check
												key={c}
												type="checkbox"
												label={c}
												value={c}
												onChange={handleChangeClasses}
											/>
										)
									})}
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col sm={6}>
								<Form.Group className="mb-3">
									<Form.Label>Components</Form.Label>
									<Form.Check
										type="checkbox"
										label="Verbal"
										value="V"
										onChange={handleChangeComponents}
									/>
									<Form.Check
										type="checkbox"
										label="Somatic"
										value="S"
										onChange={handleChangeComponents}
									/>
									{/* ADD TEXT FOR MATERIAL */}
									<InputGroup className="mb-3">
										<InputGroup.Checkbox
											type="checkbox"
											label="Material"
											value="M"
											onChange={handleChangeComponents}
										/>
										<Form.Control
											type="text"
											placeholder="Material"
											value={material}
											onChange={({ target }) => setMaterial(target.value)}
										/>
									</InputGroup>
								</Form.Group>
							</Col>
							<Col sm={6}>
								<Form.Label>Concentration</Form.Label>
								<Form.Group className="mb-3">
									<Form.Check
										type="checkbox"
										label="Concentration"
										value={concentration}
										onChange={({ target }) => setConcentration(target.checked)}
									/>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Group className="mb-3">
									<Form.Label>Description</Form.Label>
									<Form.Control
										as="textarea"
										rows={3}
										value={description}
										onChange={({ target }) => setDescription(target.value)}
									/>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Group className="mb-3">
									<Form.Label>Higher Level</Form.Label>
									<Form.Control
										as="textarea"
										rows={3}
										value={higherLevel}
										onChange={({ target }) => setHigherLevel(target.value)}
									/>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col sm={6}>
								<Form.Group className="mb-3">
									<Form.Label>Duration</Form.Label>
									<Form.Check
										type="radio"
										name="durationCheck"
										label="Instantaneous"
										value="Instantaneous"
										defaultChecked
										onChange={({ target }) => setDuration(target.value)}
									/>
									<InputGroup className="mb-3">
										<InputGroup.Radio
											name="durationCheck"
											label="Time"
											value="Time"
											onChange={({ target }) => setDuration(target.value)}
										/>
										<Form.Control
											type="number"
											value={durationTime}
											onChange={({ target }) => setDurationTime(target.value)}
										/>
										<Form.Select
											aria-label="Default select"
											value={durationTimeUnit}
											defaultValue={["minutes", "hours"][0]}
											onChange={({ target }) =>
												setDurationTimeUnit(target.value)
											}
										>
											{["minutes", "hours"].map((u) => {
												return (
													<option key={u} value={u}>
														{u}
													</option>
												)
											})}
										</Form.Select>
									</InputGroup>
									{/* ADD TEXT FOR DURATION */}
								</Form.Group>
							</Col>
							<Col sm={6}>
								<Form.Group className="mb-3">
									<Form.Label>Ritual</Form.Label>
									<Form.Check
										type="checkbox"
										label="Ritual"
										value={ritual}
										onChange={({ target }) => setRitual(target.checked)}
									/>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col sm={6}>
								<Form.Group className="mb-3">
									<Form.Label>School</Form.Label>
									<Form.Select
										aria-label="Default select"
										value={school}
										defaultValue={allSchools[0]}
										onChange={({ target }) => setSchool(target.value)}
									>
										{allSchools.map((s) => {
											return (
												<option key={s} value={s}>
													{s}
												</option>
											)
										})}
									</Form.Select>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className="mb-3">
									<Form.Label>Range</Form.Label>
									<Form.Check
										type="radio"
										name="rangeCheck"
										label="Self"
										value="Self"
										defaultChecked
										onChange={({ target }) => setRange(target.value)}
									/>
									<Form.Check
										type="radio"
										name="rangeCheck"
										label="Touch"
										value="Touch"
										onChange={({ target }) => setRange(target.value)}
									/>
									<Form.Label>Distance (feet)</Form.Label>
									<InputGroup className="mb-3">
										<InputGroup.Radio
											name="rangeCheck"
											label="Range"
											value="Range"
											onChange={({ target }) => setRange(target.value)}
										/>
										<Form.Control
											type="number"
											value={rangeDistance}
											onChange={({ target }) => setRangeDistance(target.value)}
										/>
										{/* NONE, RADIUS, SPHERE, CONE, LINE */}
										<Form.Select
											aria-label="Default select"
											value={rangeDistanceType}
											defaultValue={
												["none", "radius", "sphere", "cone", "line"][0]
											}
											onChange={({ target }) =>
												setRangeDistanceType(target.value)
											}
										>
											{["none", "radius", "sphere", "cone", "line"].map((u) => {
												return (
													<option key={u} value={u}>
														{u}
													</option>
												)
											})}
										</Form.Select>
									</InputGroup>
									{/* ADD TEXT FOR LONGER RANGE */}
								</Form.Group>
							</Col>
						</Row>
						<Button variant="primary" type="submit">
							Save
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default CustomSpellForm
