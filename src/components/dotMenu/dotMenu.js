import React from 'react'
import { Link } from 'react-router-dom'

import './dotMenu.sass'

export default class DotMenu extends React.Component {
	render() {
		const { location, routes, invertLocation, manageDotNavigation } = this.props
		const currentRouteIndex = routes.findIndex((route)=>{ return route == location })

		const dots = routes.map((route, i)=>{
			const activeClass = route == location ? " active" : "";

			return <div key={route} className={"dot" + activeClass} onClick={() => {manageDotNavigation(route)}}></div>
		})

		const invertClass = invertLocation.find((invert)=>{ return location == invert }) ? " invert" : ""
		const upSwiperClass = currentRouteIndex > 0 ? "show" : ""
		const downSwiperClass = currentRouteIndex < routes.length - 1 ? currentRouteIndex == 0 ? "show first" : "show" : ""

		return (
			<div className={"dotMenu" + invertClass}>
				<div className="dotContainer">
					<div className={"swipeable-up " + upSwiperClass} onClick={routes[currentRouteIndex - 1] ? ()=>{manageDotNavigation(routes[currentRouteIndex - 1])} : null}>
						<svg width="10px" height="5px">
							<polyline fill="none" stroke="#fff" strokeWidth="1" points="0,5 5,0 10,5"></polyline>
						</svg>
					</div>
					{ dots }
					<div className={"swipeable-down " + downSwiperClass} onClick={routes[currentRouteIndex + 1] ? ()=>{manageDotNavigation(routes[currentRouteIndex + 1])} : null}>
						<svg width="10px" height="5px">
							<polyline fill="none" stroke="#fff" strokeWidth="1" points="0,0 5,5 10,0"></polyline>
						</svg>
					</div>
				</div>
			</div>
		)
	}
}