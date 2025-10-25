import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import Features from './components/Features'
import Calendar from './components/Calendar'
import Footer from './components/Footer'
import Details from './components/Details'

import FetchData from './service/FetchData'

// Отдельный компонент для страницы ракеты, чтобы использовать useParams
const RocketPage = ({ fetchData }) => {
	const { rocket } = useParams()

	const [rocketFeatures, setRocketFeatures] = useState(null)

	useEffect(() => {
		const rocketName = rocket.replace(/_/g, ' ')
		console.log('rocket param: ', rocket)
		console.log('rocket features loaded: ', rocketFeatures)

		fetchData
			.getRocket()
			.then(data => data.find(item => item.name === rocketName))
			.then(rocketFeatures => setRocketFeatures(rocketFeatures))
	}, [rocket, fetchData])

	return rocketFeatures ? <Features {...rocketFeatures} /> : null
}

const App = () => {
	const fetchData = new FetchData()

	const [rocket, setRocket] = useState('Falcon 1')
	const [rockets, setRockets] = useState([])
	const [company, setCompany] = useState(null)

	// Загружаем список ракет и компанию при старте
	useEffect(() => {
		fetchData.getRocket().then(data => {
			setRockets(data.map(item => item.name))
		})
		fetchData.getCompany().then(company => setCompany(company))
	}, [])

	const changeRocket = rocket => {
		setRocket(rocket)
	}

	return (
		<Router>
			<Header rockets={rockets} changeRocket={changeRocket} />
			<Routes>
				<Route path='/' element={company && <Home company={company} />} />
				<Route path='/rocket/:rocket' element={<RocketPage fetchData={fetchData} />} />
				<Route path='/calendar' element={<Calendar />} />
				<Route path='/details/:id' element={<Details />} />
			</Routes>
			{company && <Footer {...company.links} />}
		</Router>
	)
}

export default App
