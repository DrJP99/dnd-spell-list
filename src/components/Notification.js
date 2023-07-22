import { useContext, useEffect } from "react"
import { Alert, Container } from "react-bootstrap"
import AppContext from "../reducer"


const Notification = () => {
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

	return (
		<Container>
		{
			store.notifications.map(n => (
				<Alert variant={n.type}>
				{n.message}
				</Alert>
			))
		}
		</Container>
	)
}

export default Notification