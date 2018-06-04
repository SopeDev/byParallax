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

import DotMenu from '../components/dotMenu/dotMenu'
import Frame from '../components/frame/frame'
import InitAnimation from '../components/InitAnimation/InitAnimation'
import Nav from '../components/nav/nav'

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
			this._manageDotNavigation = this._manageDotNavigation.bind(this)
			this._renderLayout = this._renderLayout.bind(this)
			this.routingTimeout
			this.resetTotalScroll
		}

		_pushRoute(currentRouteIndex, dir) {
			clearTimeout(this.resetTotalScroll)
			const nextRoute = dir == "next" ? 1 : -1
			this.setState({routing: true})
			this.props.history.push(this.state.routes[currentRouteIndex + nextRoute])
			setTimeout(()=>{
				this.setState({
					scrollValue: 0,
					routing: false
				})
			}, 1000)
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
					if (!this.state.routing) {
						const currentRouteIndex = this.state.routes.findIndex((route)=>{ return route == this.state.currentRoute })
						if (scrollValue == 100) {
							if (this.state.currentRoute == "/byParallax/projects/" && ProjectsStore.currentProject < ProjectsStore.projects.length - 1) {
								this.setState({routing: true})
								ProjectsStore.nextProject()
								setTimeout(()=>{ this.setState({ scrollValue: 0, routing: false }) }, 500)
							} else if (currentRouteIndex < this.state.routes.length - 1) {
								this._pushRoute(currentRouteIndex, "next")
							}
						} else if (scrollValue == -100) {
							if (this.state.currentRoute == "/byParallax/projects/" && ProjectsStore.currentProject > 0) {
								this.setState({routing: true})
								ProjectsStore.prevProject()
								setTimeout(()=>{ this.setState({ scrollValue: 0, routing: false }) }, 500)
							} else if (currentRouteIndex > 0) {
								this._pushRoute(currentRouteIndex, "prev")
							}							
						}					
					}
				}
			}
		}

		_navUp() {
			if (!this.state.routing) {
				const currentRouteIndex = this.state.routes.findIndex((route)=>{
					return route == this.state.currentRoute
				})		
				if (currentRouteIndex > 0) {
					this._pushRoute(currentRouteIndex, "prev")
				}
			}
		}

		_navDown() {
			if (!this.state.routing) {
				const currentRouteIndex = this.state.routes.findIndex((route)=>{
					return route == this.state.currentRoute
				})		
				if (currentRouteIndex < this.state.routes.length - 1) {
					this._pushRoute(currentRouteIndex, "next")
				}
			}
		}

		_manageDotNavigation(targetLocation) {
			if (!this.state.routing) {
				if (this.props.location.pathname != targetLocation) {
					this.setState({
						routing: true,
						scrollValue: 0
					})
					this.props.history.push(targetLocation)
					setTimeout(()=>{ this.setState({routing: false}) }, 100)
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

			const frameStyles = {
				width: this.state.currentRoute == "/byParallax/projects/" ? 10 : this.state.currentRoute == "/byParallax/contact/" ? 0 : this.state.scrollValue / 10 > 0 ? this.state.scrollValue / 10 : 0,
				height: this.state.currentRoute == "/byParallax/projects/" ? 15 : this.state.currentRoute == "/byParallax/contact/" ? 0 : this.state.scrollValue / 10 * 1.5 > 0 ? this.state.scrollValue / 10 * 1.5 : 0
			}

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
								<div className="layout" onWheel={ shouldManageNavigation ? this._handleWheel : null }>
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
										<Frame 
											width={frameStyles.width}
											height={frameStyles.height}
										/>
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
			if (prevState.currentRoute == "/byParallax/") {
				ProjectsStore.setProject(0)
			} else if (prevState.currentRoute == "/byParallax/contact/") {
				ProjectsStore.setProject(ProjectsStore.projects.length - 1)
			}
			return {
				currentRoute: nextProps.location.pathname
			}
		}

		shouldComponentUpdate(nextProps, nextState) {
			return this.state.loading || this.props.location.key != nextProps.location.key || (this.state.scrollValue != nextState.scrollValue && this.state.currentRoute == "/byParallax/")
		}
	}
)