import React from 'react'
import { StaggeredMotion, spring } from 'react-motion'
import { inject } from 'mobx-react'

let Preload = require('react-preloaded').Preload;

import './initAnimation.sass'

@inject('MediaStore')
export default class InitAnimation extends React.Component {
	render() {
		const { logo, menu, slides, thumbnails, covers, contact } = this.props.MediaStore
		let images = []

		logo.map((logo)=>{ images.push(logo) })
		menu.map((menu)=>{ images.push(menu) })
		slides.map((slide)=>{ images.push(slide) })
		covers.map((cover)=>{ images.push(cover) })
		contact.map((contact)=>{ images.push(contact) })
		
		const loadingIndicator = (
			<div className="pre-logo-container">
				<img src={ logo } alt=""/>
			</div>
		)

		return (
			<div id="pre-loader">
				<Preload
					loadingIndicator={loadingIndicator}
					images={images} 
					onSuccess={()=>{ this.props.renderLayout() }}
				>
					{
						<div>
							<StaggeredMotion
								defaultStyles={[
									{ opacity: 0 },
									{ opacity: 0 },
									{ opacity: 0 },
									{ opacity: 0 },
									{ opacity: 0 }
								]}
								styles={(prevStyles) => [
									{ opacity: spring(1) },
									{ opacity: spring(prevStyles[0].opacity) },
									{ opacity: spring(prevStyles[1].opacity) },
									{ opacity: spring(prevStyles[2].opacity) },
									{ opacity: spring(prevStyles[3].opacity) }
								]}
							>
								{(styles) =>
									<div className="background-images-container">
										<div className="animation-background" style={{ opacity: `${styles[0].opacity}`, backgroundImage: `url(${slides[0]})` }}></div>
										<div className="animation-background" style={{ opacity: `${styles[2].opacity}`, backgroundImage: `url(${slides[1]})` }}></div>
										<div className="animation-background" style={{ opacity: `${styles[4].opacity}`, backgroundImage: `url(${slides[2]})` }}></div>
									</div>
								}
							</StaggeredMotion>				
							<StaggeredMotion
								defaultStyles={[
									{ width: 100 },
									{ width: 0 }
								]}
								styles={(prevStyles) => [
									{ width: spring(0, {stiffness: 70, damping: 20}) },
									{ width: spring(100 - prevStyles[0].width, {stiffness: 70, damping: 20}) }
								]}
							>
								{(styles) =>
									<div className="curtains">
										<div className="curtain-first" style={{
											width: `${styles[1].width}%`
										}}></div>
										<div className="curtain-second" style={{
											width: `${styles[0].width}%`
										}}></div>
									</div>
								}
							</StaggeredMotion>
							<div className="pre-logo-container">
								<img src={ logo[0] } alt=""/>
							</div>
						</div>
					}
				</Preload>
			</div>
		)
	}
}
								// defaultStyles={[
								// 	{
								// 		width: mobile ? 100 : 100,
								// 		top: mobile ? 0 : 0,
								// 		right: mobile ? 0 : 0,
								// 		height: mobile ? 100 : 100
								// 	}, {
								// 		width: mobile ? 0 : 0,
								// 		top: mobile ? 0 : 0,
								// 		left: mobile ? 0 : 0,
								// 		height: mobile ? 100 : 100
								// 	}
								// ]}
								// styles={(prevStyles) => [
								// 	{
								// 		width: mobile ? spring(0, {stiffness: 70, damping: 20}) : spring(0, {stiffness: 70, damping: 20}),
								// 		top: mobile ? 0 : 0,
								// 		right: mobile ? 0 : 0,
								// 		height: mobile ? 100 : 100
								// 	}, {
								// 		width: mobile ? spring(100 - prevStyles[0].width, {stiffness: 70, damping: 20}) : spring(100 - prevStyles[0].width, {stiffness: 70, damping: 20}),
								// 		top: mobile ? 0 : 0,
								// 		left: mobile ? 0 : 0,
								// 		height: mobile ? 100 : 100
								// 	}
								// ]}