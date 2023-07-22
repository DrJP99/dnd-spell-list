import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
	return (
		<Navbar expand='lg' bg='danger' sticky='top' className='mb-4'>
			<Container>
				<Navbar.Brand href='/' as={Link} to={'/'}>
					My Spell List
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<Nav.Link href='/' as={Link} to='/'>
							home
						</Nav.Link>
						<Nav.Link href='/character' as={Link} to='/character'>
							character
						</Nav.Link>
						<Nav.Link href='/profile' as={Link} to='/profile'>
							profile
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavigationBar;
