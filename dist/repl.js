import { createInterface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
export function cleanInput(input) {
    return input
        .toLowerCase()
        .split(" ")
        .filter((i) => i.trim().length > 0);
}
export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex> ",
    });
    rl.prompt();
    rl.on("line", (line) => {
        // printsFirstWordBackToUser(line, rl); //logic to repl basic first word to user. just here for documentation purpose
        // if (line === "exit") {
        //   commandExit();
        // }
        // else if (line==="help") {
        //     const commands = getCommands();
        //     commandHelp(commands);
        //     rl.prompt();
        // } else {
        //     console.log("Unknown comand");
        //     rl.prompt();
        // }
        const commands = getCommands();
        const cmd = commands[line];
        if (!cmd) {
            console.log(`Unknown command: "${line}". Type "help" for a list of commands.`);
            rl.prompt();
            return;
        }
        try {
            cmd.callback(commands);
        }
        catch (e) {
            console.log(e);
        }
        rl.prompt();
    });
}
export function getCommands() {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        }
    };
}
function printsFirstWordBackToUser(line, rl) {
    if (line.length <= 0 || line === undefined) {
        rl.prompt();
        return;
    }
    const wordsArr = cleanInput(line);
    console.log(`Your command was: ${wordsArr[0]}`);
    rl.prompt();
}
