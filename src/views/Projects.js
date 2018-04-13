import React from 'react'
import { Link } from 'react-router-dom'
import { StaggeredMotion, spring } from 'react-motion'
import { inject, observer } from 'mobx-react'

import './styles/projects.sass'

@inject('NavStore') @observer
export default class Projects extends React.Component {
	render() {
		const { NavStore } = this.props 

		return (
			<div className="projects">
				<StaggeredMotion
					defaultStyles={[
						{ scale: 0 },
						{ scale: 0 },
						{ scale: 0 }
					]}
					styles={(prevStyles) => [
						{ scale: spring(1, {stiffness: 80, damping: 20}) },
						{ scale: spring(prevStyles[0].scale, {stiffness: 80, damping: 20}) },
						{ scale: spring(prevStyles[1].scale, {stiffness: 80, damping: 20}) }
					]}
				>
					{(styles) =>
						<div className="tile-board">
							<div className="tile" style={{
								transform: `scale(${styles[1].scale})`,
								backgroundImage: `url('./images/projects/ios/thumbnail.jpg')`
							}}>
								<Link to="/"></Link>
							</div>
							<div className="tile" style={{
								transform: `scale(${styles[2].scale})`,
								backgroundImage: `url('./images/projects/yha/thumbnail.jpg')`
							}}>
								<Link to="/"></Link>
							</div>
							<div className="tile" style={{
								transform: `scale(${styles[1].scale})`,
								backgroundImage: `url('./images/projects/moblum/thumbnail.jpg')`
							}}>
								<Link to="/"></Link>
							</div>
							<div className="tile" style={{
								transform: `scale(${styles[2].scale})`,
								backgroundImage: `url('./images/projects/julian/thumbnail.jpg')`
							}}>
								<Link to="/"></Link>
							</div>
							<div className="tile" style={{
								transform: `scale(${styles[2].scale})`,
								backgroundImage: `url('./images/projects/s55/thumbnail.jpg')`
							}}>
								<Link to="/"></Link>
							</div>
							<div className="tile" style={{
								transform: `scale(${styles[1].scale})`,
								backgroundImage: `url('./images/projects/food/thumbnail.jpg')`
							}}>
								<Link to="/"></Link>
							</div>
							<div className="tile" style={{
								transform: `scale(${styles[2].scale})`,
								backgroundImage: `url('./images/projects/corp/thumbnail.jpg')`
							}}>
								<Link to="/"></Link>
							</div>
							<div className="tile" style={{
								transform: `scale(${styles[1].scale})`,
								backgroundImage: `url('./images/projects/provita/thumbnail.jpg')`
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
		this.props.NavStore.nextRoute = "/Contacto"
		setTimeout(()=>{
			this.props.NavStore.routing = false
		}, 500)
	}
}
