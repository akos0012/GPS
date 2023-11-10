import { GeolibInputCoordinates } from "geolib/es/types";
import { getDistance, getRhumbLineBearing } from 'geolib'; //The geolib package can calculate the distance and bearing between two GPS coordinates in the Metric system.
import { GpsCoordinate } from "../model/GpsCoordinate";
import { Calculator } from "./Calculator";

export class MetricCalculator implements Calculator {

    constructor() {
    }

    //Converts a GpsCoordinate object to GeolibInputCoordinates.
    private getInputCoordinates(coordinate: GpsCoordinate): GeolibInputCoordinates {
        return { latitude: coordinate.getLat(), longitude: coordinate.getLon() };
    }

    //Calculates the distance between two GPS coordinates using the Metric system.
    public calculateDistance(startPoint: GpsCoordinate, endPoint: GpsCoordinate): number {
        return getDistance(this.getInputCoordinates(startPoint), this.getInputCoordinates(endPoint));
    }

    //Calculates the bearing between two GPS coordinates.
    public calculateBearing(startPoint: GpsCoordinate, endPoint: GpsCoordinate): number {
        return Math.round(getRhumbLineBearing(this.getInputCoordinates(startPoint), this.getInputCoordinates(endPoint)));
    }

    public getCalculatorName(): string {
        return "Metric System"
    }

}