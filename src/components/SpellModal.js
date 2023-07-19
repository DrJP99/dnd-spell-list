import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';

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
			<Modal show={show} onHide={handleClose} centered size='lg'>
				<Modal.Header closeButton>
					<Modal.Title>{spell.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>
						<strong>Casting time: </strong>
						{spell.casting_time}
					</p>
					<p>
						<strong>Somponents: </strong>
						{spell.components.map((comp) => {
							return comp;
						})}
					</p>
					{spell.concentration ? (
						<p>
							<strong>Concentration</strong>
						</p>
					) : null}
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
