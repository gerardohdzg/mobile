const ForYouPage = require('../pageobjects/ForYou.page');
const Navigation = require('../pageobjects/components/NavigationBar');
const LoginPage = require('../pageobjects/Login.page');
const MyPlaceItPage = require('../pageobjects/MyPlaceIt.page');
const Settings = require('../pageobjects/components/Settings');
const {
    ClassicRunner,
    RunnerOptions,
    Eyes,
    Target,
    Configuration,
    RectangleSize,
    BatchInfo,
    BrowserType,
    DeviceName,
    ScreenOrientation,
    MatchLevel
} = require('@applitools/eyes-webdriverio');

let eyes;
let configuration;
let runner;


describe('Login Flow', () => {

    before(async () => {
        const runnerOptions = new RunnerOptions().testConcurrency(5);
        runner = new ClassicRunner(runnerOptions);
        eyes = new Eyes(runner);
        if (browser.config.enableEyesLogs) {
            eyes.setLogHandler(new ConsoleLogHandler(true));
        }
        configuration = eyes.getConfiguration();
        configuration.setApiKey("97989WCi5CuWjrSbEdNTT7wZtnfD8LP6URXFrGBjbz3Es110")
        configuration.setBatch(new BatchInfo('Classic Batch'))
    });

   
    afterEach(async () => {
        await eyes.abortAsync();
    });

    after(async () => {
        const results = await runner.getAllTestResults(false);
        console.log(results);
    });



    it('should allow access when credentials are vallid', async () => {
        configuration.setAppName('PlaceIt');
        configuration.setTestName('Login allowed with valid credentials');
        eyes.setConfiguration(configuration);
        browser = await eyes.open(browser);
        await ForYouPage.title.waitForDisplayed();
        await eyes.check('For You Page', Target.window().matchLevel(MatchLevel.Layout));
        await Navigation.myPlaceIt.click();
        await eyes.check('Login Screen', Target.window().fully().matchLevel(MatchLevel.Strict));

        await LoginPage.signIn('gerardo.hernandez+100@envato.com', 'Envat0');
        await expect(MyPlaceItPage.title).toBeDisplayed();
        await expect(MyPlaceItPage.settingsIcon).toBeDisplayed();
        
        await MyPlaceItPage.settingsIcon.click();
        await expect(Settings.logout).toBeDisplayed();
        await Settings.logout.click();
        await eyes.close();
    });

    it('should deny access if the credentials are invalid', async () => {
        configuration.setAppName('PlaceIt');
        configuration.setTestName('Login denied with invalid credentials');
        eyes.setConfiguration(configuration);
        browser = await eyes.open(browser);
        browser.reset();
        await ForYouPage.title.waitForDisplayed();
        await Navigation.myPlaceIt.click();
        await LoginPage.signIn('gerardo.hernandez+100@envato.com', 'EnvatO');
        await expect($('//android.view.View[@resource-id="error-message"]')).toBeDisplayed();
        await eyes.check('Login Screen Invalid', Target.window().fully().matchLevel(MatchLevel.Strict));
        await expect(MyPlaceItPage.title).not.toBeDisplayed();
        await eyes.close();
    });
});