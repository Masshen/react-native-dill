#!/usr/bin/env node
const { execSync } = require("child_process");

const runCommand = (command) => {
  try {
    execSync(`${command}`, {
      stdio: "inherit",
    });
  } catch (error) {
    console.log(`Failed to execute ${command}`, error);
    return false;
  }
  return true;
};
const repoName = process.argv[2] ?? null;
console.log(`Name of app is ${repoName}`);
const gitChekoutCommand = `git clone --depth 1 https://github.com/Masshen/react-native-dill ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Clonning the repository with name ${repoName} `);

const checkout = runCommand(gitChekoutCommand);
if (!checkout) process.exit(-1);
console.log(`Installing dependencies for ${repoName}`);
const installDeps = runCommand(installDepsCommand);
if (!installDeps) process.exit(-1);
console.log(`cd ${repoName} && npx react-native start`);
