import React from 'react'
import { Link } from 'react-router-dom'
import { StaggeredMotion, spring } from 'react-motion'
import { inject, observer } from 'mobx-react'

import './styles/projects.sass'

@inject('NavStore', 'ProjectsStore') @observer
export default class Projects extends React.Component {
	render() {
		const { ProjectsStore } = this.props 

		return (
			<div className="projects">
				<StaggeredMotion
					defaultStyles={[
						{ scale: 0 },
						{ scale: 0 },
						{ scale: 0 }
					]}
					styles={(prevStyles) => [
						{ scale: spring(1, {stiffness: 140, damping: 24}) },
						{ scale: spring(prevStyles[0].scale, {stiffness: 140, damping: 24}) },
						{ scale: spring(prevStyles[1].scale, {stiffness: 140, damping: 24}) }
					]}
				>
					{(styles) =>
						<div className="tile-board">
							<div className="tile" style={{
								transform: `scale(${styles[1].scale})`,
								backgroundImage: `url(${ProjectsStore.projects.ios.thumbnail})`
							}}>
								<Link to="/"></Link>
							</div>
							<div className="tile" style={{
								transform: `scale(${styles[2].scale})`,
								backgroundImage: `url(${ProjectsStore.projects.yha.thumbnail})`
							}}>
								<Link to="/"></Link>
							</div>
							<div className="tile" style={{
								transform: `scale(${styles[1].scale})`,
								backgroundImage: `url(${ProjectsStore.projects.moblum.thumbnail})`
							}}>
								<Link to="/"></Link>
							</div>
							<div className="tile" style={{
								transform: `scale(${styles[2].scale})`,
								backgroundImage: `url(${ProjectsStore.projects.julian.thumbnail})`
							}}>
								<Link to="/"></Link>
							</div>
							<div className="tile" style={{
								transform: `scale(${styles[2].scale})`,
								backgroundImage: `url(${ProjectsStore.projects.s55.thumbnail})`
							}}>
								<Link to="/"></Link>
							</div>
							<div className="tile" style={{
								transform: `scale(${styles[1].scale})`,
								backgroundImage: `url(${ProjectsStore.projects.food.thumbnail})`
							}}>
								<Link to="/"></Link>
							</div>
							<div className="tile" style={{
								transform: `scale(${styles[2].scale})`,
								backgroundImage: `url(${ProjectsStore.projects.corp.thumbnail})`
							}}>
								<Link to="/"></Link>
							</div>
							<div className="tile" style={{
								transform: `scale(${styles[1].scale})`,
								backgroundImage: `url(${ProjectsStore.projects.provita.thumbnail})`
							}}>
								<Link to="/"></Link>
							</div>
						</div>
					}
				</StaggeredMotion>
			</div>
		)
	}

	componentDidMount() {
		this.props.NavStore.prevRoute = "/"
		this.props.NavStore.nextRoute = "/contacto"
		setTimeout(()=>{
			this.props.NavStore.routing = false
		}, 1000)
	}
}
