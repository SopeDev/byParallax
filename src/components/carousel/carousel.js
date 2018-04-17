import React from 'react'
import { inject, observer } from 'mobx-react'
import { Motion, spring, TransitionMotion } from 'react-motion'

import Slide from './slide'

import './carousel.sass'

@inject('CarouselStore') @observer
export default class Carousel extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currentSlide: props.CarouselStore.currentSlide,
			next: props.CarouselStore.nextSlide
		}
	}

	componentWillMount() {
		const { CarouselStore } = this.props

		CarouselStore.enableCarousel()
		CarouselStore.startCarousel()
	}

	render() {
		const { currentSlide, nextSlide, slides } = this.props.CarouselStore
		const { scale, opacity } = this.props.style

		const carrouselSlides = slides.map((slide) => {
			const activeSlideClass = slide.key == currentSlide ? " active" : ""

			return <div key={slide.key} className={"slide-background" + activeSlideClass} style={{ backgroundImage: `url('${slide.background}')` }}></div>
		})

		let textAnimationClass = " entering"
		setTimeout(()=>{
			textAnimationClass = " leaving"
		})

		console.log("carousel is rendering")

		return (
			<div className="carousel" style={{
				transform: `scale(${scale})`,
				opacity: `${opacity}`
			}}>
				<div className="slider">
					<div className="background-container">
						{ carrouselSlides }
					</div>

					<TransitionMotion
						willEnter={() => ({width: 100, left: 0})} // triggered by key3
						willLeave={() => ({width: spring(100), left: 0})} // triggered by key2
						// defaultStyles={[
						// 	{key: 'slide' + currentSlide, data: { slide: currentSlide }, style: {width: 0, left: 0}}
						// ]}
						styles={[
							{key: 'slide' + currentSlide, data: { slide: currentSlide }, style: {width: spring(0), left: spring(100)}}
						]}
					>
						{ values =>
							<div>
								{values.map(({key, data, style}) =>
									<div key={key} className={"header-container " + key}>
										<div className="header-overlay" style={{width: `${style.width}%`, left: `${style.left}%`}}></div>
										<h1 className="slide-header">{slides[data.slide].header}</h1>
									</div>
								)}
							</div>
						}
					</TransitionMotion>

					<div className="text-container">
						<div className={"text-overlay" + textAnimationClass}></div>
						<p className="slide-text">{slides[currentSlide].text}</p>
					</div>
				</div>
			</div>
		)
	}

	componentDidUpdate(prevProps) {
		if (prevProps.CarouselStore.currentSlide != this.state.currentSlide) {
			this.setState({
				currentSlide: prevProps.CarouselStore.currentSlide,
				nextSlide: prevProps.CarouselStore.currentSlide
			})
		}
	}

	componentWillUnmount() {
		const { CarouselStore } = this.props

		CarouselStore.disableCarousel()
		CarouselStore.stopCarousel()
	}
}