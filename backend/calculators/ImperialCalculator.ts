import { GeolibInputCoordinates } from "geolib/es/types";
import { getDistance, getRhumbLineBearing } from 'geolib'; //The geolib package can calculate the distance and bearing between two GPS coordinates in the Metric system.
import { GpsCoordinate } from "../model/GpsCoordinate";
import { Calculator } from "./Calculator";

export class ImperialCalculator implements Calculator {

    constructor() {
    }

    //Converts a GpsCoordinate object to GeolibInputCoordinates.
    private getInputCoordinates(coordinate: GpsCoordinate): GeolibInputCoordinates {
        return { latitude: coordinate.getLat(), longitude: coordinate.getLon() };
    }

    //Calculates the distance between two GPS coordinates using the Imperial system (miles).
    public calculateDistance(startPoint: GpsCoordinate, endPoint: GpsCoordinate): number {
        const converter = 0.000621371; //Convert meters to miles (1 meter is approximately 0.000621371 miles)
        return parseFloat((getDistance(this.getInputCoordinates(startPoint), this.getInputCoordinates(endPoint)) * converter).toFixed(2));
    }

    //Calculates the bearing between two GPS coordinates in radians.
    public calculateBearing(startPoint: GpsCoordinate, endPoint: GpsCoordinate): number {
        const bearingInDegrees = getRhumbLineBearing(this.getInputCoordinates(startPoint), this.getInputCoordinates(endPoint));
        // Convert bearing to radians
        return parseFloat(((bearingInDegrees * Math.PI) / 180).toFixed(2));
    }

    public getCalculatorName(): string {
        return "Imperial System";
    }
}