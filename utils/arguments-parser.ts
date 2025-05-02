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

export function execCommand(
  command: string,
  history: Ref<IHistory[]>,
  args?: string[]
) {
  if (command === "help") {
    const resultLines = [];
    resultLines.push("Available commands:");

    // Find the longest command+args length to align descriptions
    const cmdNames = commands.map(
      (cmd) =>
        `  ${cmd.name}${
          cmd.args ? " " + cmd.args.map((v) => `<${v}>`).join(" ") : ""
        }`
    );
    const maxLength = Math.max(...cmdNames.map((line) => line.length));

    // Format each line with padding
    for (let i = 0; i < commands.length; i++) {
      const namePart = cmdNames[i].padEnd(maxLength + 4); // +2 for spacing before the dash
      resultLines.push(`${namePart}- ${commands[i].desc}`);
    }

    history.value.push({
      id: nanoid(),
      type: "command",
      content: resultLines.join("\n"),
      command,
    });
    return;
  }

  if (command === "clear") {
    history.value = [];
    return;
  }

  if (command === "about") {
    const aboutMessage = `
A terminal-style weather application.
Created with Nuxt.js and Tailwind CSS v4.

Author: Vo Quang Chien
GitHub: <a href="https://github.com/2giosangmitom" target="_blank" class="text-green-500 underline">https://github.com/2giosangmitom</a>`.trim();

    history.value.push({
      id: nanoid(),
      type: "command",
      content: aboutMessage,
      command,
    });
    return;
  }
}
