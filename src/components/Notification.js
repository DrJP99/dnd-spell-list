import { useContext, useEffect, useState } from "react"
import { Alert, Container, Toast, ToastContainer } from "react-bootstrap"
import AppContext from "../reducer"

const Notification = ({ type, message, header }) => {
	const [show, setShow] = useState(true)

	const toggleShow = () => {
		setShow(!show)
	}

	return (
		<Toast
			show={show}
			onClose={toggleShow}
			animation={false}
			bg={type.toLowerCase()}
			className="mb-2"
			style={{ zIndex: 1 }}
		>
			<Toast.Header>
				<strong className="me-auto">{header}</strong>
			</Toast.Header>
			<Toast.Body>{message}</Toast.Body>
		</Toast>
	)
}

const Notifications = () => {
	const [store, appDispatch] = useContext(AppContext)

	// const notifications = [
	// 	{
	// 		type: 'danger',
	// 		message: 'Thing failed :('
	// 	},
	// 	{
	// 		type: 'success',
	// 		message: 'thing succeeded!'
	// 	}
	// ]

	if (store.notifications.length === 0) {
		return null
	}

	console.log(store.notifications)

	return (
		<div>
			<ToastContainer
				position="bottom-start"
				className="position-fixed m-2"
				role="alert"
			>
				{store.notifications.map((n) => (
					<Notification type={n.type} message={n.message} header={n.header} />
				))}
			</ToastContainer>
		</div>
	)
}

export default Notifications
