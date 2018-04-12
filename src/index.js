import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Contact from './views/Contact'
import Home from './views/Home'
import Layout from './views/Layout'
import Projects from './views/Projects'

import CarouselStore from './stores/CarouselStore'
import NavStore from './stores/NavStore'

import './index.sass'

const stores = { CarouselStore, NavStore }
const app = document.getElementById('app')

ReactDOM.render(
	<Router>
		<Route render={({ location }) => (
			<Provider {...stores}>
				<Layout>			
					<TransitionGroup>
						<CSSTransition
							key={location.pathname}
							classNames='fade'
							timeout={500}
						>
							<Switch location={location}>
								<Route exact path='/' component={Home}/>
								<Route exact path='/Proyectos' component={Projects}/>
								<Route exact path='/Contacto' component={Contact}/>
							</Switch>					
						</CSSTransition>
					</TransitionGroup>
				</Layout>
			</Provider>
		)} />
	</Router>,
app);