import { observable } from 'mobx'
import MediaStore from './MediaStore'

class ProjectsStore {
	@observable currentProject = 0 
	@observable projects = [{
		key: "s55",
		title: "Spanish55",
		tile: {
			thumbnail: MediaStore.thumbnails[4],
			backgroundColor: "rgb(0, 116, 187)"	
		},
		modules: [
			{
				structure: "cover",
				background: MediaStore.covers[4],
				startingPosition: 38.5,
				endingPosition: 42
			}
		]
	}, {
		key: "ios",
		title: "iOS Christian Rooms",
		tile: {
			thumbnail: MediaStore.thumbnails[0],
			backgroundColor: "rgb(30, 30, 30)"
		},
		modules: [
			{
				structure: "cover",
				background: MediaStore.covers[0],
				startingPosition: 50,
				endingPosition: 50
			},{
				structure: "story",
				key: "iosstory",
				slides: [
					{
						background: "url(" + MediaStore.ios.story.iosstory1 + ") no-repeat center / cover",
						content: [
							{
								type: "empty",
								content: ""
							}, {
								type: "text",
								content: [
									{
										type: "p",
										content: "With the energy and good intention of cohousing, we created the identity for iOS Christian Rooms."
									}
								]
							}
						],
						customClass: "align-background-left"

					}, {
						background: "rgb(0, 0, 0)",
						content: [
							{
								type: "text",
								content: [
									{
										type: "p",
										content: "A clear and sensitive proposal that integrates the spiritual character of the group with its modern infrastructure and concept."
									}
								]
							}, {
								type: "image",
								content: MediaStore.ios.story.iosstory2,
								customClass: "separate-left"

							}
						]
					}, {
						background: "url(" + MediaStore.ios.story.iosstory3 + ") no-repeat center / cover",
						content: []
					}
				]
			},{
				structure: "video",
				url: MediaStore.videos[0]
			}
		]
	}, {
		key: "yha",
		title: "Your Holistic Advocate",
		tile: {
			thumbnail: MediaStore.thumbnails[1],
			backgroundColor: "rgb(37, 66, 171)"	
		},
		modules: [
			{
				structure: "cover",
				background: MediaStore.covers[1],
				startingPosition: 100,
				endingPosition: 75
			},{
				structure: "story",
				key: "yhastory",
				slides: [
					{
						background: "rgb(26, 165, 193)",
						content: [
							{
								type: "image",
								content: MediaStore.yha.story.yhastory1,
								customClass: "feature-image"
							}, {
								type: "text",
								content: [
									{
										type: "p",
										content: "Unifying modern medicine and homepoathy, accompanied by the best specialist."
									}
								]
							}
						]
					}, {
						background: "rgb(25, 61, 126)",
						content: [
							{
								type: "image",
								content: MediaStore.yha.story.yhastory2
							}, {
								type: "text",
								content: [
									{
										type: "h1",
										content: "Medical"
									}, {
										type: "h1",
										content: "Investigation",
										customClass: "light-header"
									}
								]
							}
						]
					}, {
						background: "rgb(25, 61, 126)",
						content: [
							{
								type: "image",
								content: MediaStore.yha.story.yhastory3
							}, {
								type: "text",
								content: [
									{
										type: "h1",
										content: "Spiritual"
									}, {
										type: "h1",
										content: "Connection",
										customClass: "light-header"
									}
								]
							}
						]
					}, {
						background: "rgb(25, 61, 126)",
						content: [
							{
								type: "image",
								content: MediaStore.yha.story.yhastory4
							}
						]
					}, {
						background: "rgb(25, 61, 126)",
						content: [
							{
								type: "image",
								content: MediaStore.yha.story.yhastory5
							}
						]
					}, {
						background: "url(" + MediaStore.yha.story.yhastory6 + ") no-repeat center / cover",
						content: []
					}
				]
			}, {
				structure: "flipper",
				key: "yhaflipper",
				background: "rgb(19, 96, 98)",
				images: [
					MediaStore.yha.flipper.yhaflipper1,
					MediaStore.yha.flipper.yhaflipper2,
					MediaStore.yha.flipper.yhaflipper3
				],
				text: "We built a brand capable of connecting us to the essence of complemetary as well as modern allopathic medicine."
			}
		]
	}, {
		key: "aquelarre",
		title: "Aquelarre",
		tile: {
			thumbnail: MediaStore.thumbnails[2],
			backgroundColor: "rgb(215, 170, 165)"	
		},
		modules: [
			{
				structure: "cover",
				background: MediaStore.covers[2],
				startingPosition: 50,
				endingPosition: 50
			}
		]
	}, {
		key: "photo",
		title: "Photography",
		tile: {
			thumbnail: MediaStore.thumbnails[5],
			backgroundColor: "rgb(254, 133, 0)"	
		},
		modules: [
			{
				structure: "cover",
				background: MediaStore.covers[5],
				startingPosition: 32,
				endingPosition: 36
			}
		]
	}, {
		key: "julian",
		title: "Dr. Julian Hernandez",
		tile: {
			thumbnail: MediaStore.thumbnails[3],
			backgroundColor: "rgb(25, 128, 117)"	
		},
		modules: [
			{
				structure: "cover",
				background: MediaStore.covers[3],
				startingPosition: 75,
				endingPosition: 62
			}
		]
	}, {
		key: "logos",
		title: "LogoTypes",
		tile: {
			thumbnail: MediaStore.thumbnails[6],
			backgroundColor: "rgb(25, 72, 128)"	
		},
		modules: [
			{
				structure: "cover",
				background: MediaStore.covers[6],
				startingPosition: 50,
				endingPosition: 50
			}
		]
	}, {
		key: "provita",
		title: "Provita",
		tile: {
			thumbnail: MediaStore.thumbnails[7],
			backgroundColor: "rgb(39, 205, 147)"	
		},
		modules: [
			{
				structure: "cover",
				background: MediaStore.covers[7],
				startingPosition: 50,
				endingPosition: 50
			},{
				structure: "video",
				url: ""
			}
		]
	}]

	prevProject() {
		if (this.currentProject > 0) {
			this.currentProject = this.currentProject - 1 
		}
	}

	nextProject() {
		if (this.currentProject < this.projects.length - 1) {
			this.currentProject = this.currentProject + 1 
		}
	}

	setProject(project) {
		this.currentProject = project
	}
}

export default new ProjectsStore