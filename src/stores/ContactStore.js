import React from 'react'
import { observable } from 'mobx'
import MediaStore from './MediaStore'

class ContactStore {
	background = MediaStore.contact[0]
	@observable clapped = false
 	@observable stage = 0
 	@observable name = ""
 	@observable services = []
 	@observable descLength = 0
 	@observable description = ""
 	@observable time = ""
 	@observable budget = ""
 	@observable email = ""

 	retreatForm() {
		this.stage = this.stage - 1
	}

 	advanceForm() {
		this.stage = this.stage + 1
	}
 	
	clap() {
		this.clapped = true
		setTimeout(()=>{
			this.stage = this.stage + 1
		}, 750)
	}

	setName(name) {
		this.name = name
	}

	setEmail(email) {
		this.email = email
	}

	setServices(service, mode) {
		if (mode == "add") {
			this.services.push(service)
		} else if (mode == "remove") {
			this.services.splice(this.services.findIndex((arrayService)=>{ return arrayService == service }), 1)
		}
	}

	setDescLength(descLength) {
		this.descLength = descLength
	}

	setDescription(description) {
		this.description = description
	}

	setTimeframe(timeframe) {
		this.time = timeframe
	}

	setBudget(budget) {
		this.budget = budget
	}
}

export default new ContactStore