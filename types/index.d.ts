interface IHistory {
  id: string;
  type: "system" | "command" | "forecast";
  content: string;
  command?: string;
}

interface ICommand {
  name: string;
  args?: string[];
  desc: string;
}
