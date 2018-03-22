import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Layout from './views/Layout'
import About from './views/About'
import Projects from './views/Projects'

const app = document.getElementById('app')

ReactDOM.render(
	<Router>
		<Switch>
			<Route exact path='/' component={Layout}/>
			<Route path='/About' component={About}/>
			<Route path='/Projects' component={Projects}/>
		</Switch>
	</Router>,
app);

module.hot.accept();