import DistanceCalculator from '../distance/DistanceCalculator';
import FareCalculatorHandler from '../fare/chain_of_responsability/FareCalculatorHandler';
import NormalFareCalculatorHandler from '../fare/chain_of_responsability/NormalFareCalculatorHandler';
import OvernightFareCalculatorHandler from '../fare/chain_of_responsability/OvernightFareCalculatorHandler';
import OvernightSundayFareCalculatorHandler from '../fare/chain_of_responsability/OvernightSundayFareCalculatorHandler';
import SundayFareCalculatorHandler from '../fare/chain_of_responsability/SundayFareCalculatorHandler';
import FareCalculatorFactory from '../fare/strategy/FareCalculatorFactory';
import Position from './Position';
import Segment from './Segment';

export default class Ride {
	positions: Position[];
	MIN_PRICE = 10;
	fareCalculator: FareCalculatorHandler;

	constructor () {
		this.positions = [];
		const overnightSundayFireCalculator = new OvernightSundayFareCalculatorHandler();
		const sundayFireCalculator = new SundayFareCalculatorHandler(overnightSundayFireCalculator);
		const overnightFireCalculator = new OvernightFareCalculatorHandler(sundayFireCalculator);
		this.fareCalculator = new NormalFareCalculatorHandler(overnightFireCalculator);
	}

	addPosition(lat: number, long: number, date: Date) {
		this.positions.push(new Position(lat, long, date));
	}

	calculate () {
		let price = 0;
		for (const [index, position] of this.positions.entries()) {
			const nextPosition = this.positions[index + 1];
			if (!nextPosition) break;
			const distance = DistanceCalculator.calculate(position.coord, nextPosition.coord);
			const segment = new Segment(distance, nextPosition.date);
			price += this.fareCalculator.handle(segment);
			// const fareCalculator = FareCalculatorFactory.create(segment);
			// price += fareCalculator.calculate(segment);
		}
		return (price < this.MIN_PRICE) ? this.MIN_PRICE : price;
	}
}