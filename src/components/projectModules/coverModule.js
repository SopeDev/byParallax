import React from 'react'

export default class CoverModule extends React.Component {
	render() {
		const { data, currentModule } = this.props
		return (
			<div className={"module cover-module" + currentModule} style={{ backgroundImage: `url(${data.background})`}}>
				<div className="scroll">
					<p className="scroll-mobile">Swipe</p>
					<p className="scroll-desktop">Scroll</p>
					<svg width="2px" height="100px">
						<line fill="none" stroke="#fff" strokeWidth="2px" x1="1" y1="0" x2="1" y2="100"></line>
					</svg>
				</div>
			</div>
		)
	}
}