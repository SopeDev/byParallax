import React from 'react'
import { computed, observable } from 'mobx'

import slide1 from '../images/slides/slide1.jpg'
import slide2 from '../images/slides/slide2.jpg'
import slide3 from '../images/slides/slide3.jpg'
import slide4 from '../images/slides/slide4.jpg'
import slide5 from '../images/slides/slide5.jpg'

class CarouselStore {
	@observable interval
	@observable intervalTime = 6000
 	@observable currentSlide = 0
	@observable disabled = true
	@observable stopped = true
	@observable slides = [{
		key: 0,
		header: "This is slide 1 HEADER",
		text: "This is slide 1 text",
		background: slide1
	}, {
		key: 1,
		header: "This is slide 2 HEADER",
		text: "This is slide 2 text",
		background: slide2
	}, {
		key: 2,
		header: "This is slide 3 HEADER",
		text: "This is slide 3 text",
		background: slide3
	}, {
		key: 3,
		header: "This is slide 4 HEADER",
		text: "This is slide 4 text",
		background: slide4
	}, {
		key: 4,
		header: "This is slide 5 HEADER",
		text: "This is slide 5 text",
		background: slide5
	}]

	@computed get nextSlide() {
		return this.currentSlide == this.slides.length - 1 ? 0 : this.currentSlide + 1
	}

	enableCarousel() {
		this.disabled = false
	}

	disableCarousel() {
		this.disabled = true
	}

	startCarousel() {
		if (this.stopped == true) {
			this.stopped = false;
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