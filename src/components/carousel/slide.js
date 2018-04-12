import React from 'react'

export default class Slide extends React.Component {
	render() {
		const { header, text, background } = this.props
		return (
			<div className="slide">
				<div className="slide-background" style={{backgroundImage: `url('${background}')`}}></div>
				<h1 className="slide-header">{header || null}</h1>
				<p className="slide-text">{text || null}</p>
			</div>
		)
	}
}