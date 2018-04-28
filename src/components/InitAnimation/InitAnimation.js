import React from 'react'
import { Transition, CSSTransition } from 'react-transition-group'
import { StaggeredMotion, Motion, spring } from 'react-motion'

import logo from '../../images/logo-white.png'
import slide1 from '../../images/slides/slide1.jpg'
import slide2 from '../../images/slides/slide2.jpg'
import slide3 from '../../images/slides/slide3.jpg'

import './initAnimation.sass'

export default class InitAnimation extends React.Component {
	render() {
		return (
			<div id="pre-loader">
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
							<div className="animation-background" style={{ opacity: `${styles[0].opacity}`, backgroundImage: `url(${slide1})` }}></div>
							<div className="animation-background" style={{ opacity: `${styles[2].opacity}`, backgroundImage: `url(${slide2})` }}></div>
							<div className="animation-background" style={{ opacity: `${styles[4].opacity}`, backgroundImage: `url(${slide3})` }}></div>
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
						{ width: spring(100 - prevStyles[0].width, {stiffness: 70, damping: 20}) },
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
					<img src={ logo } alt=""/>
				</div>
			</div>
		)
	}
}