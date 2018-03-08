# inless

The monorepo for common inless packages.

# App vs Service
`App` is just a library bundling some logic. Like node-editor, that could be easyly imported and started with some parameters.
`Service` is a project with continues delivery solution. Services could communicate between each other. 

# Setting Up a package

Each package is placed inside `pacakges` dir and should follow next name style:
 - `util-${name}` - for util packages like `util-cycler`. An util package shouldn't be overloaded with a specific app logic
 - `ui-${name}` - for ui packages. E.g. `ui-scene` contains all components and base styles for `scene`(todo: describe what's scene).
 - `app-${name}` - for applications like `app-editor` that contains all logic for node editor.

