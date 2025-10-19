import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Home from './components/Home'
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
		company: null,
	}

	componentDidMount() {
		this.updateRocket()
		this.updateCompany()
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

	updateCompany = () => {
		this.fetchData.getCompany().then(company => this.setState({ company }))
	}

	render() {
		return (
			<Router>
				<Header rockets={this.state.rockets} changeRocket={this.changeRocket} />
				{this.state.company && <Home company={this.state.company} />}
				{/* <Main rocket={this.state.rocket} /> */}
				{/* {this.state.rocketFeatures && <Features {...this.state.rocketFeatures} />} */}
				{this.state.company && <Footer {...this.state.company.links} />}
			</Router>
		)
	}
}

export default App
