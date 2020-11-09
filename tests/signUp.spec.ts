import { browser } from "protractor";
import { Common } from "../pages/common/common";
import { Header } from "../pages/header/headerPage";
import { SignUp } from "../pages/header/signUpPage";
import { mockSignUpUser } from "../fixtures/signup.fixture";
import * as testData from "../test-data/userInfo.json";

const header = new Header();
const signUp = new SignUp();
const common = new Common();

describe('Login-LetCode', () => {

    beforeAll(async () => {
        await browser.manage().window().maximize();
        await browser.manage().timeouts().implicitlyWait(10000);
    });

    beforeEach(async () => {
        await browser.get('https://letcode.in/');
        await header.clickSignUp();
    });

    fit('TC001 To verify that user can sign up successfully', async () => {
        let name = mockSignUpUser().name;
        let email = mockSignUpUser().email;
        let password = mockSignUpUser().password;
        console.log('name--->', name);
        console.log('email--->', email);
        console.log('password--->', password);
        // await signUp.enterName(testData.signup.name);
        // await signUp.enterEmail(testData.signup.email);
        // await signUp.enterPassword(testData.signup.password);
        await signUp.enterName(name);
        await signUp.enterEmail(email);
        await signUp.enterPassword(password);
        await signUp.clickTermsAndCondition();
        await signUp.clickSignUpBtn();
        await header.signOutIsDisplay();
        await header.clickSignOut();
    });

    it('TC002 To verify that sign up fails', async () => {
        await signUp.clickSignUpBtn();
        await common.validateToast(testData.signup.invalid_email);
    });

    it('TC003 To verify that sign up fails', async () => {
        await signUp.enterEmail(testData.signup.email);
        await signUp.clickSignUpBtn();
        await common.validateToast(testData.signup.invalid_password);
    });

    it('TC004 To verify that sign up fails', async () => {
        await signUp.enterPassword(testData.signup.password);
        await signUp.clickSignUpBtn();
        await common.validateToast(testData.signup.invalid_email);
    });
});