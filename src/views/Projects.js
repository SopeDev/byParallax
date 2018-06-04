import React from 'react'
import { Link } from 'react-router-dom'
import { Motion, spring } from 'react-motion'
import { inject, observer } from 'mobx-react'
import Swipeable from 'react-swipeable'

import './styles/projects.sass'

@inject('ProjectsStore') @observer
export default class Projects extends React.Component {
	constructor() {
		super()
		this.state = {
			navToProject: false
		}
		this._handleClick = this._handleClick.bind(this)
		this._nextProject = this._nextProject.bind(this)
		this._prevProject = this._prevProject.bind(this)
		this._setProject = this._setProject.bind(this)
	}

	_handleClick(e) {
		this.setState({ navToProject: true })
	}

	_nextProject() {
		this.props.ProjectsStore.nextProject()
		console.log(this.props.ProjectsStore.currentProject)
	}

	_prevProject() {
		this.props.ProjectsStore.prevProject()
		console.log(this.props.ProjectsStore.currentProject)
	}

	_setProject(project) {
		this.props.ProjectsStore.setProject(project)
		console.log(this.props.ProjectsStore.currentProject)
	}

	render() {
		const { navToProject } = this.state
		const { ProjectsStore } = this.props

		const navDots = ProjectsStore.projects.map((project, i)=>{
			const currentClass = i == ProjectsStore.currentProject ? " current" : ""
			return <div key={project.key + "dot" + i} className={"nav-dot" + currentClass} onClick={()=>{this._setProject(i)}}></div>
		})

		const leftSwiperClass = ProjectsStore.currentProject > 0 ? "show" : ""
		const rightSwiperClass = ProjectsStore.currentProject < ProjectsStore.projects.length - 1 ? ProjectsStore.currentProject == 0 ? "show first" : "show" : ""


		return (
			<div className="projects">
				<Motion
					defaultStyle={{
						width: 80,
						height: 70,
						translateX: 10,
						translateY: 15
					}}
					style={{
						width: navToProject ? spring(100) : 80, 
						height: navToProject ? spring(100) : 70,
						translateX: navToProject ? spring(0) : 10,
						translateY: navToProject ? spring(0) : 15
					}}
				>
					{(style) =>
						<Swipeable
							onSwipedLeft={this._nextProject}
							onSwipedRight={this._prevProject}
							className="tile-board"
							style={{
								width: `${style.width}vw`,
								height: `${style.height}vh`,
								transform: `translate3d(${style.translateX}vw, ${style.translateY}vh, 0)`
							}}
						>
							{ProjectsStore.projects.map((project, i) =>
								<Link key={project.key} to={"./" + project.key + "/"} className={ i == ProjectsStore.currentProject ? "current" : ""}>
									<div
										className="tile"
										style={{
											backgroundImage: `url(${project.modules[0].background})`
										}}
										data-index={i}
										onClick={ this._handleClick }
									>
									</div>
								</Link>
							)}
						</Swipeable>
					}
				</Motion>
				<div className="nav-dots">
					<div className={"swipeable-left " + leftSwiperClass} onClick={this._prevProject}>
						<svg width="5px" height="10px">
							<polyline fill="none" stroke="#000" strokeWidth="1" points="5,0 0,5 5,10"></polyline>
						</svg>
					</div>
					{navDots}
					<div className={"swipeable-right " + rightSwiperClass} onClick={this._nextProject}>
						<svg width="5px" height="10px">
							<polyline fill="none" stroke="#000" strokeWidth="1" points="0,0 5,5 0,10"></polyline>
						</svg>
					</div>
				</div>
			</div>
		)
	}
}