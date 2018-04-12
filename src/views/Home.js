import React from 'react'
import { inject, observer } from 'mobx-react'
import { Motion, spring } from 'react-motion'

import Carousel from '../components/carousel/carousel'

import './styles/home.sass'

@inject('NavStore') @observer
export default class Home extends React.Component {
	componentDidMount() {
		this.props.NavStore.prevRoute = null
		this.props.NavStore.nextRoute = "/Proyectos"
		setTimeout(()=>{
			this.props.NavStore.routing = false
		}, 500)

	}

	render() {
		const { NavStore } = this.props

		const leaveAnimStyles = {
			scale: NavStore.totalScroll > 0 ? 1 - NavStore.totalScroll / 2000 : 1,
			opacity : 1 - NavStore.totalScroll / 200,
			canvasWidth: NavStore.totalScroll / 10
		}

		return (
			<div className="home">
				<Motion
					style={{
						scale: spring( leaveAnimStyles.scale ),
						opacity: spring( leaveAnimStyles.opacity ),
						canvasWidth: spring( leaveAnimStyles.canvasWidth )
					}}
				>
					{(style) =>
						<div>
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
			</div>
		)
	}
}