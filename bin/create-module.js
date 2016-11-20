#! /usr/bin/env node

// inspired by http://blog.npmjs.org/post/118810260230/building-a-simple-command-line-tool-with-npm

var fs = require('fs');
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
    console.log('A error occured. This happens  ot autif you are not in a root directory of a create-react-app app or if you have already used the same name for a module. Please try again.'.bgRed);
  }else{
    // create sub directories
    shell.exec('git clone git@github.com:svschannak/react-module-structure-template.git src/' + moduleName);
  }


    // open appConfig.js to import new module
    var contents = fs.readFileSync('./src/appConfig.js', 'utf8');
    var import_match = /^import/;

    // make content of appconfig to list
    contents = contents.split('\n');

    var import_done = false;
    var new_content = [];

    for(idx in contents){
        // try to find the first missmatch of import to append import as the last line
        if(!import_done){
            var matches = (contents[idx].match(import_match) === null) === false;
            // add new import to first line that is no import
            if(!matches){
                new_content.push("import * as " + moduleName + " from './" + moduleName + "/config';");
                new_content.push(contents[idx]);
                import_done = true;
            }else{
                new_content.push(contents[idx]);
            }

        }else{
            new_content.push(contents[idx]);
        }


    }

    // add ModuleName to INSTALLED_APP_LIST
    installed_app_match = /INSTALLED_APPS/;
    var found_match = false;
    finished_content = [];

    for(idx in new_content) {

        finished_content.push(new_content[idx]);

        if(!found_match) {
            var matches = (new_content[idx].match(installed_app_match) === null) === false;
            if (matches) {
                // add comma to current line if it's not the last imported
                var comma = "";
                var next_row = parseInt(idx) + 1;
                if(new_content[next_row].match(/];/) === null){
                    comma = ","
                }
                finished_content.push("\t" + moduleName + comma);
                found_match = true;
            }
        }

    }
    fs.writeFileSync('./src/appConfig.js', finished_content.join("\n"));
}
