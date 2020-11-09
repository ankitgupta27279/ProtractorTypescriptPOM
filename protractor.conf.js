let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
let AllureReporter = require('jasmine-allure-reporter');

exports.config = {
    framework: 'jasmine',
    directConnect: 'true',
    SELENIUM_PROMISE_MANAGER: false,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000,
        print: function () { }
    },
    specs: [
        // "tests/signUp.spec.ts",
        "tests/signIn.spec.ts"
    ],
    onPrepare() {
        require('ts-node').register({
            project: require("path").join(__dirname, "./tsconfig.json")
        });
        jasmine.getEnv().addReporter(new SpecReporter({
            //   spec: {
            //     displayStacktrace: true
            //   }
            suite: {
                displayNumber: true // display each suite number hierarchly
            },
            spec: {
                displayPending: false, // display each pending spec
                displayDuration: true // display each spec duration
            },
            summary: {
                displaySuccesses: true, // display summary of all successes after execution
                displayFailed: true, //display summary of all failures after execution
                displayPending: true // display summary of all pending specs after execution
            }
        }));
        jasmine.getEnv().addReporter(new AllureReporter());
        jasmine.getEnv().afterEach(function (done) {
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
                done();
            })
        });
        jasmine.getEnv().beforeEach(function (done) {
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
                done();
            })
        });
    }
};