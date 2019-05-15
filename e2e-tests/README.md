## Starting the Web Server

First, we need the application to be running via the web-server.
From the project's root directory run:

```
npm start
```

The application should now be available at http://localhost:8000/app.


## Testing with Karma

npm run unit-tests

Karma will run in the background and the tests will automatically re-run each time a change is saved.


## Testing with Protractor

As a one-time setup, download webdriver.

```
npm run update-webdriver
```

Start the Protractor test runner, using the e2e configuration:

```
npm run e2e-tests
```


[protractor]: https://github.com/angular/protractor
