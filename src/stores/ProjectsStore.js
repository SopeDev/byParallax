import { computed, observable } from 'mobx'

import thumbnail1 from '../images/projects/ios/thumbnail.jpg'
import thumbnail2 from '../images/projects/yha/thumbnail.jpg'
import thumbnail3 from '../images/projects/moblum/thumbnail.jpg'
import thumbnail4 from '../images/projects/julian/thumbnail.jpg'
import thumbnail5 from '../images/projects/s55/thumbnail.jpg'
import thumbnail6 from '../images/projects/food/thumbnail.jpg'
import thumbnail7 from '../images/projects/corp/thumbnail.jpg'
import thumbnail8 from '../images/projects/provita/thumbnail.jpg'

class ProjectsStore {
	@observable projects = {
		ios: {
			thumbnail: thumbnail1	
		},
		yha: {
			thumbnail: thumbnail2	
		},
		moblum: {
			thumbnail: thumbnail3	
		},
		julian: {
			thumbnail: thumbnail4	
		},
		s55: {
			thumbnail: thumbnail5	
		},
		food: {
			thumbnail: thumbnail6	
		},
		corp: {
			thumbnail: thumbnail7	
		},
		provita: {
			thumbnail: thumbnail8	
		}
	}
}

export default new ProjectsStore