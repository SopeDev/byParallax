import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Contact from './views/Contact'
import Layout from './views/Layout'
import Home from './views/Home'
import Projects from './views/Projects'

import './index.sass'

const app = document.getElementById('app')

ReactDOM.render(
	<Router>
		<Route render={({ location }) => (
			<Layout>
				<TransitionGroup>
					<CSSTransition
						key={location.key}
						classNames='fade'
						timeout={1000}
					>
						<Switch location={location}>
							<Route exact path='/' component={Home}/>
							<Route exact path='/Proyectos' component={Projects}/>
							<Route exact path='/Contacto' component={Contact}/>
						</Switch>					
					</CSSTransition>
				</TransitionGroup>
			</Layout>
		)} />
	</Router>,
app);