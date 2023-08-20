import { Container } from "react-bootstrap"

const Footer = () => {
	return (
		<footer className="footer mt-4 py-3 bg-danger">
			<Container className="text-center">
				<a
					href="https://github.com/DrJP99/"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub
				</a>
				<div>(C) 2023 JP Dixon</div>
			</Container>
		</footer>
	)
}

export default Footer
