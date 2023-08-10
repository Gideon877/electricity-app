import { Electricity } from '../electricity.js';

describe('The buy electricity app', () => {
    it('should return 0 if no top-up made yet', () => {
        const electricity = new Electricity();
        expect(electricity.getUnitsAvailable()).toBe(0);
    });

    it('should allow a user to top-up electricity with 10', () => {
        const electricity = new Electricity();
        electricity.topUpElectricity(10);
        expect(electricity.getUnitsAvailable()).toBe(7);
    });

    it('should allow a user to top-up electricity with 20', () => {
        const electricity = new Electricity();
        electricity.topUpElectricity(20);
        expect(electricity.getUnitsAvailable()).toBe(14);
    });

    it('should allow a user to top-up electricity with 50', () => {
        const electricity = new Electricity();
        electricity.topUpElectricity(50);
        expect(electricity.getUnitsAvailable()).toBe(35);
    });

    it('should allow a user to top-up electricity multiple times', () => {
        const electricity = new Electricity();
        electricity.topUpElectricity(20);
        electricity.topUpElectricity(10);
        electricity.topUpElectricity(50);
        electricity.topUpElectricity(20);
        expect(electricity.getUnitsAvailable()).toBe(70);
    });

    it('should not allow a user to take advance more than once without paying the balance', () => {
        const electricity = new Electricity();
        electricity.topUpElectricity('advance');
        electricity.topUpElectricity('advance');
        expect(electricity.getUnitsAvailable()).toBe(21);
    });

    it('should allow a user to take advance and pay for the advance', () => {
        const electricity = new Electricity();
        electricity.topUpElectricity('advance');
        electricity.topUpElectricity(50);
        electricity.topUpElectricity('advance');
        expect(electricity.getUnitsAvailable()).toBe(56);
    });

    it('should allow a user to take advance and pay for the advance and use appliances', () => {
        const electricity = new Electricity();

        electricity.topUpElectricity('advance');
        expect(electricity.advanceTaken()).toBe(true);

        electricity.topUpElectricity(20);
        expect(electricity.getUnitsAvailable()).toBe(21);
        expect(electricity.advanceTaken()).toBe(true);

        electricity.topUpElectricity('advance');
        electricity.topUpElectricity(20);
        expect(electricity.advanceTaken()).toBe(false);
        expect(electricity.getUnitsAvailable()).toBe(28);

        expect(electricity.useAppliance('TV')).toBe(true);

        electricity.topUpElectricity('advance');
        expect(electricity.getUnitsAvailable()).toBe(46);
    });

    it('should allow appliances usage', () => {
        const electricity = new Electricity();

        electricity.topUpElectricity(50);
        expect(electricity.useAppliance('TV')).toBe(true);
        expect(electricity.useAppliance('Kettle')).toBe(true);
        expect(electricity.getUnitsAvailable()).toBe(27);
    });

    it('should not allow appliance usage if not enough electricity', () => {
        const electricity = new Electricity();

        electricity.topUpElectricity(10);
        expect(electricity.useAppliance('TV')).toBe(true);
        expect(electricity.getUnitsAvailable()).toBe(4);

        expect(electricity.useAppliance('Stove')).toBe(false);
        expect(electricity.getUnitsAvailable()).toBe(4);

        expect(electricity.useAppliance('TV')).toBe(true);
        expect(electricity.getUnitsAvailable()).toBe(1);

        expect(electricity.useAppliance('TV')).toBe(false);
        expect(electricity.getUnitsAvailable()).toBe(1);
    });

    it('should allow electricity usage after topping up with advance', () => {
        const electricity = new Electricity();

        electricity.topUpElectricity(10);
        expect(electricity.useAppliance('TV')).toBe(true);

        expect(electricity.useAppliance('Stove')).toBe(false);
        expect(electricity.useAppliance('Fridge')).toBe(false);
        expect(electricity.useAppliance('Kettle')).toBe(false);

        electricity.topUpElectricity('advance');
        expect(electricity.useAppliance('Fridge')).toBe(true);
        expect(electricity.useAppliance('Stove')).toBe(true);
        expect(electricity.getUnitsAvailable()).toBe(2);
    });

    it('should calculate the total amount spent', () => {
        const electricity = new Electricity();

        electricity.topUpElectricity(10);
        electricity.topUpElectricity(20);
        electricity.topUpElectricity(50);
        electricity.topUpElectricity(20);

        expect(electricity.totalAmountSpent()).toBe(100);
    });

    it('should calculate the total amount units bought', () => {
        const electricity = new Electricity();

        electricity.topUpElectricity(20);
        electricity.topUpElectricity(10);
        electricity.topUpElectricity(50);
        electricity.topUpElectricity(20);

        electricity.useAppliance('TV');
        electricity.useAppliance('Kettle');

        expect(electricity.totalAmountSpent()).toBe(100);
        expect(electricity.getUnitsAvailable()).toBe(62);
        expect(electricity.totalUnitsBought()).toBe(70);
    });
});
