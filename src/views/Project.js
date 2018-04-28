import React from 'react'
import { Motion, spring } from 'react-motion'
import { inject, observer } from 'mobx-react'

import './styles/project.sass'

class CoverModule extends React.Component {
	render() {
		return (
			<div className="module cover-module" style={{ backgroundImage: `url(${this.props.backgroundImage})`}}>This is a Cover Module</div>
		)
	}
}

class VideoModule extends React.Component {
	render() {
		return (
			<div className="module video-module">This is a Video Module</div>
		)
	}
}

class BriefModule extends React.Component {
	render() {
		return (
			<div className="module brief-module">This is a Brief Module</div>
		)
	}
}

@inject('ProjectsStore') @observer
export default class Project extends React.Component {
	constructor() {
		super()
		this.state = {
			scrollValue: 0
		}
		this._scrollView = this._scrollView.bind(this)
	}

	_scrollView(e) {
		// const scrollValue = this.state.scrollValue + -e.deltaY

		// if (scrollValue > 0) {
		// 	this.setState({
		// 		scrollValue: 0
		// 	})
		// } else if (scrollValue < -e.currentTarget.children[0].offsetHeight + e.currentTarget.children[0].children[e.currentTarget.children[0].children.length - 1].offsetHeight) {
		// 	this.setState({
		// 		scrollValue: -e.currentTarget.children[0].offsetHeight + e.currentTarget.children[0].children[e.currentTarget.children[0].children.length - 1].offsetHeight
		// 	})
		// } else {
		// 	this.setState({
		// 		scrollValue: scrollValue
		// 	})
		// }
	}

	render() {
		const { projectId } = this.props.match.params
		const project = this.props.ProjectsStore.projects.find((project)=>{ return projectId == project.key })

		const modules = project.modules.map((module, i)=>{
			switch(module.structure) {
				case "cover":
					return <CoverModule key={i} backgroundImage={module.image}/>
					break;
				case "video":
					return <VideoModule key={i}/>
					break;
				case "brief":
					return <BriefModule key={i}/>
					break;
			}
		})

		return (
			<div className="project">
				<Motion
					style={{ scroll: spring(this.state.scrollValue) }}
				>
					{({scroll}) =>
						<div className="view-window" style={{ transform: `translateY(${scroll}px)` }}>
							{ modules.map((module)=>{ return module	}) }
						</div>
					}
				</Motion>
			</div>
		)
	}
}
			// <div className="project" onWheel={ this._scrollView }>