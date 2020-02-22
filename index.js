#! /usr/bin/env node
const { spawn } = require("child_process");
const ora = require("ora");
const spinner = ora();
const name = process.argv[2];
if (!name || name.indexOf("/") === -1) {
  console.log('error')
  return console.log(`
  Invalid format.
  Usage: gcopy username/repo 
`);
}

const repo = `https://github.com/${name}.git`;
spinner.start()
runCommand("git", ["clone", repo])
  .then(() => {
    console.log(repo)
  })
  .then(() => {
    spinner.succeed('done')
    spinner.stop();
  });

function runCommand(command, args, options = undefined) {
  const spawned = spawn(command, args, options);

  return new Promise(resolve => {
    spawned.stdout.on("data", data => {
      console.log(data.toString());
    });

    spawned.stderr.on("data", data => {
      console.error(data.toString());
    });

    spawned.on("close", () => {
      resolve();
    });
  });
}
