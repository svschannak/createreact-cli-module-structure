# React Module Structure
Wireframe for your React Apps, that were started with create-react-app.

Creates a subfolder in the src-directory with the name of the module and multiple sub-folders.

## New React Project
```shell
create-react-project ProjectName
```
Initialises a new project with create-react-app, but with other configs to work with.


## New React Project Module
```shell
create-react-module ModuleName
```

Create a new module subdir in an create-react-app main directory with some template files.
Can be connected to the project by importing the config file to the appConfig.js file with:

```javascript
import * as ModuleName from './ModuleName/Config';
```

and be added to the INSTALLED_APPS const:

```javascript
export const INSTALLED_APPS = [
    ModuleName,
    OtherModuleName
];
```

