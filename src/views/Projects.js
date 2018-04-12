import React from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import './styles/projects.sass'

@inject('NavStore') @observer
export default class Projects extends React.Component {
	render() {
		const { NavStore } = this.props 

		return (
			<div className="projects">
				<div className="tile-board">
					<div className="tile" style={{backgroundImage: `url('./images/project_thumbnail_1.jpg')`}}>
						<Link to="/"></Link>
					</div>
					<div className="tile" style={{backgroundImage: `url('./images/project_thumbnail_1.jpg')`}}>
						<Link to="/"></Link>
					</div>
					<div className="tile" style={{backgroundImage: `url('./images/project_thumbnail_1.jpg')`}}>
						<Link to="/"></Link>
					</div>
					<div className="tile" style={{backgroundImage: `url('./images/project_thumbnail_1.jpg')`}}>
						<Link to="/"></Link>
					</div>
					<div className="tile" style={{backgroundImage: `url('./images/project_thumbnail_1.jpg')`}}>
						<Link to="/"></Link>
					</div>
					<div className="tile" style={{backgroundImage: `url('./images/project_thumbnail_1.jpg')`}}>
						<Link to="/"></Link>
					</div>
					<div className="tile" style={{backgroundImage: `url('./images/project_thumbnail_1.jpg')`}}>
						<Link to="/"></Link>
					</div>
					<div className="tile" style={{backgroundImage: `url('./images/project_thumbnail_1.jpg')`}}>
						<Link to="/"></Link>
					</div>
				</div>
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
