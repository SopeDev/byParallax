import React from 'react'
import { Link } from 'react-router-dom'
import { Motion, StaggeredMotion, spring } from 'react-motion'

import CarouselStore from '../../stores/CarouselStore'

import './nav.sass'

export default class Nav extends React.Component {
	constructor() {
		super()
		this.state = {
			open: false,
			shown: false
		}
		this._handleMenu = this._handleMenu.bind(this)
	}

	_handleMenu(origin) {
		if (this.state.open == false) {
			if (origin != "home") {
				if (CarouselStore.disabled == false) {
					CarouselStore.stopCarousel()
				}
				this._togglePanel()
				setTimeout(()=>{
					this._toggleLinks()
				}, 500);
			}
		} else {
			this._toggleLinks()
			setTimeout(()=>{
				this._togglePanel()
				if (CarouselStore.disabled == false) {
					CarouselStore.startCarousel()
				}
			}, 500);
		}
	}

	_togglePanel() {
		const open = !this.state.open
		this.setState({ open })
	}

	_toggleLinks() {
		const shown = !this.state.shown
		this.setState({ shown })
	}

	render() {

		const { open, shown } = this.state

		const navPanelClass = open ? "collapsed" : ""; 

		return (
			<div className="navigation">
				<div className="nav-bar">
					<div className="toggle" onClick={ this._handleMenu }>
						<span className="pattie"></span>
						<span className="pattie"></span>
						<span className="pattie"></span>
					</div>
					<div className="logo">
						<Link to="/" onClick={() => this._handleMenu("home")}>Parallax</Link>
					</div>
				</div>

				<Motion
					style={{x: spring(open ? 100 : 0, {stiffness: 250, damping: 28})}}
				>
					{({x}) => 
						<div className={ "nav-panel " + navPanelClass } style={{
							width: `${x}vw`,
							height: `${x}vh`,
						}}>
							<StaggeredMotion
								defaultStyles={[
									{ offset: 200 },
									{ offset: 200 }
								]}
								styles={(prevStyles) => [
									{offset: spring(shown ? 0 : 200, {stiffness: 250, damping: 28})},
									{offset: spring(shown ? prevStyles[0].offset : prevStyles[0].offset , {stiffness: 250, damping: 28})}
								]}
							>
								{(styles) =>
									<ul>
										<li>
											<span style={{transform: `translateX(${styles[0].offset}px)`}}>
												<Link to="/proyectos" onClick={ this._handleMenu }>Proyectos</Link>
											</span>
										</li>
										<li>
											<span style={{transform: `translateX(-${styles[1].offset}px)`}}>
												<Link to="/contacto" onClick={ this._handleMenu }>Contacto</Link>
											</span>
										</li>
									</ul>				
								}
							</StaggeredMotion>
						</div>
					}
				</Motion>
			</div>
		)
	}
}