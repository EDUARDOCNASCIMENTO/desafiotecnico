export default {
  paths: [
    "tests/e2e/features/**/*.feature"
  ],
  dryRun: false,
  format: [
    "progress-bar",
    "summary",
    "json:cucumber-reports/cucumber-report.json",
    "html:cucumber-reports/cucumber-report.html"
  ],
  formatOptions: {
    colorsEnabled: true,
    snippetInterface: "async-await"
  },
  import: [
    "tests/e2e/steps/**/*.ts",       // seus steps
    "tests/e2e/support/world.ts",    // Custom World
    "tests/e2e/support/hooks.ts"     // Hooks Before/After
  ],
  requireModule: ["ts-node/register"] // permite rodar TypeScript direto
};