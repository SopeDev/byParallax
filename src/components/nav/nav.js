import React from 'react'
import { Link } from 'react-router-dom'
import { Motion, StaggeredMotion, spring } from 'react-motion'

import BouncyLetter from '../bouncyLetter/bouncyLetter'
import CarouselStore from '../../stores/CarouselStore'

import logo from '../../images/logo-white.png'
import background from '../../video/menu.mp4'

import './nav.sass'

export default class Nav extends React.Component {
	constructor() {
		super()
		this.state = {
			links: [
				"proyectos",
				"contacto"
			],
			open: false,
			shown: false
		}
		this._handleMenu = this._handleMenu.bind(this)
		this.videoBackground = React.createRef()
	}

	_handleMenu(origin) {
		if (this.state.open == false) {
			this.videoBackground.current.play()
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
				this.videoBackground.current.pause()
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
		const { location } = this.props

		const navInvertClass = location == "/" || location == "/contacto" ? "" : " invert"
		const navPanelClass = open ? " collapsed" : ""; 

		return (
			<div className="navigation">
				<div className={"nav-bar" + navInvertClass + navPanelClass}>
					<div className="toggle" onClick={ this._handleMenu }>
						<span className="pattie"></span>
						<span className="pattie"></span>
						<span className="pattie"></span>
					</div>
					<div className="logo">
						<Link to="/" onClick={() => this._handleMenu("home")}>
							<img src={logo} alt="Parallax Creative"/>
						</Link>
					</div>
				</div>

				<Motion
					style={{x: spring(open ? 100 : 0, {stiffness: 220, damping: 24})}}
				>
					{({x}) => 
						<div className={"nav-panel " + navPanelClass} style={{
							width: `${x}vw`,
							height: `${x}vh`,
						}}>
							<div className="video-container">
								<video ref={this.videoBackground} muted loop>
									<source src={background} type="video/mp4"/>
								</video>
								<div className="overlay"></div>
							</div>
							<StaggeredMotion
								defaultStyles={[
									{ offset: 800 },
									{ offset: 800 }
								]}
								styles={(prevStyles) => [
									{offset: spring(shown ? 0 : 800, {stiffness: 250, damping: 28})},
									{offset: spring(shown ? prevStyles[0].offset : prevStyles[0].offset , {stiffness: 250, damping: 28})}
								]}
							>
								{(styles) =>
									<ul>
										<li>
											<span style={{transform: `translateX(-${styles[0].offset}px)`}}>
												<Link to="/proyectos" onClick={ this._handleMenu }>
													{this.state.links[0].split('').map((letter, i)=>{
														return <BouncyLetter key={letter + i} letter={letter} />
													})}
												</Link>
											</span>
										</li>
										<li>
											<span style={{transform: `translateX(${styles[1].offset}px)`}}>
												<Link to="/contacto" onClick={ this._handleMenu }>
													{this.state.links[1].split('').map((letter, i)=>{
														return <BouncyLetter key={letter + i} letter={letter} />
													})}
												</Link>
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

	shouldComponentUpdate(nextProps, nextState) {
		return this.props != nextProps || this.state != nextState
	}
}