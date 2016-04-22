angular.module('loadMeApp')
	.service('loadMeService', function () {
		this.contact;
		this.saveContact = (contact) => {
			if (!contact) return;

			// TODO: need more data definition to properly validate data.
			// TODO: need to assure data sanitized
			this.contact = contact;
			console.log("loadMeService: ", this.contact);
		}

		this.getContact = () => {
			return this.contact;
		}
	});