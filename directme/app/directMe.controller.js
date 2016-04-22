angular.module('directMeApp')
	.controller("directMeController", function () {
		let vm = this;
		vm.submit = () => {
			//console.log("submitted: ", this);
			//loadMeService.saveContact(this.contact);
			//$state.go('thanks');
		}

		// TODO: need to add form validation messages
	});