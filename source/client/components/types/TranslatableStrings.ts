/**
 * Workaround for when "_" is out of scope (in anonymous functions)
 */
export class TranslatableStrings {
    static readonly please_select_a_different_player: string = _("Please select a different player");
}
