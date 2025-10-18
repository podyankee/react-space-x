// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Features from './components/Features'
import Calendar from './components/Calendar'
import Footer from './components/Footer'

import FetchData from './service/FetchData'

class App extends React.Component {
	fetchData = new FetchData()

	state = {
		rocket: 'Falcon 1',
		rocketFeatures: null,
		rockets: [],
	}

	componentDidMount() {
		this.updateRocket()
	}

	updateRocket() {
		this.fetchData
			.getRocket()
			.then(data => {
				this.setState({ rockets: data.map(item => item.name) })
				return data
			})
			.then(data => data.find(item => item.name === this.state.rocket))
			.then(rocketFeatures => {
				this.setState({ rocketFeatures })
			})
	}

	changeRocket = rocket => {
		this.setState({ rocket }, this.updateRocket)
	}

	render() {
		console.log(this.state)

		return (
			<>
				<Header rockets={this.state.rockets} changeRocket={this.changeRocket} />
				<Main rocket={this.state.rocket} />
				<Features />
				<Footer />
			</>
		)
	}
}

export default App
