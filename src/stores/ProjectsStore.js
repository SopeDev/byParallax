import { observable } from 'mobx'
import MediaStore from './MediaStore'

class ProjectsStore {
	@observable currentProject = 0 
	@observable projects = [
		{
			key: "logos",
			title: "LogoTypes",
			tile: "rgb(25, 72, 128)",
			modules: [
				{
					structure: "cover",
					background: MediaStore.covers[6],
					startingPosition: 50,
					endingPosition: 50
				}, {
					structure: "story",
					key: "logostory1",
					slides: [
						{
							background: "#1a1a1a",
							content: [
								{
									type: "image",
									content: MediaStore.logos.story.logo1
								}
							]
						}
					]
				}, {
					structure: "story",
					key: "logostory2",
					slides: [
						{
							background: "#ddd",
							content: [
								{
									type: "image",
									content: MediaStore.logos.story.logo2
								}
							]
						}
					]
				}, {
					structure: "story",
					key: "logostory3",
					slides: [
						{
							background: "#da010a",
							content: [
								{
									type: "image",
									content: MediaStore.logos.story.logo3
								}
							]
						}
					]
				}, {
					structure: "story",
					key: "logostory4",
					slides: [
						{
							background: "#6a8500",
							content: [
								{
									type: "image",
									content: MediaStore.logos.story.logo4
								}
							]
						}
					]
				}, {
					structure: "story",
					key: "logostory5",
					slides: [
						{
							background: "#000",
							content: [
								{
									type: "image",
									content: MediaStore.logos.story.logo5
								}
							]
						}
					]
				}, {
					structure: "story",
					key: "logostory6",
					slides: [
						{
							background: "#002248",
							content: [
								{
									type: "image",
									content: MediaStore.logos.story.logo6
								}
							]
						}
					]
				}, {
					structure: "story",
					key: "logostory7",
					slides: [
						{
							background: "#047148",
							content: [
								{
									type: "image",
									content: MediaStore.logos.story.logo7
								}
							]
						}
					]
				}, {
					structure: "story",
					key: "logostory8",
					slides: [
						{
							background: "#000",
							content: [
								{
									type: "image",
									content: MediaStore.logos.story.logo8
								}
							]
						}
					]
				}, {
					structure: "story",
					key: "logostory9",
					slides: [
						{
							background: "#5992a6",
							content: [
								{
									type: "image",
									content: MediaStore.logos.story.logo9
								}
							]
						}
					]
				}, {
					structure: "story",
					key: "logostory10",
					slides: [
						{
							background: "#162c68",
							content: [
								{
									type: "image",
									content: MediaStore.logos.story.logo10
								}
							]
						}
					]
				}, {
					structure: "story",
					key: "logostory11",
					slides: [
						{
							background: "#202020",
							content: [
								{
									type: "image",
									content: MediaStore.logos.story.logo11
								}
							]
						}
					]
				}, {
					structure: "story",
					key: "logostory12",
					slides: [
						{
							background: "#a00000",
							content: [
								{
									type: "image",
									content: MediaStore.logos.story.logo12
								}
							]
						}
					]
				}, {
					structure: "story",
					key: "logostory13",
					slides: [
						{
							background: "#ddd",
							content: [
								{
									type: "image",
									content: MediaStore.logos.story.logo13
								}
							]
						}
					]
				}, {
					structure: "story",
					key: "logostory14",
					slides: [
						{
							background: "#202020",
							content: [
								{
									type: "image",
									content: MediaStore.logos.story.logo14
								}
							]
						}
					]
				}, {
					structure: "story",
					key: "logostory15",
					slides: [
						{
							background: "#000",
							content: [
								{
									type: "image",
									content: MediaStore.logos.story.logo15
								}
							]
						}
					]
				}
			]
		},
		{
			key: "photo",
			title: "Photography",
			tile: "rgb(254, 133, 0)",
			modules: [
				{
					structure: "cover",
					background: MediaStore.covers[5],
					startingPosition: 31,
					endingPosition: 33
				}
			]
		},
		{
			key: "s55",
			title: "Spanish55",
			tile: "rgb(0, 116, 187)",
			modules: [
				{
					structure: "cover",
					background: MediaStore.covers[4],
					startingPosition: 38.5,
					endingPosition: 42
				}
			]
		},
		{
			key: "ios",
			title: "iOS Christian Rooms",
			tile: "rgb(30, 30, 30)",
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
		},
		{
			key: "yha",
			title: "Your Holistic Advocate",
			tile: "rgb(37, 66, 171)",
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
		},
		{
			key: "aquelarre",
			title: "Aquelarre",
			tile: "rgb(215, 170, 165)",
			modules: [
				{
					structure: "cover",
					background: MediaStore.covers[2],
					startingPosition: 50,
					endingPosition: 50
				}
			]
		},
		{
			key: "julian",
			title: "Dr. Julian Hernandez",
			tile: "rgb(25, 128, 117)",
			modules: [
				{
					structure: "cover",
					background: MediaStore.covers[3],
					startingPosition: 75,
					endingPosition: 62
				}
			]
		},
		{
			key: "provita",
			title: "Provita",
			tile: "rgb(39, 205, 147)",
			modules: [
				{
					structure: "cover",
					background: MediaStore.covers[7],
					startingPosition: 50,
					endingPosition: 50
				}
			]
		}
	]

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