const commands: ICommand[] = [
  {
    name: "weather",
    desc: "Show current weather for a city",
    args: ["city name", "state", "country code"],
  },
  { name: "clear", desc: "Clear terminal history" },
  { name: "help", desc: "Show this help message" },
  { name: "about", desc: "About this app" },
];

export function validateCommand(command: string) {
  if (!commands.some((cmd) => cmd.name === command)) {
    throw new Error(`${command} is not a valid command`);
  }
}

export async function execCommand(
  command: string,
  history: Ref<IHistory[]>,
  args: string[] = []
) {
  switch (command) {
    case "help": {
      const resultLines: string[] = ["Available commands:"];

      // Format and align command lines
      const formatted = commands.map((cmd) => {
        const usage = `  ${cmd.name}${
          cmd.args ? " " + cmd.args.map((a) => `<${a}>`).join(" ") : ""
        }`;
        return { usage, desc: cmd.desc };
      });

      const maxLength = Math.max(...formatted.map((f) => f.usage.length));

      for (const { usage, desc } of formatted) {
        const padded = usage
          .padEnd(maxLength + 4)
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;"); // spacing before dash
        resultLines.push(`${padded}- ${desc}`);
      }

      history.value.push({
        id: nanoid(),
        type: "command",
        content: resultLines.join("\n"),
        command,
      });
      break;
    }

    case "clear": {
      history.value = [];
      break;
    }

    case "about": {
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
      break;
    }

    case "weather": {
      if (!args.length) {
        history.value.push({
          id: nanoid(),
          type: "command",
          content:
            "Please provide a city name (and optionally state, country).",
          command: "weather",
        });
        break;
      }

      try {
        const data = await getWeatherData(args.join(","));
        history.value.push({
          id: nanoid(),
          type: "weather",
          command: `weather ${args.join(" ")}`,
          weather: data,
        });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to get weather data";
        history.value.push({
          id: nanoid(),
          type: "command",
          content: message,
          command: `weather ${args.join(" ")}`,
        });
      }
      break;
    }

    default: {
      history.value.push({
        id: nanoid(),
        type: "command",
        content: `${command} is not implemented`,
        command,
      });
      break;
    }
  }
}
