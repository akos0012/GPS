import { fileReaderAsync } from './service/fileOperations';
import path from 'path';
import { GpsCoordinate } from './model/GpsCoordinate';
import { MetricCalculator } from './calculators/MetricCalculator';
import { ImperialCalculator } from './calculators/ImperialCalculator';
import { GeoCalculationManager } from './service/GeoCalculationManager';
import { GeoCalculationUi } from './ui/GeoCalculationUi';

//This is the main program starter. In the 'backend' folder, before running it with 'npm start', make sure to install all required dependencies using 'npm install'

//I tried hard to follow the SOLID principles. These principles are a set of design principles in object-oriented programming that aim to create more maintainable, flexible, and scalable software.

const main = async () => {
    const geoCalculationManager = new GeoCalculationManager();

    const metricCalculator = new MetricCalculator();
    const imperialCalculator = new ImperialCalculator();

    // Add calculators to the GeoCalculationManager
    geoCalculationManager.addCalculator(metricCalculator);
    geoCalculationManager.addCalculator(imperialCalculator);

    // Define the path to the input JSON file
    const filePath = path.join(__dirname, './json/test.json');

    // Read data from the input JSON file
    const fileData = await fileReaderAsync(filePath);

    // Create GpsCoordinate objects from the input data
    const gpsCoordinates = fileData.input.map(coord => new GpsCoordinate(coord));

    // Add GPS coordinates to the GeoCalculationManager
    geoCalculationManager.addCoordinates(...gpsCoordinates);

    //This class manages user interactions and displays information related to geo calculations
    const ui = new GeoCalculationUi(geoCalculationManager);

    ui.run();
}

main();