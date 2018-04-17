import React from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import Nav from '../components/nav/nav'
import DotMenu from '../components/dotMenu/dotMenu'

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
			this._manageDotNavigation = this._manageDotNavigation.bind(this)
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

		_manageDotNavigation(targetLocation) {
			if (this.props.location.pathname == "/" && targetLocation != "/") {
				this.props.NavStore.totalScroll = 99.9
			}
			if (this.props.location.pathname != targetLocation) {
				setTimeout(()=>{
					this.props.history.push(targetLocation)
					this.props.NavStore.totalScroll = 0
				}, 250)
			}
		}

		render() {

			console.log("layout is rendering")

			return (
				<div className="layout" onWheel={ this._handleScroll } onScroll={ this._disableRouting }>
					<Nav location={this.props.location.pathname}/>
					<DotMenu
						location={this.props.location.pathname}
						routes={['/','/proyectos','/contacto']}
						invertLocation="/proyectos"
						manageDotNavigation={ this._manageDotNavigation }
					/>
					{this.props.children}
				</div>
			)
		}

		componentDidMount() {
			this.props.NavStore.initLoad = true
		}
	}
)