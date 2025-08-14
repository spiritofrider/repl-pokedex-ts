import { getCommands } from "./repl.js";
import type { CLICommand } from "./command.js";
export function commandHelp(commands: Record<string, CLICommand>) {
    console.log("Welcome to the Pokedex! \n");
    console.log("Usage: \n");
    let commandValues = Object.values(commands);
    commandValues.forEach((command) => {
        console.log(`${command.name}: ${command.description}`);
    });
}