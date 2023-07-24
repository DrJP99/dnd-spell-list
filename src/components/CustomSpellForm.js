import { useContext, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import AppContext from "../reducer"

const CustomSpellForm = () => {
	const [name, setName] = useState("")
	const [level, setLevel] = useState(0)
	const [castingType, setCastingType] = useState("")
	const [castingTime, setCastingTime] = useState("")
	const [castingTimeUnit, setCastingTimeUnit] = useState("")
	const [classes, setClasses] = useState([])
	const [components, setComponents] = useState([])
	const [material, setMaterial] = useState("")
	const [concentration, setConcentration] = useState(false)
	const [description, setDescription] = useState("")
	const [duration, setDuration] = useState("")
	const [higherLevel, setHigherLevel] = useState("")
	const [range, setRange] = useState("")
	const [ritual, setRitual] = useState(false)
	const [school, setSchool] = useState("")

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
					: `${castingTime} ${castingTimeUnit}`,
			classes: classes.map((c) => {
				return { name: c, index: c.toLowerCase() }
			}),
			components,
			concentration,
			desc: [description],
			duration,
			higher_level: [higherLevel],
			range,
			ritual,
			school: { name: school, index: school.toLowerCase() },
			material,
			custom: true,
		}

		appDispatch({
			type: "SPELLS_ADD_CUSTOM",
			payload: new_spell,
		})
	}

	return (
		<div>
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
							<Form.Check
								type="checkbox"
								label="Material"
								value="M"
								onChange={handleChangeComponents}
							/>
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
							{/* ADD TEXT FOR LONGER RANGE */}
						</Form.Group>
					</Col>
				</Row>
				<Button variant="primary" type="submit">
					Save
				</Button>
			</Form>
		</div>
	)
}

export default CustomSpellForm
