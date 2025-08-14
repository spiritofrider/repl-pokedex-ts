import { createInterface, Interface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import type { CLICommand } from "./command.js";

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .split(" ")
    .filter((i: string) => i.trim().length > 0);
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
    const commands = getCommands();
    const cmd = commands[line];
    if (!cmd) {
      console.log(
        `Unknown command: "${line}". Type "help" for a list of commands.`,
      );
      rl.prompt();
      return;
    }

    try {
      cmd.callback(commands);
    } catch (e) {
      console.log(e);
    }
    rl.prompt();
  });
}

export function getCommands(): Record<string, CLICommand> {
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

function printsFirstWordBackToUser(line: string, rl: Interface) {
  if (line.length <= 0 || line === undefined) {
    rl.prompt();
    return;
  }
  const wordsArr = cleanInput(line);
  console.log(`Your command was: ${wordsArr[0]}`);
  rl.prompt();
}
