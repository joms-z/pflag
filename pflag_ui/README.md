# pflag-ui

## To build
Clone the app.

Run `npm install`
Make sure you've Ruby installed. Run `gem install compass`.
Then run `bower install`.

To serve the application, run `grunt serve`

## To have the database integration
Have MongoDB server installed on the machine

Then create a `/data` folder under pflag-ui. and run
`mongod --dbpath <PATH_TO_THE_DATA_FOLDER>` from the `MongoDB/Server/3.2/bin` folder

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.
