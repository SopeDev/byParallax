import React from 'react'
import { Motion, spring } from 'react-motion'

export default class bouncyLetter extends React.Component {
	constructor() {
		super()
		this.state = {
			hover: false
		}
		this._mouseEnter = this._mouseEnter.bind(this)
		this._mouseLeave = this._mouseLeave.bind(this)
	}

	_mouseEnter() {
		this.setState({
			hover: true
		})
	}

	_mouseLeave() {
		this.setState({
			hover: false
		})
	}

	render() {
		return (
			<Motion
				style={{x: spring(this.state.hover ? 1.2 : 1, {stiffness: 500, damping: 10})}}
			>
				{({x}) => 
					<div 
						style={{ transform: `matrix(1, 0, 0, ${x}, 0, 0)` }}
						onMouseEnter={ this._mouseEnter }
						onMouseLeave={ this._mouseLeave }
					>
						{this.props.letter}
					</div>
				}
			</Motion>
		)
	}
}