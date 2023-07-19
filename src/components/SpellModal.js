import { Modal, Button, Table } from 'react-bootstrap';
import { useState } from 'react';
import Markdown from 'markdown-to-jsx';

const SpellModal = ({ spell, setSpell }) => {
	const [show, setShow] = useState(true);

	const handleClose = () => {
		setShow(false);
		setSpell(null);
	};
	const handleShow = () => setShow(true);
	console.log(spell);
	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				centered
				size='lg'
				animation={false}
			>
				<Modal.Header closeButton>
					<div>
						<Modal.Title>
							<div>{spell.name}</div>
						</Modal.Title>
						<div style={{ fontStyle: 'italic' }}>
							{spell.level === 0
								? 'Cantrip'
								: `Level ${spell.level}`}
							, {spell.school.name}
						</div>
					</div>
				</Modal.Header>
				<Modal.Body>
					<Table bordered>
						<tbody>
							<tr>
								<td>
									Casting time:
									{spell.casting_time}
								</td>
								<td>
									Range:
									{spell.range}
								</td>
							</tr>
							<tr>
								<td>
									Components:
									{spell.components.map((comp) => {
										return comp;
									})}
								</td>
								<td>
									Duration:
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
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default SpellModal;
