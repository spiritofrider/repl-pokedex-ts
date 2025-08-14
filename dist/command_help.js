export function commandHelp(commands) {
    console.log("Welcome to the Pokedex! \n");
    console.log("Usage: \n");
    let commandValues = Object.values(commands);
    commandValues.forEach((command) => {
        console.log(`${command.name}: ${command.description}`);
    });
}
