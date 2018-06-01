import React from 'react'
import { observable } from 'mobx'
import MediaStore from './MediaStore'

class CarouselStore {
	interval = null
	intervalTime = 4000
 	@observable currentSlide = 0
	@observable disabled = true
	@observable stopped = true
	slides = [{
		key: 0,
		spanBefore: "We are ",
		header: "Parallax",
		spanAfter: null,
		subHeader: null,
		background: MediaStore.slides[0]
	}, {
		key: 1,
		spanBefore: "We are ",
		header: "Parallax",
		spanAfter: null,
		subHeader: null,
		background: MediaStore.slides[1]
	}, {
		key: 2,
		spanBefore: "We are ",
		header: "Parallax",
		spanAfter: null,
		subHeader: null,
		background: MediaStore.slides[2]
	}, {
		key: 3,
		spanBefore: "We are ",
		header: "Parallax",
		spanAfter: null,
		subHeader: null,
		background: MediaStore.slides[3]
	}, {
		key: 4,
		spanBefore: "We are ",
		header: "Parallax",
		spanAfter: null,
		subHeader: null,
		background: MediaStore.slides[4]
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