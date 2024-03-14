// This script was taken from: https://github.com/rensjaspers/add-version-to-angular-build
// Modified by ArzDev: https://github.com/BrianArz

const fs = require("fs");

// If its running on docker container do not execute
if(!fs.existsSync('./.skip_version_file'))
{
    const execSync = require("child_process").execSync;

    const gitVersion = execSync("git rev-list --count --all").toString().trim();
    const commitHash = execSync("git rev-parse HEAD").toString().trim().substring(0,6);
    const buildDate = new Date().toISOString();

    const content = `
    export const version = '1.0.${gitVersion}';
    export const buildDate = '${buildDate}';
    export const commitHash = '${commitHash}';
    `;

    fs.writeFileSync("./src/environments/version.prod.ts", content);
}



