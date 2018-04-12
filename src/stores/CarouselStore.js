import { computed, observable } from 'mobx'

class CarouselStore {
	@observable interval
	@observable currentSlide = 0
	@observable disabled = true
	@observable stopped = true
	@observable slides = [{
		header: "This is slide 1 HEADER",
		text: "This is slide 1 text",
		background: "./images/slide1.jpg"
	}, {
		header: "This is slide 2 HEADER",
		text: "This is slide 2 text",
		background: "./images/slide2.jpg"
	}]

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
			}, 3000)			
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