interface IHistory {
  id: string;
  type: "system" | "command" | "forecast";
  content: string;
  command?: string;
}

interface ICommandArgument {
  name: string;
}

interface ICommand {
  name: string;
  args?: ICommandArgument[];
  desc: string;
}
