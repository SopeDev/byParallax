import React from 'react'
import { Motion, spring } from 'react-motion'

import Carousel from '../components/carousel/carousel'
import Frame from '../components/frame/frame'

import './styles/home.sass'

export default class Home extends React.Component {
	render() {
		const { scrollValue, initLoad } = this.props

		const leaveAnimStyles = {
			scale: scrollValue > 0 ? 1 - scrollValue / 2000 : 1,
			opacity : 1 - scrollValue / 100 < 1 ? 1 - scrollValue / 100 : 1,
			frameWidthAndHeight: scrollValue / 10 > 0 ? scrollValue / 10 : 0
		}

		return (
			<div className="home">
				<Frame 
					width={leaveAnimStyles.frameWidthAndHeight}
					height={leaveAnimStyles.frameWidthAndHeight}
				/>
				<Motion
					defaultStyle={{
						scale: initLoad ? 1 : 0,
						opacity: 1,
					}}
					style={{
						scale: spring( leaveAnimStyles.scale, {stiffness: 100, damping: 20} ),
						opacity: spring( leaveAnimStyles.opacity ),
					}}
				>
					{(style) =>
						<Carousel style={{
							scale: `${style.scale}`,
							opacity: `${style.opacity}`
						}}/>							
					}
				</Motion>
			</div>
		)
	}

	shouldComponentUpdate(nextProps) {
		return this.props.scrollValue != nextProps.scrollValue
	}
}