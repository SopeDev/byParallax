import React from 'react'
import { Motion, spring } from 'react-motion'

import './frame.sass'

export default class Frame extends React.Component {
	render() {
		const { width, height } = this.props

		return (
			<Motion
				style={{
					width: spring( width ),
					height: spring( height )
				}}
			>
				{(style) =>
					<div className="frame">
						<div className="top" style={{ height: `${style.height}vh` }}></div>
						<div className="bottom" style={{ height: `${style.height}vh` }}></div>
						<div className="left" style={{ width: `${style.width}vw` }}></div>
						<div className="right" style={{ width: `${style.width}vw` }}></div>
					</div>
				}
			</Motion>
		)
	}
}