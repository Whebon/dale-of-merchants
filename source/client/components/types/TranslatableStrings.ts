/**
 * Workaround for when "_" is out of scope (in anonymous functions)
 */
export class TranslatableStrings {
    static get please_select_a_different_player(): string {
        return _("Please select a different player");
    }

    static get players_hand(): string {
        return _("${player_name}\'s hand"); //<player_name>'s hand
    }
}
