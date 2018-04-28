import React from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Motion, spring } from 'react-motion'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import InitAnimation from '../components/InitAnimation/InitAnimation'
import Nav from '../components/nav/nav'
import DotMenu from '../components/dotMenu/dotMenu'

import './styles/layout.sass'

@inject('NavStore') @observer
export default withRouter(
	class Layout extends React.Component {
		constructor() {
			super()
			this.state = {
				loading: true,
				scrollValue: 0,
				routes: [
					"/",
					"/proyectos",
					"/contacto"
				],
			}
			this._disableRouting = this._disableRouting.bind(this)
			this._handleScroll = this._handleScroll.bind(this)
			this._manageDotNavigation = this._manageDotNavigation.bind(this)
			this.routingTimeout
			this.viewWindow = React.createRef()
		}

		_disableRouting() {			
			this.props.NavStore.routing = true
			clearTimeout(this.routingTimeout)
			this.routingTimeout = setTimeout(()=>{
				this.props.NavStore.routing = false
			}, 250)
		}

		_handleScroll(e) {
			const viewWindow = this.viewWindow.current
			const scrollValue = this.state.scrollValue + -e.deltaY

			if (scrollValue > 0) {
				this.setState({
					scrollValue: 0
				})
			} else if (scrollValue < window.innerHeight - viewWindow.offsetHeight) {
				this.setState({
					scrollValue: window.innerHeight - viewWindow.offsetHeight
				})
			} else {
				this.setState({
					scrollValue: scrollValue
				})
			}

			if (this.props.NavStore.routing == false) {
				this.props.NavStore.handleScroll(e)
				if (this.props.NavStore.totalScroll == 100 && this.props.NavStore.nextRoute) {
					this.props.NavStore.enableRouting()
					setTimeout(()=>{
						this.props.history.push(this.props.NavStore.nextRoute)
					}, 250)
				} else if (this.props.NavStore.totalScroll == -100 && this.props.NavStore.prevRoute) {
					this.props.NavStore.enableRouting()
					setTimeout(()=>{
						this.props.history.push(this.props.NavStore.prevRoute)
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
			const loadingKey = this.state.loading ? "loader" : "app"
			const shouldManageNavigation = this.props.location.pathname == "/" || this.props.location.pathname == "/proyectos" || this.props.location.pathname == "/contacto" ? true : false

			console.log(this.state.scrollValue)

			return (
				<TransitionGroup>
					<CSSTransition
						key={loadingKey}
						classNames='loader'
						timeout={1000}
					>
						{ this.state.loading ?
							<InitAnimation/>
						:
							<div className="layout" onWheel={ shouldManageNavigation ? this._handleScroll : null } onScroll={ shouldManageNavigation ? this._disableRouting : null}>
								<Nav location={this.props.location.pathname}/>
								{ shouldManageNavigation ? <DotMenu
									location={this.props.location.pathname}
									routes={['/','/proyectos','/contacto']}
									invertLocation="/proyectos"
									manageDotNavigation={ this._manageDotNavigation }
								/> : null }
								<Motion
									style={{ scroll: spring(this.state.scrollValue) }}
								>
									{({scroll}) =>
										<div className="view-window" ref={this.viewWindow} style={{ transform: `translateY(${scroll}px)` }}>
											{this.props.children}
										</div>
									}
								</Motion>
							</div>
						}
					</CSSTransition>
				</TransitionGroup>
			)
		}

		// shouldComponentUpdate(nextProps) {
			// return this.state.loading || this.props.location.key != nextProps.location.key
		// }

		componentDidMount() {
			if (this.state.loading === true) {
				setTimeout(() => {
					this.setState({
						loading: false
					})
					this.props.NavStore.initLoad = true
				}, 2000)
			}
		}
	}
)