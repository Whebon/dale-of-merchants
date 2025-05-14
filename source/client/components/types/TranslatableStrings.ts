/**
 * Workaround for when "_" is out of scope (in anonymous functions)
 */
export class TranslatableStrings {
    static get please_select_a_different_player(): string {
        return _("Please select a different player");
    }
}
