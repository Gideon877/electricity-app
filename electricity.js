export class Electricity {
	constructor() {
		this.appliances = {
			Stove: 10,
			Kettle: 5,
			TV: 3,
			Fridge: 13,
		};
		this.unitsAvailable = 0;
		this.isAdvanceTaken = false;
		this.unitsOwed = 0;
		this.amountSpent = 0;
	}

	/**
	 * Top-up electricity based on the given amount or use advance if amount is 'advance'.
	 * @param {number|string} amount - The amount to top-up or 'advance' to use the advance.
	 */
	topUpElectricity(amount) {

		amount = (typeof amount === 'string' && amount !== 'advance') ? Number(amount) : amount
		
		if (typeof amount === 'string' && amount.toLowerCase() === 'advance' && !this.isAdvanceTaken) {
			this.unitsAvailable += 21;
			this.isAdvanceTaken = true;
			this.unitsOwed = 21;
		} else if (typeof amount === 'number') {
			this.amountSpent += amount;
			let units = (amount / 10) * 7;
			if (this.unitsOwed <= 0) {
				this.unitsAvailable += units;
			}
			if (this.isAdvanceTaken) {
				if (this.unitsOwed <= units) {
					units -= this.unitsOwed;
					this.unitsOwed = 0;
					this.unitsAvailable += units;
					this.isAdvanceTaken = false;
				} else {
					this.unitsOwed -= units;
					this.isAdvanceTaken = true;
				}
			}
		}
	}

	/**
	 * Use an appliance and subtract the units from unitsAvailable if there are enough units.
	 * @param {string} appliance - The name of the appliance to use.
	 * @returns {boolean} - Returns true if the appliance can be used, false otherwise.
	 */
	useAppliance(appliance) {
		const requiredUnits = this.appliances[appliance];
		if (requiredUnits <= this.unitsAvailable) {
			this.unitsAvailable -= requiredUnits;
			return true;
		}
		return false;
	}

	/**
	 * Check if the advance has been taken.
	 * @returns {boolean} - Returns true if the advance has been taken, false otherwise.
	 */
	advanceTaken() {
		return this.isAdvanceTaken;
	}

	/**
	 * Get the total amount spent on electricity.
	 * @returns {number} - The total amount spent.
	 */
	totalAmountSpent() {
		return this.amountSpent;
	}

	/**
	 * Get the total units bought based on the amount spent.
	 * @returns {number} - The total units bought.
	 */
	totalUnitsBought() {
		return (this.amountSpent / 10) * 7;
	}

	getUnitsAvailable() {
		return this.unitsAvailable
	}
}
