/**
 * Automatically generate based on material.xlsx
 */
export class AnimalfolkDetails {
    public static readonly COMPLEXITY = 1;
    public static readonly INTERACTIVITY = 2;
    public static readonly NASTINESS = 3;
    public static readonly RANDOMNESS = 4;
    public static readonly GAME = 5;

    public static getColumnIndex(categoryName: string): number {
        switch(categoryName) {
            case 'complexity':
                return AnimalfolkDetails.COMPLEXITY;
            case 'interactivity':
                return AnimalfolkDetails.INTERACTIVITY;
            case 'nastiness':
                return AnimalfolkDetails.NASTINESS;
            case 'randomness':
                return AnimalfolkDetails.RANDOMNESS;
            case 'game':
                return AnimalfolkDetails.GAME;
            default:
                throw new Error(`Category '${categoryName}' is not a valid AnimalfolkDetails category`)
        }
    }
    
    public static get(animalfolk_id: number, column: number): number {
        const row = AnimalfolkDetails.TABLE[animalfolk_id-1];
        if (!row) {
            throw new Error(`AnimalfolkDetails is missing a values for animalfolk_id = ${animalfolk_id}`);
        }
        return row[column]!;
    }

    private static readonly TABLE = [
        [1, 1, 1, 0, 1, 1],
        [2, 1, 2, 0, 1, 1],
        [3, 1, 3, 3, 2, 1],
        [4, 1, 2, 0, 1, 1],
        [5, 2, 3, 2, 3, 1],
        [6, 3, 2, 0, 1, 1],
        [7, 1, 1, 0, 1, 2],
        [8, 2, 1, 0, 1, 2],
        [9, 2, 3, 3, 1, 2],
        [10, 3, 3, 2, 2, 2],
        [11, 1, 2, 0, 3, 2],
        [12, 3, 3, 0, 1, 2],
        [13, 1, 1, 0, 1, 3],
        [14, 1, 1, 0, 2, 3],
        [15, 3, 3, 3, 2, 3],
        [16, 2, 3, 1, 2, 3],
        [17, 2, 1, 0, 3, 3],
        [18, 2, 1, 0, 1, 3],
        [19, 2, 1, 0, 1, 4],
        [20, 2, 1, 0, 1, 4],
        [21, 2, 3, 3, 1, 4],
        [22, 2, 3, 2, 2, 4],
        [23, 2, 1, 0, 1, 4],
        [24, 3, 1, 0, 1, 4],
        [25, 2, 1, 0, 1, 5],
        [26, 3, 1, 0, 1, 5],
        [27, 2, 1, 0, 2, 5],
        [28, 1, 2, 1, 1, 5],
        [29, 3, 3, 3, 3, 5],
        [30, 3, 1, 0, 1, 5],
        [31, 1, 1, 0, 1, 6],
        [32, 1, 2, 0, 1, 6],
        [33, 2, 3, 1, 2, 6],
        [34, 2, 1, 0, 1, 6],
        [35, 3, 1, 0, 1, 6],
        [36, 3, 3, 3, 2, 6]
    ]
    
    private static FLAVOUR_TEXTS: string[] = []

    public static getFlavourText(animalfolk_id: number): string {
        if (AnimalfolkDetails.FLAVOUR_TEXTS.length == 0) {
            AnimalfolkDetails.FLAVOUR_TEXTS = [
                _("Macaws help you manage your hand of cards. New players like their opportunistic nature while seasoned players use them to optimise their play."),
                _("Pandas are close friends with the market keepers and benefit from that. They're great for beginners and players wanting a more peaceful game."),
                _("Raccoons are a great addition for players wanting some conflict. They don't care about the definition of 'ownership'. You have been warned!"),
                _("No one can set up their stall faster than squirrels. Inexperienced players like these hoarders, while experts can pull off nice combos with them."),
                _("Ocelots can give you an edge if luck is on your side. Add these to the game when you want to introduce a little havoc to your contest!"),
                _("Chameleons make you play your cards as if they're other cards in the game. They are recommended for more experienced players with long-term plans."),
                _("Platypuses get the right cards into their hands at the right time. Rookies grasp platypuses quickly and experienced players like to try out new things with them."),
                _("You need to make plans with sloths if you don't want to waste their delayed effects. Feel free to include them even in your first game - just don't expect to be able to unleash their full potential right away!"),
                _("Crocodiles bully other competitors by stealing their property and making threats. Invite crocodiles if you want interaction and conflict!"),
                _("Foxes love to get everyone involved. Other folks are wary of their seemingly friendly gestures, but can't resist foxes' tempting aid. Playing with them requires skill as timing can be critical with foxes."),
                _("No mountain is too tall or ocean too deep for polecats! These brave adventurers live for danger and aren't afraid of taking chances. Feeling lucky?"),
                _("Owls wait patiently for their target to make a move before making their own. They are great at adding more interaction between players and will keep you on your toes. Stay vigilant!"),
                _("Monitors excel at manipulating their discard piles. Do you have great cards in your discard and useless junk in your deck? You can fix that in no time with the monitors!"),
                _("Getting rid of old items and trying out new things is second nature to the rather impatient lemurs. Don't get too attached to your cards and introduce them to your game!"),
                _("Magpies are choosy thieves. They try to steal only specific items and nothing more. You need to keep an eye on your opponents to utilise magpies to their full potential. For advanced players only!"),
                _("Echidnas borrow cards from everyone, but at least they always leave something as a replacement. Add them in when you want a lot of interaction between players without straight-out stealing."),
                _("Statistics and calculations or blind trust in beliefs from previous generations? Hares introduce luck, but you can do a lot to play around it with precise timing and careful preparations."),
                _("Kangaroos are excellent at hiding their valuables and creating diversions for mischief makers. However, their techniques are useful even when no one is playing dirty."),
                _("Tuataras benefit from the riches gathered by their ancestors. You can save up gold and gain new options, including purchasing expensive cards more easily."),
                _("nan"),
                _("Capuchins. Warning: this deck has placeholder names and artwork"),
                _("nan"),
                _("Penguins give you potent effects for tough situations. Their power comes at a cost which seasoned players can turn into an advantage."),
                _("Turtles like to play new techniques but struggle to finish them. If you're not careful, everything can come to a standstill. You will have to think around this."),
                _("Skinks. Warning: this deck has placeholder names and artwork"),
                _("Do you have what it takes to create a plan and then execute it with precision? Master beavers to unleash awesome combos! They are recommended for a bit more experienced players."),
                _("Snow Macaques. Warning: this deck has placeholder names and artwork"),
                _("Gulls absolutely love gifting junk to their opponents to slow them down! Novices can get the hang of them pretty fast. Just be prepared for a slightly slower game."),
                _("Pangolins cause destruction by being so absent-minded. Even more skilled players may have trouble exploiting their potential without it backfiring."),
                _("nan"),
                _("nan"),
                _("nan"),
                _("Tasmanian devils are your best bet if you want to mess up your opponents' plans! They're not ones to steal, but they do enhance it if you invite those that are."),
                _("Junglefowls. Warning: this deck has placeholder names and artwork"),
                _("Mongooses work hard during the day. Managing your tempo becomes increasingly important as you try to benefit more from them than your opponents do."),
                _("Bats appear innocent during the day, but just wait for the night to set in! Your possessions will end up either missing or destroyed by the time dawn approaches.")
            ]
        }
        const text = AnimalfolkDetails.FLAVOUR_TEXTS[animalfolk_id-1];
        return text ?? "MISSING FLAVOUR TEXT";
    }
}
