import { useContext, useEffect, useState } from "react"
import AppContext from "../reducer"
import { Accordion, Form } from "react-bootstrap"

const FilterForm = () => {
	const [text, setText] = useState("")
	const [level, setLevel] = useState("any")
	const [time, setTime] = useState("any") //casating time Action || BA
	const [concentration, setConcentration] = useState("any")
	const [classes, setClasses] = useState("any")

	const [store, appDispatch] = useContext(AppContext)

	// Set filters on reducer store
	useEffect(() => {
		const new_filters = {
			text,
			level,
			time,
			concentration,
			classes,
		}
		appDispatch({ type: "FILTERS_SET", payload: new_filters })
	}, [text, level, time, concentration, classes])

	return (
		<div className="mb-4">
			<h3>Filter Spells</h3>
			<Form>
				<Form.Group className="mb-3">
					<Form.Label>Search</Form.Label>
					<Form.Control
						type="text"
						placeholder="Search"
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
				</Form.Group>
				<Accordion>
					<Accordion.Item eventKey="0">
						<Accordion.Header>Advanced Filters</Accordion.Header>
						<Accordion.Body>
							<Form.Group>
								<Form.Label>Level</Form.Label>
								<Form.Control
									as="select"
									value={level}
									onChange={(e) => setLevel(e.target.value)}
								>
									<option value="any">All</option>
									{new Array(10).fill(0).map((_, i) => (
										<option key={i} value={i}>
											{i === 0 ? "Cantrip" : i}
										</option>
									))}
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Casting Time</Form.Label>
								<Form.Control
									as="select"
									value={time}
									onChange={(e) => setTime(e.target.value)}
								>
									<option value="any">Any</option>
									<option value="1 action">Action</option>
									<option value="1 bonus action">Bonus Action</option>
									<option value="1 reaction">Reaction</option>
									<option value="long">Longer</option>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Concentration</Form.Label>
								<Form.Control
									as="select"
									value={concentration}
									onChange={(e) => setConcentration(e.target.value)}
								>
									<option value="any">Any</option>
									<option value="yes">Yes</option>
									<option value="no">No</option>
								</Form.Control>
							</Form.Group>
							<Form.Group>
								<Form.Label>Classes</Form.Label>
								<Form.Control
									as="select"
									value={classes}
									onChange={(e) => setClasses(e.target.value)}
								>
									<option value="any">Any</option>
									<option value="Cleric">Cleric</option>
								</Form.Control>
							</Form.Group>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</Form>
		</div>
	)
}

export default FilterForm
