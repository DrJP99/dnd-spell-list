import { Modal, Button, Table } from 'react-bootstrap';
import { useContext, useState } from 'react';
import Markdown from 'markdown-to-jsx';
import AppContext from '../reducer';

const SpellModal = ({ spell, setSpell }) => {
	const [show, setShow] = useState(true);
	const [store, appDispatch] = useContext(AppContext);

	const handleSave = (event) => {
		event.preventDefault();

		console.log('saving', spell.name);
		appDispatch({ type: 'CHAR_SPELL_SAVE', payload: spell });
		handleClose();
	};

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
					<Table borderless className='text-center'>
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
										return comp === 'M'
											? comp + '* '
											: comp + ' ';
									})}
								</td>
								<td>
									Duration:
									<br />
									{spell.concentration
										? `Concentration, `
										: null}
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
					<Button variant='success' onClick={handleSave}>
						Save spell
					</Button>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default SpellModal;
