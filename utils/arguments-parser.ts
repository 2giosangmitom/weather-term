const commands: ICommand[] = [
  {
    name: "weather",
    desc: "Show current weather for a city",
    args: ["city", "country code"],
  },
  { name: "clear", desc: "Clear terminal history" },
  { name: "help", desc: "Show this help message" },
  { name: "about", desc: "About this app" },
];

export function validateCommand(command: string, args: string[]) {
  let found = false;

  for (const cmd of commands) {
    if (cmd.name === command) {
      found = true;
      if (cmd.args && args.length !== cmd.args.length) {
        throw new Error(`Missing arguments for ${command}`);
      }
      break;
    }
  }

  if (!found) {
    throw new Error(`${command} is not a valid command`);
  }
}

export async function execCommand(
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
          cmd.args ? " " + cmd.args.map((v) => `&lt;${v}&gt;`).join(" ") : ""
        }`
    );
    const maxLength = Math.max(
      ...cmdNames.map((line) => {
        line = line.replaceAll("&lt;", "<");
        line = line.replaceAll("&gt;", ">");

        return line.length;
      })
    );

    // Format each line with padding
    for (let i = 0; i < commands.length; i++) {
      let temp = cmdNames[i];
      temp = temp.replaceAll("&lt;", "<");
      temp = temp.replaceAll("&gt;", ">");

      const len = temp.length;

      const namePart = cmdNames[i] + " ".repeat(maxLength - len + 4);
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

  if (command === "weather") {
    if (!args) {
      return;
    }
    const data = await getWeatherData(args[0], args[1]);
    return data;
  }
}
