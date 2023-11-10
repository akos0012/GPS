export class CalculatedResult {
    private readonly fromGPSP: object;
    private readonly distance: number;
    private readonly bearing: number;

    constructor(lat: number, lon: number, distance: number, bearing: number) {
        this.fromGPSP = { lat, lon };
        this.distance = distance;
        this.bearing = bearing;
    }

    public getDistance(): number {
        return this.distance;
    }

    public getBearing(): number {
        return this.bearing;
    }

    public getFromGPSP(): object {
        return structuredClone(this.fromGPSP);
    }

}