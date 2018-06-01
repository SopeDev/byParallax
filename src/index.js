import React from 'react'
import ReactDOM from 'react-dom'
<<<<<<< Updated upstream
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Layout from './views/Layout'
import About from './views/About'
import Projects from './views/Projects'
=======
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Layout from './views/Layout'

import './index.sass'
>>>>>>> Stashed changes

const app = document.getElementById('app')

ReactDOM.render(
	<Router>
<<<<<<< Updated upstream
		<Switch>
			<Route exact path='/' component={Layout}/>
			<Route path='/About' component={About}/>
			<Route path='/Projects' component={Projects}/>
		</Switch>
=======
		<Route render={({ location }) => (
			<Layout/>			
		)} />
>>>>>>> Stashed changes
	</Router>,
app);

module.hot.accept();