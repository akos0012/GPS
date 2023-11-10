import { GpsCoordinate } from "../model/GpsCoordinate";
import { CalculatedResult } from "../model/CalculatedResult";
import { Calculator } from "../calculators/Calculator";

export class GeoCalculationManager {
    private gpsCoords: GpsCoordinate[];
    private calculators: Calculator[];
    private results: CalculatedResult[];

    //Initializes the GeoCalculationManager with empty arrays for coordinates, calculators, and results.
    constructor() {
        this.gpsCoords = new Array();
        this.calculators = new Array();
        this.results = new Array();
    }

    //Sorts GPS coordinates by date in ascending order. (I know the input JSON file actually is sorted by date, but what if it isn't?).
    private sortCoordinatesByDate(): void {
        this.gpsCoords.sort((coordA, coordB) => {
            return coordA.getDate().getTime() - coordB.getDate().getTime();
        });
    }

    //Initiates the calculation process using a specified calculator.
    public startCalculation(index: number): boolean {
        // Check if there are enough coordinates, calculators, and the selected calculator exists
        if (this.gpsCoords.length <= 1 || this.calculators.length === 0 || !this.calculators[index]) return false;

        // Reset results array
        this.results = [];

        // Get the selected calculator
        const calculator: Calculator = this.calculators[index];

        // Sort coordinates by date
        this.sortCoordinatesByDate();

        // Perform calculations for each pair of consecutive coordinates
        for (let i = 0; i < this.gpsCoords.length; i++) {
            const currentCoord = this.gpsCoords[i];
            const nextCoord = this.gpsCoords[i + 1];

            if (!nextCoord) {
                break; // Break if no next coordinate
            }

            // Calculate distance and bearing and add the result to the array
            const distance = calculator.calculateDistance(currentCoord, nextCoord);
            const bearing = calculator.calculateBearing(currentCoord, nextCoord);
            this.results.push(new CalculatedResult(currentCoord.getLat(), currentCoord.getLon(), distance, bearing));
        }

        return true;
    }

    //Retrieves the calculated results.
    public getResults(): CalculatedResult[] {
        return JSON.parse(JSON.stringify(this.results)); //A deep copy of the calculated results array.
    }

    //Adds a single GPS coordinate to the manager.
    public addCoordinate(gpsCoord: GpsCoordinate): void {
        this.gpsCoords.push(gpsCoord);
    }

    //Adds multiple GPS coordinates to the manager.
    public addCoordinates(...gpsCoords: GpsCoordinate[]): void {
        this.gpsCoords.push(...gpsCoords);
    }

    //Adds a calculator to the manager if it doesn't already exist.
    public addCalculator(calculator: Calculator): void {
        if (!this.calculators.includes(calculator)) {
            this.calculators.push(calculator);
        }
    }

    public getCalculatorNames(): string[] {
        return this.calculators.map((calculator) => calculator.getCalculatorName());
    }
}