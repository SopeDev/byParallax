import React from 'react'

import Nav from '../components/nav/nav'

export default class Layout extends React.Component {
	render() {
		return (
			<div>
				<Nav />
				{this.props.children}
			</div>
		)
	}
}