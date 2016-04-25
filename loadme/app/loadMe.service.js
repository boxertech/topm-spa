angular.module('loadMeApp')
	.service('loadMeService', function () {
		this.contact;
		this.saveContact = (contact) => {
			if (!contact) return;

			// TODO: need more data definition to validate data.
			// TODO: data sanitation not included
			this.contact = contact;

		}

		this.getContact = () => {
			return this.contact;
		}
	});