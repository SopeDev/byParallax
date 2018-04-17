import React from 'react'
import { Link } from 'react-router-dom'

import './dotMenu.sass'

export default class DotMenu extends React.Component {
	render() {
		const { location, routes, invertLocation, manageDotNavigation } = this.props

		const dots = routes.map((route)=>{
			const activeClass = route == location ? " active" : "";
			const invertClass = route == invertLocation ? " invert" : ""

			return <div key={route} className={"dot" + activeClass + invertClass} onClick={() => {manageDotNavigation(route)}}></div>
		})

		return (
			<div className="dotMenu">
				<div className="dotContainer">
					{ dots }
				</div>
			</div>
		)
	}
}