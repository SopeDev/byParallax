import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('NavStore') @observer
export default class Contact extends React.Component {
	componentDidMount() {
		this.props.NavStore.prevRoute = "/Proyectos"
		this.props.NavStore.nextRoute = null
		setTimeout(()=>{
			this.props.NavStore.routing = false
		}, 500)
	}

	render() {
		const { NavStore } = this.props 

		return (
			<div className="contact">
				<div>This is Contact</div>
			</div>
		)
	}
}