import React from 'react'
import { withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react';
import { Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Swipeable from 'react-swipeable'

import CarouselStore from '../stores/CarouselStore'
import ContactStore from '../stores/ContactStore'
import MediaStore from '../stores/MediaStore'
import ProjectsStore from '../stores/ProjectsStore'

import Contact from './Contact'
import Home from './Home'
import Projects from './Projects'
import Project from './Project'

import InitAnimation from '../components/InitAnimation/InitAnimation'
import Nav from '../components/nav/nav'
import DotMenu from '../components/dotMenu/dotMenu'

import './styles/layout.sass'

export default withRouter(
	class Layout extends React.Component {
		constructor(props) {
			super(props)
			this.state = {
				loading: true,
				initLoad: true,
				routes: [
					"/byParallax/",
					"/byParallax/projects/",
					"/byParallax/contact/"
				],
				currentRoute: "",
				scrollValue: 0,
				routing: false
			}
			this._pushRoute = this._pushRoute.bind(this)
			this._handleWheel = this._handleWheel.bind(this)
			this._navUp = this._navUp.bind(this)
			this._navDown = this._navDown.bind(this)
			this._disableRouting = this._disableRouting.bind(this)
			this._manageDotNavigation = this._manageDotNavigation.bind(this)
			this._renderLayout = this._renderLayout.bind(this)
			this.routingTimeout
			this.resetTotalScroll
		}

		_pushRoute(currentRouteIndex, dir) {
			const nextRoute = dir == "next" ? 1 : -1
			this.setState({routing: true})
			setTimeout(()=>{
				this.props.history.push(this.state.routes[currentRouteIndex + nextRoute])
			}, 200)
			setTimeout(()=>{
				this.setState({
					scrollValue: 0,
					routing: false
				})
			}, 950)
		}

		_handleWheel(e) {
			if (!this.state.routing) {
				let scrollValue = this.state.scrollValue + e.deltaY / 2
				clearTimeout(this.resetTotalScroll)
				this.resetTotalScroll = setTimeout(()=>{
					this.setState({scrollValue: 0})
				}, 300)

				if (scrollValue > -100 && scrollValue < 100) {
					this.setState({scrollValue})
				} else {
					scrollValue = scrollValue >= 100 ? 100 : -100
					this.setState({scrollValue})
					this.routingTimeout = setTimeout(()=>{
						if (!this.state.routing) {
							const currentRouteIndex = this.state.routes.findIndex((route)=>{
								return route == this.state.currentRoute
							})		
							if (scrollValue == 100 && currentRouteIndex < this.state.routes.length - 1) {
								this._pushRoute(currentRouteIndex, "next")
							} else if (scrollValue == -100 && currentRouteIndex > 0) {
								this._pushRoute(currentRouteIndex, "prev")
							}
						}
					}, 50)
				}
			}
		}

		_navUp() {
			this.routingTimeout = setTimeout(()=>{
				if (!this.state.routing) {
					// console.log("navUpRouting")
					const currentRouteIndex = this.state.routes.findIndex((route)=>{
						return route == this.state.currentRoute
					})		
					if (currentRouteIndex > 0) {
						this._pushRoute(currentRouteIndex, "prev")
					}
				}
			}, 50)
		}

		_navDown() {
			this.routingTimeout = setTimeout(()=>{
				if (!this.state.routing) {
					// console.log("navDownRouting")
					const currentRouteIndex = this.state.routes.findIndex((route)=>{
						return route == this.state.currentRoute
					})		
					if (currentRouteIndex == 0) {
						this.setState({scrollValue: 100})
					}
					if (currentRouteIndex < this.state.routes.length - 1) {
						this._pushRoute(currentRouteIndex, "next")
					}
				}
			}, 50)			
		}

		_disableRouting() {
			this.setState({
				routing: true,
				scrollValue: 0
			})
			clearTimeout(this.routingTimeout)
			// console.log("disabledRouting")
			this.routingTimeout = setTimeout(()=>{
				this.setState({routing: false})
			}, 250)
		}

		_manageDotNavigation(targetLocation) {
			if (!this.state.routing) {
				if (this.props.location.pathname == "byParallax/" && targetLocation == "byParallax/projects") {
					this.setState({scrollValue: 100})
				}
				if (this.props.location.pathname != targetLocation) {
					this.setState({routing: true})
					setTimeout(()=>{
						this.props.history.push(targetLocation)
						this.setState({scrollValue: 0})
						setTimeout(()=>{ this.setState({routing: false}) }, 750)
					}, 250)
				}
			}
		}

		_renderLayout() {
			setTimeout(()=>{ this.setState({loading: false}) }, 2000)
			setTimeout(()=>{ this.setState({initLoad: false}) }, 2250)
		}

		render() {
			const loadingKey = this.state.loading ? "loader" : "app"
			const shouldManageNavigation = this.state.currentRoute == "/byParallax/" || this.state.currentRoute == "/byParallax/projects/" || this.state.currentRoute == "/byParallax/contact/" ? true : false
			const stores = { CarouselStore, ContactStore, MediaStore, ProjectsStore }

			return (
				<TransitionGroup>
					<CSSTransition
						key={loadingKey}
						classNames='loader'
						timeout={1000}
					>
						<Provider {...stores}>
							{ this.state.loading ?
								<InitAnimation renderLayout={this._renderLayout}/>
							:
									<div className="layout" onWheel={ shouldManageNavigation ? this._handleWheel : null } onScroll={ shouldManageNavigation ? this._disableRouting : null}>
								<Swipeable
									onSwipedUp={ shouldManageNavigation ? this._navDown : null }
									onSwipedDown={ shouldManageNavigation ? this._navUp : null }
								>
										<Nav location={this.props.location.pathname}/>
										{ shouldManageNavigation ? <DotMenu
											location={this.props.location.pathname}
											routes={["/byParallax/","/byParallax/projects/","/byParallax/contact/"]}
											invertLocation={["/byParallax/projects/"]}
											manageDotNavigation={ this._manageDotNavigation }
										/> : null }
										<TransitionGroup>
											<CSSTransition
												key={this.props.location.pathname}
												classNames='fade'
												timeout={1000}
											>
												<Switch location={this.props.location}>
													<Route exact path='/byParallax/' render={() => <Home scrollValue={this.state.scrollValue} initLoad={this.state.initLoad}/>}/>
													<Route exact path='/byParallax/projects/' render={() => <Projects initLoad={this.state.initLoad}/>}/>
													<Route exact path='/byParallax/projects/:projectId/' component={Project} />
													<Route exact path='/byParallax/contact/' component={Contact}/>
												</Switch>
											</CSSTransition>
										</TransitionGroup>
								</Swipeable>
									</div>
							}
						</Provider>
					</CSSTransition>
				</TransitionGroup>
			)
		}

		static getDerivedStateFromProps(nextProps, prevState) {
			return {
				currentRoute: nextProps.location.pathname
			}
		}

		shouldComponentUpdate(nextProps, nextState) {
			return this.state.loading || this.props.location.key != nextProps.location.key || this.state.scrollValue != nextState.scrollValue
		}
	}
)