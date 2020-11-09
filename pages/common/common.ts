import { $} from "protractor";
import { CommonFunctions } from "../../letBase/common/commonFunctions";

export class Common extends CommonFunctions {

    private toast = $('.toast-message');

    public async validateToast(message: string) {
        await this.visibilityOf(this.toast);
        await this.assertText(this.toast, message);
        await this.invisibilityOf(this.toast);
    }

}