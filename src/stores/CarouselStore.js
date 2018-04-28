import React from 'react'
import { observable } from 'mobx'

import slide1 from '../images/slides/slide1.jpg'
import slide2 from '../images/slides/slide2.jpg'
import slide3 from '../images/slides/slide3.jpg'
import slide4 from '../images/slides/slide4.jpg'
import slide5 from '../images/slides/slide5.jpg'
import slide6 from '../images/slides/slide6.jpg'

class CarouselStore {
	@observable interval
	@observable intervalTime = 4000
 	@observable currentSlide = 0
	@observable disabled = true
	@observable stopped = true
	@observable slides = [{
		key: 0,
		spanBefore: "We are ",
		header: "Parallax",
		spanAfter: null,
		subHeader: null,
		background: slide1
	}, {
		key: 1,
		spanBefore: "We are ",
		header: "Parallax",
		spanAfter: null,
		subHeader: null,
		background: slide2
	}, {
		key: 2,
		spanBefore: "We are ",
		header: "Parallax",
		spanAfter: null,
		subHeader: null,
		background: slide3
	}, {
		key: 3,
		spanBefore: "We are ",
		header: "Parallax",
		spanAfter: null,
		subHeader: null,
		background: slide4
	}, {
		key: 4,
		spanBefore: "We are ",
		header: "Parallax",
		spanAfter: null,
		subHeader: null,
		background: slide5
	}]

	enableCarousel() {
		this.disabled = false
	}

	disableCarousel() {
		this.disabled = true
	}

	startCarousel() {
		if (this.stopped == true) {
			this.stopped = false
			this.interval = setInterval(()=>{
				this.currentSlide = this.currentSlide < this.slides.length - 1 ? this.currentSlide + 1 : 0
			}, this.intervalTime)			
		}
	}

	stopCarousel() {
		if (this.stopped == false) {
			this.stopped = true
			clearInterval(this.interval)
		}
	}
}

export default new CarouselStore