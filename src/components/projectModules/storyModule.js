import React from 'react'
import Swipeable from 'react-swipeable'

export default class StoryModule extends React.Component {
	constructor() {
		super()
		this.state = {
			currentSlide: 0
		}
		this._prevSlide = this._prevSlide.bind(this)
		this._nextSlide = this._nextSlide.bind(this)
	}

	_prevSlide() {
		if (this.state.currentSlide > 0) {
			this.setState({ currentSlide : this.state.currentSlide - 1 })
		}
	}

	_nextSlide() {
		if (this.state.currentSlide < this.props.data.slides.length - 1) {
			this.setState({ currentSlide : this.state.currentSlide + 1 })
		}
	}

	_setSlide(slide) {
		this.setState({ currentSlide : slide })
	}

	_followMouse(e) {
		const arrowX = e.clientX - e.target.offsetLeft - 40
		const arrowY = e.clientY - e.target.offsetTop - 40
		e.target.children[0].style.left = arrowX + "px"
		e.target.children[0].style.top = arrowY + "px"
	}

	_resetArrow(e) {
		const target = e.target.children[0]
		target.style.transform = "scale(0)"
		setTimeout(()=>{
			target.style.transform = "scale(1)"
			target.style.top = "21.5vh"
			target.style.left = "13vw"
		}, 250)
	}

	render() {
		const { currentSlide } = this.state
		const { data, currentModule } = this.props

		const slides = data.slides.map((slide, i)=>{
			const currentClass = i == currentSlide ? " current" : ""
			const customClass = slide.customClass ? slide.customClass : ""
			const content = slide.content.map((content, i)=>{
				switch(content.type) {
					case "image":
						const customClass = content.customClass ? content.customClass : ""
						return <div key={data.key + content.type + i} className={"slide-image " + customClass}><img src={content.content} alt=""/></div>
						break;
					case "text":
						const textContent = content.content.map((text, i)=>{
							const customClass = text.customClass ? text.customClass : ""
							switch(text.type) {
								case "p":
								return <p key={data.key + text.type + i} className={customClass}>{text.content}</p>
								break;
								case "h1":
								return <h1 key={data.key + text.type + i} className={customClass}>{text.content}</h1>
							}
						})
						return <div key={data.key + content.type + i} className="slide-text">{textContent}</div>
						break;
					case "empty":
						return <div key={data.key + content.type + i} className="empty"></div>
						break;
				}
			})
			return (
				<div key={data.key + i} className={"story-slide" + currentClass + " " + customClass} style={{background: slide.background}}>
					{content}
				</div>
			)
		})

		const navDots = data.slides.map((slide, i)=>{
			const currentClass = i == currentSlide ? " current" : ""
			return <div key={data.key + "dot" + i} className={"nav-dot" + currentClass} onClick={()=>{this._setSlide(i)}}></div>
		})

		const firstArrowClass = currentSlide == 0 ? " hide" : ""
		const lastArrowClass = currentSlide == data.slides.length - 1 ? " hide" : ""
		const leftSwiperClass = currentSlide > 0 ? "show" : ""
		const rightSwiperClass = currentSlide < data.slides.length - 1 ? currentSlide == 0 ? "show first" : "show" : ""

		return (
			<div className={"module story-module" + currentModule}>
				<Swipeable
					onSwipedLeft={this._nextSlide}
					onSwipedRight={this._prevSlide}
				>
					<div className="slides-container">
						{slides}
					</div>
					<div className="slide-navigation">
						<div className={"left-container" + firstArrowClass} onClick={this._prevSlide} onMouseMove={this._followMouse} onMouseLeave={this._resetArrow}>
							<div className="arrow">
								<svg width="80px" height="80px">
									<mask id={"mask" + data.key + "story1"}>
										<circle cx="40px" cy="40px" r="40px" fill="white"></circle>
										<polyline fill="none" stroke="black" strokeWidth="1" points="42,28 32,40 42,52"></polyline>
									</mask>
									<circle mask={"url(#mask" + data.key + "story1)"} cx="40px" cy="40px" r="40px" fill="white"></circle>
								</svg>
							</div>
						</div>
						<div className={"right-container" + lastArrowClass} onClick={this._nextSlide} onMouseMove={this._followMouse} onMouseLeave={this._resetArrow}>
							<div className="arrow">
								<svg width="80px" height="80px">
									<mask id={"mask" + data.key + "story2"}>
										<circle cx="40px" cy="40px" r="40px" fill="white"></circle>
										<polyline fill="none" stroke="black" strokeWidth="1" points="38,28 48,40 38,52"></polyline>
									</mask>
									<circle mask={"url(#mask" + data.key + "story2)"} cx="40px" cy="40px" r="40px" fill="white"></circle>
								</svg>
							</div>
						</div>
						<div className="nav-dots">
							<div className={"swipeable-left " + leftSwiperClass} onClick={this._prevSlide}>
								<svg width="5px" height="10px">
									<polyline fill="none" stroke="#fff" strokeWidth="1" points="5,0 0,5 5,10"></polyline>
								</svg>
							</div>
							{navDots}
							<div className={"swipeable-right " + rightSwiperClass} onClick={this._nextSlide}>
								<svg width="5px" height="10px">
									<polyline fill="none" stroke="#fff" strokeWidth="1" points="0,0 5,5 0,10"></polyline>
								</svg>
							</div>
						</div>
					</div>
				</Swipeable>
			</div>
		)
	}
}