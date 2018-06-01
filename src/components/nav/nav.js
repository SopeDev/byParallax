import React from 'react'
import { Link } from 'react-router-dom'
import { inject } from 'mobx-react'
import { Motion, StaggeredMotion, spring } from 'react-motion'

import BouncyLetter from '../bouncyLetter/bouncyLetter'

import './nav.sass'

@inject('CarouselStore', 'MediaStore')
export default class Nav extends React.Component {
	constructor() {
		super()
		this.state = {
			links: [
				"projects",
				"contact"
			],
			open: false,
			shown: false,
			mobile: window.innerWidth < 1200 ? true : false
		}
		this._handleMenu = this._handleMenu.bind(this)
		this._updateNavBackground = this._updateNavBackground.bind(this)
		this.videoBackground = React.createRef()
	}

	_handleMenu(origin) {
		if (this.state.open == false) {
			// this.videoBackground.current.play()
			if (origin != "home") {
				if (this.props.CarouselStore.disabled == false) {
					this.props.CarouselStore.stopCarousel()
				}
				this._togglePanel()
				setTimeout(()=>{
					this._toggleLinks()
				}, 500);
			}
		} else {
			this._toggleLinks()
			setTimeout(()=>{
				// this.videoBackground.current.pause()
				this._togglePanel()
				if (this.props.CarouselStore.disabled == false) {
					this.props.CarouselStore.startCarousel()
				}
			}, 500);
		}
	}

	_updateNavBackground() {
		// console.log(this.state.mobile)
		// console.log(window.innerWidth)
		if (this.state.mobile && window.innerWidth >= 1200) {
			this.setState({ mobile: false })
		} else if (!this.state.mobile && window.innerWidth < 1200) {
			this.setState({ mobile: true })
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
		const { open, shown, mobile } = this.state
		const { MediaStore, location } = this.props

		const navInvertClass = location == "/" || location == "/contact" || /\/projects\/[a-z]+/g.test(location) ? "" : " invert"
		const navPanelClass = open ? " collapsed" : "";

		const menuBackground = mobile ? (
			<div className="menu-background" style={{backgroundImage: `url(${MediaStore.menu[0]})`}}>
				<div className="overlay"></div>
			</div>
		) : (
			<div className="video-container">
				<video ref={this.videoBackground} poster={MediaStore.menu[1]} autoPlay loop>
					<source src={MediaStore.videos[0]} type="video/mp4"/>
				</video>
				<div className="overlay"></div>
			</div>
		)

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
							<img src={MediaStore.logo[0]} alt="Parallax Creative"/>
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
							{menuBackground}
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
												<Link to="/projects" onClick={ this._handleMenu }>
													{this.state.links[0].split('').map((letter, i)=>{
														return <BouncyLetter key={letter + i} letter={letter} />
													})}
												</Link>
											</span>
										</li>
										<li>
											<span style={{transform: `translateX(${styles[1].offset}px)`}}>
												<Link to="/contact" onClick={ this._handleMenu }>
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

	componentDidMount() {
		if (!this.state.mobile) { this.videoBackground.current.muted = true }
		window.addEventListener("resize", this._updateNavBackground)
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.props != nextProps || this.state != nextState
	}
}