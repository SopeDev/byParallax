import React from 'react'
import { Link } from 'react-router-dom'

import './nav.sass'

export default class Nav extends React.Component {
	constructor() {
		super()
		this.state = {
			panelCollapsed: true
		}
	}

	_toggleNavPanel() {
		const panelCollapsed = !this.state.panelCollapsed
		this.setState({ panelCollapsed })
	}

	render() {

		const { panelCollapsed } = this.state

		const navPanelClass = panelCollapsed ? "collapsed" : ""; 

		return (
			<div>
				<div className="nav-bar">
					<div className="toggle" onClick={ this._toggleNavPanel.bind(this) }>
						<span className="pattie"></span>
						<span className="pattie"></span>
						<span className="pattie"></span>
					</div>
					<div className="logo">
						<Link to="/">Parallax</Link>
					</div>
				</div>		
				<div className={ "nav-panel " + navPanelClass } >
					<ul>
						<li><Link to="/proyectos">Proyectos</Link></li>
						<li><Link to="/contacto">Contacto</Link></li>
					</ul>				
				</div>
			</div>
		)
	}
}