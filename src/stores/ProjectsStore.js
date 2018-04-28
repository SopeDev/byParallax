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
	@observable projects = [{
		key: "ios",
		title: "iOS Christian Rooms",
		tile: {
			thumbnail: thumbnail1,
			backgroundColor: "rgb(30, 30, 30)"
		},
		modules: [
			{
				structure: "cover",
				image: thumbnail1
			},{
				structure: "video",
				url: ""
			},{
				structure: "brief",
				url: ""
			}
		]
	}, {
		key: "yha",
		title: "Your Holistic Advocate",
		tile: {
			thumbnail: thumbnail2,
			backgroundColor: "rgb(37, 66, 171)"	
		},
		modules: [
			{
				structure: "cover",
				image: thumbnail2
			},{
				structure: "video",
				url: ""
			}
		]
	}, {
		key: "moblum",
		title: "Moblum",
		tile: {
			thumbnail: thumbnail3,
			backgroundColor: "rgb(215, 170, 165)"	
		},
		modules: [
			{
				structure: "cover",
				image: thumbnail3
			},{
				structure: "video",
				url: ""
			}
		]
	}, {
		key: "julian",
		title: "Dr. Julian Hernandez",
		tile: {
			thumbnail: thumbnail4,
			backgroundColor: "rgb(25, 128, 117)"	
		},
		modules: [
			{
				structure: "video",
				url: ""
			}
		]
	}, {
		key: "s55",
		title: "Spanish55",
		tile: {
			thumbnail: thumbnail5,
			backgroundColor: "rgb(0, 116, 187)"	
		},
		modules: [
			{
				structure: "video",
				url: ""
			}
		]
	}, {
		key: "food",
		title: "Food Photography",
		tile: {
			thumbnail: thumbnail6,
			backgroundColor: "rgb(254, 133, 0)"	
		},
		modules: [
			{
				structure: "brief",
				header: "This is Food header",
				text: [
					"This is text 1 for Food",
					"This is text 2 for Food",
					"This is text 3 for Food"
				]
			}
		]
	}, {
		key: "corp",
		title: "Foto Corporativa",
		tile: {
			thumbnail: thumbnail7,
			backgroundColor: "rgb(25, 72, 128)"	
		},
		modules: [
			{
				structure: "brief",
				header: "This is Foto header",
				text: [
					"This is text 1 for Foto",
					"This is text 2 for Foto",
				]
			}
		]
	}, {
		key: "provita",
		title: "Provita",
		tile: {
			thumbnail: thumbnail8,
			backgroundColor: "rgb(39, 205, 147)"	
		},
		modules: [
			{
				structure: "video",
				url: ""
			}
		]
	}]
}

export default new ProjectsStore