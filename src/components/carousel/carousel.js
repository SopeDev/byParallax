import React from 'react'
import { inject, observer } from 'mobx-react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import './carousel.sass'

@inject('CarouselStore') @observer
export default class Carousel extends React.Component {
	componentWillMount() {
		const { CarouselStore } = this.props

		CarouselStore.enableCarousel()
		CarouselStore.startCarousel()
	}

	render() {
		const { currentSlide, slides, stopped } = this.props.CarouselStore
		const { scale, opacity } = this.props.style

		const loadingBarClass = stopped ? "stopped" : "active"

		return (
			<div className="carousel" style={{
				transform: `scale(${scale})`,
				opacity: `${opacity}`
			}}>
				<div className="slider">
					<TransitionGroup>
						<CSSTransition
							key={"slide-background" + currentSlide}
							classNames='slide-background'
							timeout={750}
						>
							<div className="background-container">
								<div className="slide-background" style={{ backgroundImage: `url('${slides[currentSlide].background}')` }}></div>
							</div>
						</CSSTransition>
					</TransitionGroup>
					<TransitionGroup>
						<CSSTransition
							key={"slide" + currentSlide}
							classNames='slide'
							timeout={1000}
						>
							<div className={"slide-info slide" + currentSlide}>
								<div className="header-container">
									<div className="header-overlay"></div>
									<h1 className="slide-header">
										{slides[currentSlide].spanBefore ? <span>{slides[currentSlide].spanBefore}</span> : null}
										{slides[currentSlide].header}
										{slides[currentSlide].spanAfter ? <span>{slides[currentSlide].spanAfter}</span> : null}
									</h1>
								</div>
							</div>
						</CSSTransition>
					</TransitionGroup>
					<div key={"slide" + currentSlide + "loadingBar" + loadingBarClass} className={"slide-loader " + loadingBarClass}></div>
				</div>
			</div>
		)
	}

	componentWillUnmount() {
		const { CarouselStore } = this.props

		CarouselStore.disableCarousel()
		CarouselStore.stopCarousel()
	}
}