#ShortcutJunkie

ShortcutJunkie is a MEAN app built off of the MEAN.JS boilerplate. The stack is made up of the following pieces.
* Node.js
* Express.js
* MongoDB
* Angular.js

# Structure
* `config` – Configurations for the application.
    *  `assets` – Configurations to tell the build system what files and libraries to include in each environment.
    *  `env` – All the application configurations for each environment. Any execution environment variables are read into the application here and exposed to the rest of the application.
* `modules` –
    We use a vertical module system, which means that all the client-side and server-side code     for a single feature are grouped together. Currently we have these three modules:
    * `core` – The central code used by the entire application. This serves the single page of our single page application application as well as provides error handling pages. On the client side, we configure the layout that all other pages will be extending.
    * `users` – This is where all of the authentication for the application happens. All of the pages and logic relating to signing in and out are here, as well as everything related to managing your user account.
    * `shortcuts` – This is where the magic happens. All the code core accessing shortcuts in the database and displaying them is here.
* `node_modules` – All the node dependencies for the project. These are not commited into git, but you should get them once you run `npm install`
* `public` – Public files for the application
    * `dist` – All the files that are actually delivered to the client side. These are compiled by the build system.
    * `lib` – Front-end dependencies are installed here by bower. They are read from here in in the development and test environments, but they are concatenated and minified into `dist` for production.
* `uploads` – This was created by MEAN.JS, and I'm not sure why. We'll probably get rid of it.

For more information about how the code is structured, you can refer to the [MEAN.JS](http://meanjs.org/docs.html#folder-structure) docs. Unfortunately they are a little outdated since ShortcutJunkie is built off a newer version of the project, but they can give you a good idea of where you should look for certain functionality.

#Contributing
Contributions to ShortcutJunkie are welcome. To setup your local development environment, you'll need to do the following.
* Follow the [Prerequisite instructions](http://meanjs.org/docs.html#getting-started) for MEAN.JS.
* Optional: Follow the [Downloading instructions](http://meanjs.org/docs.html#getting-started) for installing MEAN.JS. This is only needed if you want to add new modules to the ShortcutJunkie project.
* Install project dependencies with `npm install`
* Install gulp with `npm install -g gulp`
* Start the project with `gulp`

#Core Team:
- Steven Collier
- Juan Caicedo (retiredcanadianpoet@gmail.com)