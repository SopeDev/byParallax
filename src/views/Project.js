import React from 'react'
import throttle from 'lodash.throttle'
import { inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import Swipeable from 'react-swipeable'

import DotMenu from '../components/dotMenu/dotMenu'
import CoverModule from '../components/projectModules/coverModule'
import FlipperModule from '../components/projectModules/flipperModule'
import StoryModule from '../components/projectModules/storyModule'
import VideoModule from '../components/projectModules/videoModule'

import './styles/project.sass'

@inject('ProjectsStore')
export default class Project extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			project: null,
			prevProject: null,
			nextProject: null,
			currentModule: 0
		}
		this._scrollView = this._scrollView.bind(this)
		this._scrollViewThrottle = throttle(this._scrollViewThrottle, 750, { trailing: false, leading: true })
		this._manageDotNavigation = this._manageDotNavigation.bind(this)
		this._pushPrevProject = this._pushPrevProject.bind(this)
		this._pushNextProject = this._pushNextProject.bind(this)
		this._handleSwipeUp = this._handleSwipeUp.bind(this)
		this._handleSwipeDown = this._handleSwipeDown.bind(this)
		this.prevLink = React.createRef()
		this.nextLink = React.createRef()
	}

	_scrollView(e) {
		e.persist()
		this._scrollViewThrottle(e.deltaY, e.currentTarget)
	}

	_manageCurrentModule(currentModule) {
		if (currentModule >= 0 && currentModule <= this.state.project.modules.length) {
			this.setState({
				currentModule: currentModule
			})
		}
	}

	_scrollViewThrottle(deltaY, currentTarget) {
		const currentModule = deltaY > 0 ? this.state.currentModule + 1 : this.state.currentModule - 1
		this._manageCurrentModule(currentModule)
	}

	_handleSwipeUp() {
		const currentModule = this.state.currentModule + 1
		this._manageCurrentModule(currentModule)
	}

	_handleSwipeDown() {
		const currentModule = this.state.currentModule - 1
		this._manageCurrentModule(currentModule)
	}
	
	_manageDotNavigation(targetLocation) {
		this.setState({ currentModule: targetLocation })
	}

	_pushPrevProject() {
		this.prevLink.current.classList.add('entering')
		this.nextLink.current.classList.add('exiting')
	}

	_pushNextProject() {
		this.prevLink.current.classList.add('exiting')
		this.nextLink.current.classList.add('entering')
	}

	render() {
		const { project, prevProject, nextProject, currentModule } = this.state
		const { ProjectsStore } = this.props
		let moduleIndexes = []

		let modules = project.modules.map((module, i)=>{
			moduleIndexes.push(i)
			const currentClass = i == currentModule ? " current" : ""
			switch(module.structure) {
				case "cover":
					return <CoverModule key={i} data={module} currentModule={currentClass}/>
					break;
				case "story":
					return <StoryModule key={i} data={module} currentModule={currentClass}/>
					break;
				case "flipper":
					return <FlipperModule key={i} data={module} currentModule={currentClass}/>
					break;
				case "video":
					return <VideoModule key={i} data={module} currentModule={currentClass}/>
					break;
			}
		})

		moduleIndexes.push(modules.length)
		modules.push(
			<div key={modules.length} className="module nav-module">
				<div ref={this.prevLink} className="prev-project">
					<div className="project-container">
						<Link to={"/byParallax/projects/" + ProjectsStore.projects[prevProject].key + "/"} onClick={this._pushPrevProject}>
							<div className="project-text">previous project</div>
							<svg version="1.1" x="0px" y="0px" viewBox="0 0 14.4 2.3">
								<polyline fill="none" stroke="#fff" strokeWidth="0.2835" points="1.2,0.1 0.1,1.1 1.2,2.2 "></polyline>
								<line fill="none" stroke="#fff" strokeWidth="0.2835" x1="0" y1="1.1" x2="14" y2="1.1"></line>
							</svg>
						</Link>
						<div className="cover" style={{ backgroundColor: ProjectsStore.projects[prevProject].tile.backgroundColor }}></div>
						<div className="project-background" style={{
							backgroundImage: `url(${ProjectsStore.projects[prevProject].modules[0].background})`,
							backgroundPosition: `${ProjectsStore.projects[prevProject].modules[0].endingPosition}%`
						}}></div>
					</div>
				</div>
				<div ref={this.nextLink} className="next-project">
					<div className="project-container">
						<Link to={"/byParallax/projects/" + ProjectsStore.projects[nextProject].key + "/"} onClick={this._pushNextProject}>
							<div className="project-text">next project</div>
							<svg version="1.1" x="0px" y="0px" viewBox="0 0 14.4 2.3">
								<line fill="none" stroke="#fff" strokeWidth="0.2835" x1="0" y1="1.1" x2="14" y2="1.1"></line>
								<polyline fill="none" stroke="#fff" strokeWidth="0.2835" points="13.1,0.1 14.2,1.1 13.1,2.2 "></polyline>
							</svg>
						</Link>
						<div className="cover" style={{ backgroundColor: ProjectsStore.projects[nextProject].tile.backgroundColor }}></div>
						<div className="project-background" style={{
							backgroundImage: `url(${ProjectsStore.projects[nextProject].modules[0].background})`,
							backgroundPosition: `${ProjectsStore.projects[nextProject].modules[0].endingPosition}%`
						}}></div>
					</div>
				</div>
			</div>
		)

		const showContact = currentModule == 0 || currentModule == modules.length - 1 ? "" : " show"

		return (
			<div className="project" id={project.key} onWheel={ this._scrollView }>
				<Swipeable
					onSwipedUp={this._handleSwipeUp}
					onSwipedDown={this._handleSwipeDown}
				>
					{ modules.map((module)=>{ return module	}) }
					<DotMenu
						location={this.state.currentModule}
						routes={moduleIndexes}
						invertLocation={[]}
						manageDotNavigation={this._manageDotNavigation}
					/>
					<div className={"contact-link" + showContact}>
						<div className="link">
							<Link to="byParallax/contact">Contact Us</Link>
						</div>
					</div>
				</Swipeable>
			</div>
		)
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const currentProyectIndex = nextProps.ProjectsStore.projects.findIndex((project)=>{ return nextProps.match.params.projectId == project.key })
		const prevProjectIndex = currentProyectIndex == 0 ? nextProps.ProjectsStore.projects.length - 1 : currentProyectIndex - 1
		const nextProjectIndex = currentProyectIndex == nextProps.ProjectsStore.projects.length - 1 ? 0 : currentProyectIndex + 1

		return {
			project: nextProps.ProjectsStore.projects[currentProyectIndex],
			prevProject: prevProjectIndex,
			nextProject: nextProjectIndex
		}
	}
}
