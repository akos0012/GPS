export class GpsCoordinate {
    private readonly date: Date;
    private readonly lat: number;
    private readonly lon: number;

    constructor({ date, time, GPSP }) {
        this.date = new Date(`${date}T${time}`); //I have combined the date and time into a single Date-type variable to facilitate easy sorting of data by date.
        this.lat = GPSP.lat;
        this.lon = GPSP.lon;
    }

    public getDate(): Date {
        return this.date;
    }

    public getLat(): number {
        return this.lat;
    }

    public getLon(): number {
        return this.lon;
    }

}