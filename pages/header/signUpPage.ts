import { by, element, ElementFinder } from "protractor";
import { CommonFunctions } from "../../letBase/common/commonFunctions";

export class SignUp extends CommonFunctions{

    private nameInput: ElementFinder = element(by.id('name'));
    private emailInpupt: ElementFinder = element(by.id('email'));
    private passwordInput: ElementFinder = element(by.id('pass'));
    private tcCheckBox: ElementFinder = element(by.id('agree'));
    private signUpBtn: ElementFinder = element(by.buttonText('SIGN UP'));

    public async enterName(name: string){
        await this.clearAndEnterText(this.nameInput, name);
    }

    public async enterEmail(email: string){
        await this.clearAndEnterText(this.emailInpupt, email);
    }

    public async enterPassword(password: string){
        await this.clearAndEnterText(this.passwordInput, password);
    }

    public async clickTermsAndCondition(){
        await this.click(this.tcCheckBox);
    }

    public async clickSignUpBtn(){
        await this.click(this.signUpBtn);
    }
}