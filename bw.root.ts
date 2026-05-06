import { defineRootConfig } from "bun-workspaces";

export default defineRootConfig({
  defaults: {
    includeRootWorkspace: true,
    parallelMax: 4,
    shell: "system",
  },
  workspacePatternConfigs: [],
});
