#! /usr/bin/env node

var shell = require("shelljs");
var colors = require('colors');
var jsonfile = require('jsonfile');

require('shelljs/global');

var projectName = process.argv[2];

shell.exec('create-react-app ' + projectName);
shell.rm('-rf', projectName + '/src');
shell.mkdir(projectName + '/src');
shell.exec('git clone git@github.com:svschannak/react-project-structure.git '+ projectName + "/src");

var parsedJSON = JSON.parse(shell.cat(projectName + '/package.json'));

var requirements = {
    "react-redux": "^4.4.5",
    "react-router": "^3.0.0",
    "redux": "^3.6.0",
    "redux-logger": "^2.7.4",
    "redux-thunk": "^2.1.0",
    "redux-watch": "^1.1.1"
};

for (var propertyName in requirements){
    parsedJSON['dependencies'][propertyName] = requirements[propertyName];
}

jsonfile.writeFileSync(projectName + '/package.json', parsedJSON, {spaces: 2});

shell.cd(projectName);
shell.exec('npm cache clean');
shell.exec('npm install');
console.log(projectName + " was created");