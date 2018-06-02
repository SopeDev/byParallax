import React from 'react'
import Swipeable from 'react-swipeable'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export default class FlipperModule extends React.Component {
	constructor() {
		super()
		this.state = {
			currentImage: 0,
			flipDirection: "",
			flipping: false,
		}
		this._prevImage = this._prevImage.bind(this)
		this._nextImage = this._nextImage.bind(this)		
		this._followMouse = this._followMouse.bind(this)		
	}

	_prevImage(e) {
		if (!this.state.flipping) {
			this.setState({ flipDirection: "prev", flipping: true })
			setTimeout(()=>{
				if (this.state.currentImage > 0) {
					this.setState({ currentImage : this.state.currentImage - 1 })
				} else {
					this.setState({ currentImage : this.props.data.images.length - 1 })
				}
				setTimeout(()=>{ this.setState({ flipping: false }) }, 400)
			}, 50)
		}
	}

	_nextImage(e) {
		if (!this.state.flipping) {
			this.setState({ flipDirection: "next", flipping: true })
			setTimeout(()=>{
				if (this.state.currentImage < this.props.data.images.length - 1) {
					this.setState({ currentImage : this.state.currentImage + 1 })
				} else {
					this.setState({ currentImage : 0 })
				}
				setTimeout(()=>{ this.setState({ flipping: false }) }, 400)
			}, 50)
		}
	}

	_setImage(e, image) {
		if (!this.state.flipping) {
			const flipDirection = image > this.state.currentImage ? "next" : image < this.state.currentImage ? "prev" : ""
			this.setState({ flipDirection, flipping: true})
			setTimeout(()=>{
				this.setState({ currentImage : image })
				setTimeout(()=>{ this.setState({ flipping: false }) }, 400)
			}, 50)
		}
	}

	_followMouse(e) {
		const arrowX = e.clientX - e.target.offsetLeft - 20
		const arrowY = e.clientY - e.target.offsetTop - 20
		e.target.children[0].style.left = arrowX + "px"
		e.target.children[0].style.top = arrowY + "px"
	}

	render() {
		const { currentImage, flipDirection } = this.state
		const { data, currentModule } = this.props

		const navDots = data.images.map((image, i)=>{
			const currentClass = i == currentImage ? " current" : ""
			return <div key={data.key + "dot" + i} className={"nav-dot" + currentClass} onClick={(e)=>{this._setImage(e, i)}}></div>
		})

		const leftSwiperClass = currentImage > 0 ? "show" : ""
		const rightSwiperClass = currentImage < data.images.length - 1 ? currentImage == 0 ? "show first" : "show" : ""

		return (
			<div className={"module flipper-module" + currentModule} style={{ backgroundColor: data.background }}>
				<div className="flipper">
					<div className="flipper-container">
						<TransitionGroup>
							<CSSTransition
								key={data.key + currentImage}
								classNames='flip-image'
								timeout={400}
							>
								<div className={"flipper-image " + flipDirection} style={{backgroundImage: `url(${data.images[currentImage]})`}}></div>
							</CSSTransition>
						</TransitionGroup>
					</div>
					<div className="flipper-panel">
						<Swipeable
							onSwipedLeft={this._prevImage}
							onSwipedRight={this._nextImage}
						>
							<div className="left" onClick={this._prevImage} onMouseMove={this._followMouse}>
								<div className="arrow">
									<svg width="40px" height="40px">
										<mask id={"mask" + data.key + "flipper1"}>
											<circle cx="20px" cy="20px" r="20px" fill="white"></circle>
											<polyline fill="none" stroke="black" strokeWidth="1" points="22,12 15,20 22,28"></polyline>
										</mask>
										<circle mask={"url(#mask" + data.key + "flipper1)"} cx="20px" cy="20px" r="20px" fill="white"></circle>
									</svg>
								</div>
							</div>
							<div className="right" onClick={this._nextImage} onMouseMove={this._followMouse}>
								<div className="arrow">
									<svg width="40px" height="40px">
										<mask id={"mask" + data.key + "flipper2"}>
											<circle cx="20px" cy="20px" r="20px" fill="white"></circle>
											<polyline fill="none" stroke="black" strokeWidth="1" points="18,12 25,20 18,28"></polyline>
										</mask>
										<circle mask={"url(#mask" + data.key + "flipper2)"} cx="20px" cy="20px" r="20px" fill="white"></circle>
									</svg>
								</div>
							</div>
							<div className="nav-dots">
								<div className={"swipeable-left " + leftSwiperClass} onClick={this._prevImage}>
									<svg width="5px" height="10px">
										<polyline fill="none" stroke="#fff" strokeWidth="1" points="4.9,.1 .1,5 4.9,9.9"></polyline>
									</svg>
								</div>
									{navDots}
								<div className={"swipeable-right " + rightSwiperClass} onClick={this._nextImage}>
									<svg width="5px" height="10px">
										<polyline fill="none" stroke="#fff" strokeWidth="1" points=".1,.1 4.9,5 .1,9.9"></polyline>
									</svg>
								</div>
							</div>
						</Swipeable>
					</div>
				</div>
				<div className="flipper-text">
					<p>{data.text}</p>
				</div>
			</div>
		)
	}
}