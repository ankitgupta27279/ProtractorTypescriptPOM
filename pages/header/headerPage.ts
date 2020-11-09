import { by, element, ElementFinder } from "protractor";
import { CommonFunctions } from "../../letBase/common/commonFunctions";

export class Header extends CommonFunctions{

    private signUpButton: ElementFinder = element(by.linkText('Sign up')); //a/strong[text()='Sign up']
    // private signUpButton = element(by.xpath('//a/strong[text()="Sign up"]')); 
    private logInButton: ElementFinder = element(by.linkText('Log in'));
    private signOutButton: ElementFinder = element(by.linkText('Sign out'));

    public async clickSignUp(){
        await this.click(this.signUpButton);
    }

    public async clickLogin(){
        await this.click(this.logInButton);
    }

    public async clickSignOut(){
        await this.click(this.signOutButton);
    }

    public async signOutIsDisplay(){
        await this.assertElementDisplayedOnPage(this.signOutButton);
        console.log(await this.signOutButton.getText());
    }
} 