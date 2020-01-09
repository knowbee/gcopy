#! /usr/bin/env node

const { spawn } = require('child_process');

const name = process.argv[2];
if (!name || name.indexOf("/") < -1) {
  return console.log(`
  Invalid format.
  Usage: gcopy username/repo 
`);
}

const repo = `https://github.com/${name}.git`;

runCommand('git', ['clone', repo])
  .then(() => {
    console.log('cloning repo...');
    
  }).then(() => {
    console.log('Done!');
  });

function runCommand(command, args, options = undefined) {
  const spawned = spawn(command, args, options);

  return new Promise((resolve) => {
    spawned.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    
    spawned.stderr.on('data', (data) => {
      console.error(data.toString());
    });
    
    spawned.on('close', () => {
      resolve();
    });
  });
}