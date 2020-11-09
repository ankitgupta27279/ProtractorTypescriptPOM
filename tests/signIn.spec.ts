import { browser } from "protractor";
import { Common } from "../pages/common/common";
import { Header } from "../pages/header/headerPage"
import { SignIn } from "../pages/header/signInPage";
import { mockSignInUser } from "../fixtures/signin.fixture";
import * as testData from "../test-data/userInfo.json";

const header = new Header();
const signIn = new SignIn();
const common = new Common();

describe('Sign In-Let Code', () => {

    beforeAll(async () => {
        await browser.manage().window().maximize();
        await browser.manage().timeouts().implicitlyWait(10000);
    });

    beforeEach(async () => {
        await browser.get('https://letcode.in/');
        await header.clickLogin();
    });

    fit('TC005 To verify that user can login successfully', async () => {
        // await signIn.enterEmail(testData.login.email);
        // await signIn.enterPassword(testData.login.password);
        await signIn.enterEmail(mockSignInUser.email);
        await signIn.enterPassword(mockSignInUser.password);
        await signIn.clickSignInBtn();
        await common.validateToast(testData.login.welcome_message);
        await header.signOutIsDisplay();
        await header.clickSignOut();
    });

    it('TC006 To verify that login fails', async () => {
        await signIn.enterEmail(testData.login.wrong_email);
        await signIn.enterPassword(testData.login.password);
        await signIn.clickSignInBtn();
        await common.validateToast(testData.login.invalid_email);
    });

    it('TC007 To verify that login fails', async () => {
        await signIn.enterEmail(testData.login.email);
        await signIn.enterPassword(testData.login.wrong_password);
        await signIn.clickSignInBtn();
        await common.validateToast(testData.login.invalid_password);
    });
});