Package.describe({
  name: 'liberation:rest-jsend-error-handler',
  version: '1.0.0',

  // Brief, one-line summary of the package.
  summary: 'middleware for handling standard Connect errors',

  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/stubailo/meteor-rest',

  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
});

Package.onUse(function (api) {
  api.versionsFrom('1.0');
  api.use('simple:json-routes@2.1.0');
  api.addFiles('jsend_error_handler.js', 'server');
});

Package.onTest(function (api) {
  api.use([
    'http',
    'simple:json-routes@2.1.0',
    'simple:rest-jsend-error-handler',
    'test-helpers',
    'tinytest',
  ]);

  api.addFiles('jsend_error_handler_tests.js');
});
