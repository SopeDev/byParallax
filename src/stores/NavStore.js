import { observable } from 'mobx'

class NavStore {
	resetTotalScroll = null
	
	@observable prevRoute = null
	@observable nextRoute = null
	@observable routing = false
	@observable totalScroll = 0

	handleScroll(e) {
		this.totalScroll = this.totalScroll + e.deltaY / 2

		clearTimeout(this.resetTotalScroll)
		this.resetTotalScroll = setTimeout(()=>{
			this.totalScroll = 0
		}, 250)
	}

	enableRouting() {
		this.routing = true
		this.totalScroll = 0
	}
}

export default new NavStore