#Genomizer Web Project
This project is the web client for the Genomizer project.

##Backbone
Genomizer Web project uses Backbone as main framework with the following dependencies:
* Backbone - main application framework.
* Bootstrap - CSS and frontend design.
* JQuery
* Underscore - Templating
* Dragster - Javascript library for drag and drop into the browser.

##How to install to Apache
1. Clone the project into your apache2 www directory:
`git clone git@github.com:genomizer/genomizer-web.git'`

2. Setup a proxy path in your apache for /api/ to a genomizer server.
`ProxyPass /api/ "url of java server`

