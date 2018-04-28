import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Contact from './views/Contact'
import Home from './views/Home'
import Layout from './views/Layout'
import Projects from './views/Projects'
import Project from './views/Project'

import CarouselStore from './stores/CarouselStore'
import NavStore from './stores/NavStore'
import ProjectsStore from './stores/ProjectsStore'

import './index.sass'

const stores = { CarouselStore, NavStore, ProjectsStore }
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
							timeout={1000}
						>
							<Switch location={location}>
								<Route exact path='/' component={Home}/>
								<Route exact path='/proyectos' component={Projects}></Route>
								<Route exact path='/contacto' component={Contact}/>
								<Route exact path='/:projectId' component={Project} />
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				</Layout>
			</Provider>
		)} />
	</Router>,
app);