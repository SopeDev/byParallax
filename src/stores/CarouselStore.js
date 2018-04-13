import { computed, observable } from 'mobx'

class CarouselStore {
	@observable interval
	@observable currentSlide = 0
	@observable disabled = true
	@observable stopped = true
	@observable slides = [{
		header: "This is slide 1 HEADER",
		text: "This is slide 1 text",
		background: "./images/slides/slide1.jpg"
	}, {
		header: "This is slide 2 HEADER",
		text: "This is slide 2 text",
		background: "./images/slides/slide2.jpg"
	}, {
		header: "This is slide 3 HEADER",
		text: "This is slide 3 text",
		background: "./images/slides/slide3.jpg"
	}, {
		header: "This is slide 4 HEADER",
		text: "This is slide 4 text",
		background: "./images/slides/slide4.jpg"
	}, {
		header: "This is slide 5 HEADER",
		text: "This is slide 5 text",
		background: "./images/slides/slide5.jpg"
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
			}, 6000)			
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