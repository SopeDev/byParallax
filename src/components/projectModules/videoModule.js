import React from 'react'

export default class VideoModule extends React.Component {
	constructor() {
		super()
		this.state = {
			playing: false
		}
		this._handleVideo = this._handleVideo.bind(this)
		this._followMouse = this._followMouse.bind(this)
		this.video = React.createRef()
	}

	_handleVideo(e) {
		if (this.state.playing) {
			this.setState({ playing: false })
			this.video.current.pause()
		} else {
			this.setState({ playing: true })
			this.video.current.play()
		}
	}

	_followMouse(e) {
		const arrowX = e.clientX - e.target.offsetLeft - 40
		const arrowY = e.clientY - e.target.offsetTop - 40
		e.target.children[1].style.left = arrowX + "px"
		e.target.children[1].style.top = arrowY + "px"
	}

	render() {
		const { data, currentModule } = this.props
		const playingClass = this.state.playing ? " playing" : ""

		return (
			<div className={"module video-module" + currentModule}>
				<div className={"video-panel" + playingClass} onMouseMove={this._followMouse} onMouseEnter={this._followMouse} onClick={this._handleVideo}>
					<video ref={this.video} loop>
						<source src={data.url} type="video/mp4"/>
					</video>
					<div className="play-button">
						<svg width="80px" height="80px">
							<polyline fill="#fff" strokeWidth="0" points="28,20 58,40 28,60"></polyline>
						</svg>
					</div>
				</div>
			</div>
		)
	}

	componentDidUpdate(prevProps) {
		if (prevProps.currentModule == " current" && this.props.currentModule != prevProps.currentModule) {
			this.setState({ playing: false })
			this.video.current.pause()
		}
	}
}