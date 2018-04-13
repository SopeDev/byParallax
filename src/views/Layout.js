import React from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import Nav from '../components/nav/nav'

import './styles/layout.sass'

@inject('NavStore') @observer
export default withRouter(
	class Layout extends React.Component {
		constructor() {
			super()
			this.state = {
				currentRoute: null
			}
			this._disableRouting = this._disableRouting.bind(this)
			this._handleScroll = this._handleScroll.bind(this)
			this.routingTimeout
		}

		_disableRouting() {
			const { NavStore } = this.props
			
			NavStore.routing = true
			clearTimeout(this.routingTimeout)
			this.routingTimeout = setTimeout(()=>{
				NavStore.routing = false
			}, 250)
		}

		_handleScroll(e) {
			const { NavStore } = this.props

			if (NavStore.routing == false) {
				NavStore.handleScroll(e)
				if (NavStore.totalScroll == 100 && NavStore.nextRoute) {
					NavStore.enableRouting()
					setTimeout(()=>{
						this.props.history.push(NavStore.nextRoute)
					}, 250)
				} else if (NavStore.totalScroll == -100 && NavStore.prevRoute) {
					NavStore.enableRouting()
					setTimeout(()=>{
						this.props.history.push(NavStore.prevRoute)
					}, 250)
				}
			}
		}

		render() {
			return (
				<div className="layout" onWheel={ this._handleScroll } onScroll={ this._disableRouting }>
					<Nav location={this.props.location.pathname}/>
					{this.props.children}
				</div>
			)
		}

		componentDidMount() {
			this.props.NavStore.initLoad = true
		}
	}
)