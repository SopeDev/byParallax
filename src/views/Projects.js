import React from 'react'
import { Link } from 'react-router-dom'
import { Motion, spring } from 'react-motion'
import { inject } from 'mobx-react'

import './styles/projects.sass'

@inject('ProjectsStore')
export default class Projects extends React.Component {
	constructor() {
		super()
		this.state = {
			clickedElement: null,
			clickedElementStyles: null
		}
		this._handleMouseHover = this._handleMouseHover.bind(this)
		this._handleClick = this._handleClick.bind(this)
	}

	_getDirection(e) {
		let w = e.target.offsetWidth,
			h = e.target.offsetHeight,
			x = (e.clientX - e.target.getBoundingClientRect().left - (w / 2) * (w > h ? (h / w) : 1)),
			y = (e.clientY - e.target.getBoundingClientRect().top - (h / 2) * (h > w ? (w / h) : 1)),
			d = Math.round( Math.atan2(y, x) / 1.57079633 + 5 ) % 4
			return d
	}

	_handleMouseHover(e, dir) {
		if (window.innerWidth >= 1200) {
			const direction = this._getDirection(e)
			let class_suffix = ""

			e.target.className = "tile"
			
			switch ( direction ) {
				case 0:
					class_suffix = '-top'
					break
				case 1:
					class_suffix = '-right'
					break
				case 2:
					class_suffix = '-bottom'
					break
				case 3:
					class_suffix = '-left'
					break
			}
			
			e.target.classList.add( dir + class_suffix )
		}
	}

	_handleClick(e) {
		const target = e.target
		target.className = "tile out-bottom"
		setTimeout(()=>{
			this.setState({
				clickedElement: {
					index: target.dataset.index,
					width: target.offsetWidth,
					height: target.offsetHeight,
					top: target.getBoundingClientRect().top,
					left: target.getBoundingClientRect().left,
					backgroundPosition: this.props.ProjectsStore.projects[target.dataset.index].modules[0].startingPosition
				}
			})
			setTimeout(()=>{
				this.setState({
					clickedElementStyles: {
						width: window.innerWidth,
						height: window.innerHeight,
						top: 0,
						left: 0,
						backgroundPosition: window.innerWidth < 900 ? this.props.ProjectsStore.projects[target.dataset.index].modules[0].endingPosition : 50
					}
				})
			}, 250)
		}, 250)
	}

	render() {
		const { clickedElement, clickedElementStyles } = this.state
		const { initLoad, ProjectsStore } = this.props

		const defaultScale = initLoad ? 1 : 0

		return (
			<div className="projects">
				<div className="tile-board">
					{ProjectsStore.projects.map((project, i) =>
						<Link key={project.key} to={"/projects/" + project.key}>
							<div
								className="tile"
								style={{
									backgroundImage: `url(${project.tile.thumbnail})`
								}}
								data-index={i}
								onMouseEnter={ (e)=>{this._handleMouseHover(e, "in")} }
								onMouseLeave={ (e)=>{this._handleMouseHover(e, "out")} }
								onClick={ this._handleClick }
							>
								<div className="tile-info" style={{backgroundColor: project.tile.backgroundColor}}>
									<div className="tile-title">{project.title}</div>
								</div>
							</div>
						</Link>
					)}
				</div>
				{
					clickedElement ? 					
					<Motion
						defaultStyle={{
							width: clickedElement.width ,
							height: clickedElement.height ,
							top: clickedElement.top ,
							left: clickedElement.left,
							backgroundPosition: clickedElement.backgroundPosition
						}}
						style={{
							width: spring( clickedElementStyles ? clickedElementStyles.width : clickedElement.width ),
							height: spring( clickedElementStyles ? clickedElementStyles.height : clickedElement.height ),
							top: spring( clickedElementStyles ? clickedElementStyles.top : clickedElement.top ),
							left: spring( clickedElementStyles ? clickedElementStyles.left : clickedElement.left ),
							backgroundPosition: spring ( clickedElementStyles ? clickedElementStyles.backgroundPosition : clickedElement.backgroundPosition )
						}}
					>
						{(style) =>
							<div className="transitionElement" style={{
								width: `${style.width}px`,
								height: `${style.height}px`,
								top: `${style.top}px`,
								left: `${style.left}px`,
								backgroundImage: `url(${ProjectsStore.projects[clickedElement.index].modules[0].background})`,
								backgroundPosition: `${style.backgroundPosition}%`
							}}></div>
						}
					</Motion> : null
				}
			</div>
		)
	}
}