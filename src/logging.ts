export default function logError(error: Error, printStackTrace: boolean = false): void {
    console.error(`${error.name} - ${error.message}`);

    if (printStackTrace && (error.stack !== undefined)) {
        console.error(error.stack);
    }
}
