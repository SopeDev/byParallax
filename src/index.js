import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Layout from './views/Layout'

import './index.sass'

const app = document.getElementById('app')

ReactDOM.render(
	<Router>
		<Route render={({ location }) => (
			<Layout/>			
		)} />
	</Router>,
app);

module.hot.accept();