import { readFile, writeFile } from "fs/promises";

//Asynchronously reads a JSON file from the specified path.
export const fileReaderAsync = async (filePatch: string) => {
    try {
        return JSON.parse(await readFile(filePatch, "utf8"));
    } catch (error: any) {
        console.error(`File reading error: ${error.message}`);
        throw error;
    }
};

//Asynchronously writes JSON data to a file at the specified path.
export const fileWriteAsync = async (filePath: string, data: any): Promise<boolean> => {
    try {
        await writeFile(filePath, JSON.stringify(data));
        return true;
    } catch (error: any) {
        console.error(`File writing error: ${error.message}`);
        throw error;
    }
};