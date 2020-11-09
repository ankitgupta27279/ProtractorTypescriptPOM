import { by, element, ElementFinder } from "protractor";
import { CommonFunctions } from "../../letBase/common/commonFunctions";

export class SignIn extends CommonFunctions{

    private emailInput: ElementFinder = element(by.name('email'));
    private passwordInput: ElementFinder = element(by.name('password'));
    private signInBtn: ElementFinder = element(by.buttonText('LOGIN'));
    private forwordPasswordBtn: ElementFinder = element(by.buttonText('Forgotten password?'));

    public async enterEmail(email: string){
        await this.clearAndEnterText(this.emailInput, email);
    }

    public async enterPassword(password: string){
        await this.clearAndEnterText(this.passwordInput, password);
    }

    public async clickSignInBtn(){
        await this.click(this.signInBtn);
    }

    public async clickForgotPasswordBtn(){
        await this.click(this.forwordPasswordBtn);
    }
}