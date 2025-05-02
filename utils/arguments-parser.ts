const commands: ICommand[] = [
  { name: "clear", desc: "Clear terminal history" },
  { name: "help", desc: "Show this help message" },
  { name: "about", desc: "About this app" },
];

export function validateCommand(command: string) {
  const isValid = commands.some((cmd) => cmd.name === command);
  if (!isValid) {
    throw new Error(`${command} is not a valid command`);
  }
}
