import Alpine from 'alpinejs'
import { Electricity } from './electricity.js'


Alpine.data('data', () => (
    {
        electricity: new Electricity(),
        totalAmountSpent: 0.00,
        advanceTaken: null,
        totalUnitsBought: 0.00,
        unitsAvailable: 0.00,
        amountType: null,
        usage: null,
        init() {
            this.updateAmount();
        },
        updateAmount() {
            this.totalAmountSpent = this.electricity.totalAmountSpent();
            this.advanceTaken = this.electricity.advanceTaken();
            this.totalUnitsBought = this.electricity.totalUnitsBought();
            this.unitsAvailable = this.electricity.getUnitsAvailable();
        },
        buy() {
            this
                .electricity
                .topUpElectricity(this.amountType);
            this.updateAmount();
        },
        use() {
            this
                .electricity
                .useAppliance(this.usage);
            this.updateAmount();
        },
    }
))


Alpine.start();