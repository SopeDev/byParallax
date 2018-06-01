import React from 'react'
import { inject, observer } from 'mobx-react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import './styles/contact.sass'

@inject('ContactStore') @observer
export default class Contact extends React.Component {
	constructor() {
		super()
		this._clap = this._clap.bind(this)
		this._retreatForm = this._retreatForm.bind(this)
		this._advanceForm = this._advanceForm.bind(this)
		this._handleTextInput = this._handleTextInput.bind(this)
		this._handleEmailInput = this._handleEmailInput.bind(this)
		this._handleTextArea = this._handleTextArea.bind(this)
		this._handleServices = this._handleServices.bind(this)
		this._handleRadioButtons = this._handleRadioButtons.bind(this)
		this._followMouse = this._followMouse.bind(this)
	}

	_retreatForm() {
		this.props.ContactStore.retreatForm()
	}

	_advanceForm() {
		this.props.ContactStore.advanceForm()
	}

	_handleTextInput(e) {
		const specCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/;
		const enterClass = e.target.value != "" && !specCharacters.test(e.target.value) ? "continue show" : "continue"
		const rewriteClass = !specCharacters.test(e.target.value) ? "alert" : "alert show"
		e.target.nextSibling.classList = enterClass
		e.target.nextSibling.nextSibling.classList = rewriteClass
		if (!specCharacters.test(e.target.value)) {
			this.props.ContactStore.setName(e.target.value)
		}
	}

	_handleEmailInput(e) {
		const emailValid = e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
		const enterClass = emailValid ? "continue show" : "continue"
		const rewriteClass = !emailValid ? "alert show" : "alert"
		e.target.nextSibling.classList = enterClass
		e.target.nextSibling.nextSibling.classList = rewriteClass
		if (emailValid) {
			this.props.ContactStore.setEmail(e.target.value)
		}
	}

	_handleTextArea(e) {
		this.props.ContactStore.setDescLength(e.target.value.length)
		const specCharacters = /[#$%^&*+\=\[\]{}\\|<>\/]/;
		const enterClass = e.target.value != "" && !specCharacters.test(e.target.value) && e.target.value.length >= 50 ? "continue show" : "continue"
		const rewriteClass = !specCharacters.test(e.target.value) ? "alert" : "alert show"
		const moreClass = e.target.value.length > 0 && e.target.value.length < 50 && !specCharacters.test(e.target.value) ? "alert show" : "alert"
		e.target.nextSibling.classList = enterClass
		e.target.nextSibling.nextSibling.classList = rewriteClass
		e.target.nextSibling.nextSibling.nextSibling.classList = moreClass
		if (!specCharacters.test(e.target.value) && e.target.value.length >= 50) {
			this.props.ContactStore.setDescription(e.target.value)
		}
	}

	_handleServices(e) {
		if (e.target.nextSibling.checked) {
			e.target.classList.remove("checked")
			this.props.ContactStore.setServices(e.target.nextSibling.value, "remove")
		} else {
			e.target.classList.add("checked")
			this.props.ContactStore.setServices(e.target.nextSibling.value, "add")
		}

		const enterClass = this.props.ContactStore.services.length == 0 ? "continue" : "continue show"
		const servicesClass = this.props.ContactStore.services.length == 0 ? "select-service alert" : "select-service alert hide"
		e.target.parentElement.nextSibling.classList = enterClass
		e.target.parentElement.nextSibling.nextSibling.classList = servicesClass
	}

	_handleRadioButtons(e) {
		if (!e.target.nextSibling.checked) {
			e.target.classList.add("checked")
			switch(e.target.nextSibling.name) {
				case "timeframes":
					this.props.ContactStore.setTimeframe(e.target.nextSibling.value)
					break
				case "budget":
					this.props.ContactStore.setBudget(e.target.nextSibling.value)
					break
			}
			const children = Array.from(e.target.parentElement.children)
			const index = children.indexOf(e.target)
			children.map((child, i)=>{
				if (i != index && e.target.nodeName == "LABEL") {
					child.classList.remove("checked")
				}
			})
		}

		const enterClass = this.props.ContactStore.time == "" ? "continue" : "continue show"
		const alertClass = this.props.ContactStore.time == "" ? "select-service alert" : "select-service alert hide"
		e.target.parentElement.nextSibling.classList = enterClass
		e.target.parentElement.nextSibling.nextSibling.classList = alertClass
	}

	_followMouse(e) {
		const arrowX = e.clientX - e.target.parentElement.offsetLeft - e.target.offsetWidth / 2
		const arrowY = e.clientY - e.target.parentElement.offsetTop - e.target.offsetHeight / 2
		e.target.nextSibling.style.left = arrowX + "px"
		e.target.nextSibling.style.top = arrowY + "px"
	}

	_clap(e) {
		this.props.ContactStore.clap()		
		e.target.parentElement.classList.add("clapped")
	}

	render() {
		const { background, stage, name, descLength } = this.props.ContactStore
		let content = null
		const showInfoClass = stage > 0 ? " show" : ""
		
		switch(stage) {
			case 0:
				content = (
					<div className="stage stage0">
						<h1>Hey! High-five!</h1>
						<p>Click the hand:</p>
						<div className="high-five">
							<div className="clap-noise">
								<div className="clap-bar"><div className="bar-fill"></div></div>
								<div className="clap-bar"><div className="bar-fill"></div></div>
								<div className="clap-bar"><div className="bar-fill"></div></div>
								<div className="clap-bar"><div className="bar-fill"></div></div>
								<div className="clap-bar"><div className="bar-fill"></div></div>
								<div className="clap-bar"><div className="bar-fill"></div></div>
								<div className="clap-bar"><div className="bar-fill"></div></div>
								<div className="clap-bar"><div className="bar-fill"></div></div>
							</div>
							<div className="us"  onMouseMove={this._followMouse} onClick={this._clap}></div>
							<div className="you"></div>
						</div>
					</div>
				)
				break
			case 1:
				content = (
					<div className="stage stage1">
						<h1>Awesome! If you got to this point, it means we have many things in common.</h1>
						<p>Please fill in your information so we can get to know each other better:</p>
						<input type="text" placeholder="What's your name?" onChange={this._handleTextInput} />
						<div className="continue" onClick={this._advanceForm}>Press to continue</div>
						<p className="alert">Please do not use special chacarters.</p>
					</div>
				)
				break
			case 2:
				content = (
					<div className="stage stage2">
						<h1>Nice to meet you, {name}!</h1>
						<h1>Tell us, how can we help you?</h1>
						<p>Select the service(s) you're interested in:</p>
						<div className="options">
							<label className="options-label" htmlFor="branding" onClick={this._handleServices}>
								Branding/Design
							</label>
							<input className="options-input" type="checkbox" id="branding" value="Branding/Design"/>
							<label className="options-label" htmlFor="photography" onClick={this._handleServices}>
								Photography
							</label>
							<input className="options-input" type="checkbox" id="photography" value="Photography"/>
							<label className="options-label" htmlFor="web" onClick={this._handleServices}>
								Web
							</label>
							<input className="options-input" type="checkbox" id="web" value="Web"/>
							<label className="options-label" htmlFor="other" onClick={this._handleServices}>
								Other
							</label>
							<input className="options-input" type="checkbox" id="other" value="Other"/>
						</div>
						<div className="continue" onClick={this._advanceForm}>Press to continue</div>
						<p className="select-service alert">Please select at least 1 service.</p>
					</div>
				)
				break
			case 3:
				content = (
					<div className="stage stage3">
						<h1>We'll be glad to help you out with that!</h1>
						<h1>Please tell us a little bit more about your project.</h1>
						<p>What's it about? What do you want to achieve? Tell us anything you consider important, a couple of sentences will be enough:</p>
						<textarea ref={this.textArea} onChange={this._handleTextArea} />
						<div className="continue" onClick={this._advanceForm}>Press to continue</div>
						<p className="alert">Please do not use special chacarters.</p>
						<p className="alert">Just a bit more would be nice: {descLength}/50</p>
					</div>
				)
				break
			case 4:
				content = (
					<div className="stage stage4">
						<h1>Sounds amazing!</h1>
						<h1>For when do you need that done?</h1>
						<p>Select a date as realistic and accurate as possible:</p>
						<div className="options">
							<label className="options-label" htmlFor="asap" onClick={this._handleRadioButtons}>
								ASAP
							</label>
							<input className="options-input" name="timeframes" type="radio" id="asap" value="ASAP"/>
							<label className="options-label" htmlFor="1month" onClick={this._handleRadioButtons}>
								1 Month
							</label>
							<input className="options-input" name="timeframes" type="radio" id="1month" value="1 Month"/>
							<label className="options-label" htmlFor="2months" onClick={this._handleRadioButtons}>
								2 Months
							</label>
							<input className="options-input" name="timeframes" type="radio" id="2months" value="2 Months"/>
							<label className="options-label" htmlFor="3months" onClick={this._handleRadioButtons}>
								3 Months
							</label>
							<input className="options-input" name="timeframes" type="radio" id="3months" value="3 Months"/>
							<label className="options-label" htmlFor="6months" onClick={this._handleRadioButtons}>
								6 Months
							</label>
							<input className="options-input" name="timeframes" type="radio" id="6months" value="6 Months"/>
						</div>
						<div className="continue" onClick={this._advanceForm}>Press to continue</div>
						<p className="select-service alert">Please select a timeframe.</p>
					</div>
				)
				break
			case 5:
				content = (
					<div className="stage stage5">
						<h1>Do you have a budget in mind for this project?</h1>
						<p>Having an idea of your budget will let us set real goals and expectations for your project.</p>
						<div className="options">
							<label className="options-label" htmlFor="-500" onClick={this._handleRadioButtons}>
								Less than 500 USD
							</label>
							<input className="options-input" name="budget" type="radio" id="-500" value="Less than 500 USD"/>
							<label className="options-label" htmlFor="500-1000" onClick={this._handleRadioButtons}>
								500 - 1,000 USD
							</label>
							<input className="options-input" name="budget" type="radio" id="500-1000" value="500 - 1,000 USD"/>
							<label className="options-label" htmlFor="1000-2000" onClick={this._handleRadioButtons}>
								1,000 - 2,000 USD
							</label>
							<input className="options-input" name="budget" type="radio" id="1000-2000" value="1,000 - 2,000 USD"/>
							<label className="options-label" htmlFor="2000-3000" onClick={this._handleRadioButtons}>
								2,000 - 3,000 USD
							</label>
							<input className="options-input" name="budget" type="radio" id="2000-3000" value="2,000 - 3,000 USD"/>
							<label className="options-label" htmlFor="3000-5000" onClick={this._handleRadioButtons}>
								3,000 - 5,000 USD
							</label>
							<input className="options-input" name="budget" type="radio" id="3000-5000" value="3,000 - 5,000 USD"/>
							<label className="options-label" htmlFor="5000+" onClick={this._handleRadioButtons}>
								More than 5,000 USD
							</label>
							<input className="options-input" name="budget" type="radio" id="5000+" value="More than 5,000 USD"/>
						</div>
						<div className="continue" onClick={this._advanceForm}>Press to continue</div>
						<p className="select-service alert">Please select your budget.</p>
					</div>
				)
				break
			case 6:
				content = (
					<div className="stage stage6">
						<h1>We're almost done!</h1>
						<h1>Just one last question: Where can we contact you?</h1>
						<input type="text" placeholder="What's your email?" onChange={this._handleEmailInput} />
						<div className="continue" onClick={this._advanceForm}>Press to continue</div>
						<p className="alert">Please enter a valid Emial address.</p>
					</div>
				)
				break
			case 7:
				content = (
					<div className="stage stage6">
						<h1>We're almost done!</h1>
						<h1>Just one last question: Where can we contact you?</h1>
						<input type="text" placeholder="What's your email?" onChange={this._handleEmailInput} />
						<div className="continue" onClick={this._advanceForm}>Press to continue</div>
						<p className="alert">Please enter a valid Emial address.</p>
					</div>
				)
				break
		}

		return (
			<div className="contact" style={{ backgroundImage: `url(${background})` }}>
				<TransitionGroup>
					<CSSTransition
						key={"stage" + stage}
						classNames='stage'
						timeout={500}
					>
						<div className="form">
							{content}
						</div>
					</CSSTransition>
				</TransitionGroup>
				<div className={"contact-info" + showInfoClass}>Or if you would just like to contact us, send us an email at <b>info@byparallax.com</b></div>
			</div>
		)
	}
}