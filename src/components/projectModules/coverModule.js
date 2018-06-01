import React from 'react'

export default class CoverModule extends React.Component {
	render() {
		const { data, currentModule } = this.props
		return (
			<div className={"module cover-module" + currentModule} style={{ backgroundImage: `url(${data.background})`}}/>
		)
	}
}