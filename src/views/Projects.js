import React from 'react'
import { Link } from 'react-router-dom'
import { Motion, StaggeredMotion, spring } from 'react-motion'
import { inject, observer } from 'mobx-react'

import './styles/projects.sass'

@inject('NavStore', 'ProjectsStore') @observer
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
		const direction = this._getDirection(e)
		let class_suffix = ""

		e.target.className = "tile"
		
		switch ( direction ) {
			case 0 : class_suffix = '-top';    break;
			case 1 : class_suffix = '-right';  break;
			case 2 : class_suffix = '-bottom'; break;
			case 3 : class_suffix = '-left';   break;
		}
		
		e.target.classList.add( dir + class_suffix )
	}

	_handleClick(e) {
		const target = e.target
		target.className = target.className + " clicked"
		setTimeout(()=>{
			this.setState({
				clickedElement: {
					index: target.dataset.index,
					width: target.offsetWidth,
					height: target.offsetHeight,
					top: target.getBoundingClientRect().top,
					left: target.getBoundingClientRect().left
				}
			})
			setTimeout(()=>{
				this.setState({
					clickedElementStyles: {
						width: window.innerWidth,
						height: window.innerHeight,
						top: 0,
						left: 0,
					}
				})
			}, 250)
		}, 250)
	}

	render() {
		const { clickedElement, clickedElementStyles } = this.state
		const { NavStore, ProjectsStore } = this.props

		return (
			<div className="projects">
				<StaggeredMotion
					defaultStyles={[
						{ scale: NavStore.initLoad ? 0 : 1 },
						{ scale: NavStore.initLoad ? 0 : 1 },
						{ scale: NavStore.initLoad ? 0 : 1 },
						{ scale: NavStore.initLoad ? 0 : 1 },
						{ scale: NavStore.initLoad ? 0 : 1 },
						{ scale: NavStore.initLoad ? 0 : 1 },
						{ scale: NavStore.initLoad ? 0 : 1 },
						{ scale: NavStore.initLoad ? 0 : 1 }
					]}
					styles={(prevStyles) => [
						{ scale: spring(1, {stiffness: 120, damping: 24}) },
						{ scale: spring(prevStyles[0].scale, {stiffness: 120, damping: 24}) },
						{ scale: spring(1, {stiffness: 120, damping: 24}) },
						{ scale: spring(prevStyles[0].scale, {stiffness: 120, damping: 24}) },
						{ scale: spring(1, {stiffness: 120, damping: 24}) },
						{ scale: spring(prevStyles[0].scale, {stiffness: 120, damping: 24}) },
						{ scale: spring(1, {stiffness: 120, damping: 24}) },
						{ scale: spring(prevStyles[0].scale, {stiffness: 120, damping: 24}) }
					]}
				>
					{styles =>
						<div className="tile-board">
							{styles.map((style, i) =>
								<Link key={ProjectsStore.projects[i].key} to={"/" + ProjectsStore.projects[i].key}>
									<div
										className="tile" 
										style={{
											transform: `scale(${styles[i].scale})`,
											backgroundImage: `url(${ProjectsStore.projects[i].tile.thumbnail})`
										}}
										data-index={i}
										onMouseEnter={ (e)=>{this._handleMouseHover(e, "in")} }
										onMouseLeave={ (e)=>{this._handleMouseHover(e, "out")} }
										onClick={ this._handleClick }
									>
										<div className="tile-info" style={{backgroundColor: ProjectsStore.projects[i].tile.backgroundColor}}>
											<div className="tile-title">{ProjectsStore.projects[i].title}</div>
										</div>
									</div>
								</Link>
							)}
						</div>
					}
				</StaggeredMotion>
				{
					clickedElement ? 					
					<Motion
						defaultStyle={{
							width: clickedElement.width ,
							height: clickedElement.height ,
							top: clickedElement.top ,
							left: clickedElement.left 
						}}
						style={{
							width: spring( clickedElementStyles ? clickedElementStyles.width : clickedElement.width ),
							height: spring( clickedElementStyles ? clickedElementStyles.height : clickedElement.height ),
							top: spring( clickedElementStyles ? clickedElementStyles.top : clickedElement.top ),
							left: spring( clickedElementStyles ? clickedElementStyles.left : clickedElement.left )
						}}
					>
						{(style) =>
							<div className="transitionElement" style={{
								width: `${style.width}px`,
								height: `${style.height}px`,
								top: `${style.top}px`,
								left: `${style.left}px`,
								backgroundImage: `url(${ProjectsStore.projects[clickedElement.index].tile.thumbnail})`
							}}></div>
						}
					</Motion> : null
				}
			</div>
		)
	}

	componentWillMount() {
		this.props.NavStore.prevRoute = "/"
		this.props.NavStore.nextRoute = "/contacto"
		setTimeout(()=>{
			this.props.NavStore.routing = false
		}, 1000)
	}
}
