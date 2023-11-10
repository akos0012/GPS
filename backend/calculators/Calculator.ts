import { GpsCoordinate } from "../model/GpsCoordinate";

export interface Calculator {
    calculateDistance(startPoint: GpsCoordinate, endPoint: GpsCoordinate): number;
    calculateBearing(startPoint: GpsCoordinate, endPoint: GpsCoordinate): number;
    getCalculatorName(): string;
}