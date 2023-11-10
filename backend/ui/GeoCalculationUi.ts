import { GeoCalculationManager } from "../service/GeoCalculationManager";
import promptSync from 'prompt-sync';
import { fileWriteAsync } from '../service/fileOperations';
import path from 'path';

export class GeoCalculationUi {
    private readonly geoCalculationManager: GeoCalculationManager;

    constructor(geoCalculationManager: GeoCalculationManager) {
        this.geoCalculationManager = geoCalculationManager;
    }

    public async run(): Promise<void> {
        // Choose a calculator based on user input
        const index = this.chooseCalculator(this.geoCalculationManager.getCalculatorNames());

        if (index !== null) {
            // Start the calculation using the selected calculator
            if (this.geoCalculationManager.startCalculation(index)) {
                console.log("The calculation was successful.");

                // Get the calculation results
                const results = {
                    output: this.geoCalculationManager.getResults()
                };

                // Define the file path for saving the results
                const filePath = path.join(__dirname, '../json/output.json');
                // Write the results to a JSON file
                const writeResult = await fileWriteAsync(filePath, results);

                if (writeResult) {
                    console.log(`The results were successfully saved in the file: ${filePath}`);
                } else {
                    console.log(`Failed to save the results to the file: ${filePath}`);
                }
            } else {
                console.log("Calculation failed.");
            }
        }
    }

    private getNumberFromUser(): number | null {
        // Create a synchronous prompt with SIGINT (Ctrl+C) signal handling enabled
        const prompt = promptSync({ sigint: true });

        // Get a number from the user input
        let userInput = prompt("Enter a number (or type 'exit' to cancel): ");

        while (userInput.toLowerCase() !== 'exit') {
            let parsedNumber = Number(userInput);

            if (!isNaN(parsedNumber)) {
                return parsedNumber;
            } else {
                userInput = prompt("Invalid input. Please enter a valid number (or type 'exit' to cancel): ");
            }
        }

        return null;
    };

    private chooseCalculator(calculators: string[]): number | null {
        // Display available calculators to the user
        console.log("Available calculators:");
        for (let i = 0; i < calculators.length; i++) {
            console.log(`${i + 1}. ${calculators[i]}`);
        }
        console.log("\n");

        // Get the user's choice and validate it
        console.log("Please choose a calculator:")
        let num = this.getNumberFromUser();
        while (num !== null) {
            if (calculators.length >= num && num > 0) {
                return num - 1; //Return an index (zero-based)
            } else {
                console.log("That calculator does not exist. Please try again!");
                num = this.getNumberFromUser();
            }
        }

        return null;
    }
}