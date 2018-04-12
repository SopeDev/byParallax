import React from 'react'
import { inject, observer } from 'mobx-react'

import Slide from './slide'

import './carousel.sass'

@inject('CarouselStore') @observer
export default class Carousel extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillMount() {
		const { CarouselStore } = this.props

		CarouselStore.enableCarousel()
		CarouselStore.startCarousel()
	}

	render() {
		const { currentSlide, slides } = this.props.CarouselStore
		const { scale, opacity} = this.props.style

		const slide = <Slide 
			header={slides[currentSlide].header}
			text={slides[currentSlide].text}
			background={slides[currentSlide].background}
		/>


		return (
			<div className="carousel" style={{
				transform: `scale(${scale})`,
				opacity: `${opacity}`
			}}>
				{slide}
			</div>
		)
	}

	componentWillUnmount() {
		const { CarouselStore } = this.props

		CarouselStore.disableCarousel()
		CarouselStore.stopCarousel()
	}
}