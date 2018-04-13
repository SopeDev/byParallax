import React from 'react'
import { inject, observer } from 'mobx-react'
import { Motion, spring } from 'react-motion'

import Carousel from '../components/carousel/carousel'

import './styles/home.sass'

@inject('NavStore') @observer
export default class Home extends React.Component {
	render() {
		const { NavStore } = this.props

		const leaveAnimStyles = {
			scale: NavStore.totalScroll > 0 ? 1 - NavStore.totalScroll / 2000 : 1,
			opacity : 1 - NavStore.totalScroll / 100,
			canvasWidth: NavStore.totalScroll / 10 > 0 ? NavStore.totalScroll / 10 : 0
		}

		return (
			<Motion
				defaultStyle={{
					scale: NavStore.initLoad ? 0 : 1,
					opacity: 1,
					canvasWidth: NavStore.initLoad ? 10 : 0 
				}}
				style={{
					scale: spring( leaveAnimStyles.scale, {stiffness: 80, damping: 20} ),
					opacity: spring( leaveAnimStyles.opacity ),
					canvasWidth: spring( leaveAnimStyles.canvasWidth )
				}}
			>
				{(style) =>
					<div className="home">
						<div className="canvas">
							<div className="top" style={{ height: `${style.canvasWidth}vh` }}></div>
							<div className="bottom" style={{ height: `${style.canvasWidth}vh` }}></div>
							<div className="left" style={{ width: `${style.canvasWidth}vw` }}></div>
							<div className="right" style={{ width: `${style.canvasWidth}vw` }}></div>
						</div>
						<Carousel style={{
							scale: `${style.scale}`,
							opacity: `${style.opacity}`
						}}/>							
					</div>
				}
			</Motion>
		)
	}

	componentDidMount() {
		this.props.NavStore.prevRoute = null
		this.props.NavStore.nextRoute = "/Proyectos"
		setTimeout(()=>{
			this.props.NavStore.routing = false
		}, 500)
	}
}