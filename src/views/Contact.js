import React from 'react'
import { inject, observer } from 'mobx-react'

import './styles/contact.sass'

@inject('NavStore') @observer
export default class Contact extends React.Component {
	render() {
		const { NavStore } = this.props 

		return (
			<div className="contact">
				<div>This is Contact</div>
			</div>
		)
	}

	componentDidMount() {
		this.props.NavStore.prevRoute = "/proyectos"
		this.props.NavStore.nextRoute = null
		setTimeout(()=>{
			this.props.NavStore.routing = false
		}, 1000)
	}
}