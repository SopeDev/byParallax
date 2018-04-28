import { observable } from 'mobx'

class NavStore {
	resetTotalScroll = null
	
	@observable initLoad = false
	@observable prevRoute = null
	@observable nextRoute = null
	@observable routing = false
	@observable totalScroll = 0

	handleScroll(e) {
		const scrollValue = this.totalScroll + e.deltaY / 2

		if (scrollValue > -100 && scrollValue < 100) {
			this.totalScroll = scrollValue
		} else {
			this.totalScroll = scrollValue >= 100 ? 100 : -100
		}

		clearTimeout(this.resetTotalScroll)
		this.resetTotalScroll = setTimeout(()=>{
			this.totalScroll = 0
		}, 500)
	}

	enableRouting() {
		this.routing = true
	}
}

export default new NavStore