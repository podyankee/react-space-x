import logo from '../../logo.svg'
import { Link, NavLink } from 'react-router-dom'
import './Header.scss'

const Header = props => (
	<header className='header'>
		<Link to='/'>
			<img src={logo} alt='Logo Space X' className='logo' />
		</Link>
		<nav className='main-nav nav'>
			<ul className='list'>
				{props.rockets.map((item, i) => (
					<li key={i} className='item'>
						<Link
							to='/rocket'
							onClick={() => {
								props.changeRocket(item)
							}}
							className='item-link'>
							{item}
						</Link>
					</li>
				))}
			</ul>
		</nav>
		<nav className='secondary-nav'>
			<ul className='list'>
				<li className='item'>
					<NavLink exact='true' to='/' className='item-link' activeclassname='active'>
						Home
					</NavLink>
				</li>
				<li className='item'>
					<NavLink to='calendar' className='item-link' activeclassname='active'>
						Calendar
					</NavLink>
				</li>
			</ul>
		</nav>
	</header>
)

export default Header
