#! /usr/bin/env node

// inspired by http://blog.npmjs.org/post/118810260230/building-a-simple-command-line-tool-with-npm

var shell = require("shelljs");
var colors = require('colors');
require('shelljs/global');


var moduleName = process.argv[2];

if(!moduleName){
  console.log('Please specify a name for your module. Example: create-react-module ModuleName'.bgRed)
}else{
  var module_root = "./src/" + moduleName;
  // create root directory
  shell.mkdir(module_root);

  if (error()) {
    console.log('A error occured. This happens if you are not in a root directory of a create-react-app app or if you have already used the same name for a module. Please try again.'.bgRed);
  }else{
    // create sub directories
    shell.exec('git clone git@github.com:svschannak/react-module-structure-template.git src/' + moduleName);
  }

}
