import { DaleDeckSelection } from "./DaleDeckSelection";

type DieType = 'ocelot' | 'polecat' | 'hare' | 'pangolin1' | 'pangolin2';

export class DaleDie {
    private type: DieType;
    private parent: HTMLElement;
    public container: HTMLElement;
    public die: HTMLElement;

    static readonly DIE_OCELOT_0: number = 1;
    static readonly DIE_OCELOT_1: number = 2;
    static readonly DIE_OCELOT_2: number = 3;
    static readonly DIE_OCELOT_3: number = 4;

    static readonly DIE_POLECAT_1: number = 5;
    static readonly DIE_POLECAT_2: number = 6;
    static readonly DIE_POLECAT_3: number = 7;

    static readonly DIE_STARS: number = 8;
    static readonly DIE_PLANET: number = 9;
    static readonly DIE_PLANET_REROLL: number = 10;
    static readonly DIE_COMET: number = 11;

    static readonly DIE_DECK: number = 12;
    static readonly DIE_DISCARD: number = 13;
    static readonly DIE_HAND: number = 14;

    static readonly DIE_DECK2: number = 15;
    static readonly DIE_DISCARD2: number = 16;
    static readonly DIE_HAND2: number = 17;

    //TODO: safely remove this
    // private static results: Record<DieType, string[]> = {
    //     "ocelot":     ['0', '1', '1', '2', '2', '3'],
    //     "polecat":    ['1', '1', '2', '2', '3', '3'],
    //     "hare":       ['stars', 'stars', 'planet', 'planet', 'reroll planet', 'comet'],
    //     "pangolin1":  ['discard', 'discard', 'deck', 'deck', 'deck', 'hand'],
    //     "pangolin2":  ['discard', 'discard', 'deck', 'deck', 'deck', 'hand']
    // };

    constructor(animalfolk_id: number, d6: 0|1|2|3|4|5, name_displayed: string, parentHTML: HTMLElement) {
        //construct the die
        switch(animalfolk_id) {
            case DaleDeckSelection.ANIMALFOLK_OCELOTS:
                this.type = 'ocelot';
                break;
            case DaleDeckSelection.ANIMALFOLK_POLECATS:
                this.type = 'polecat';
                break;
            case DaleDeckSelection.ANIMALFOLK_HARES:
                this.type = 'hare';
                break;
            case DaleDeckSelection.ANIMALFOLK_PANGOLINS:
                this.type = 'pangolin1';
                break;
            case DaleDeckSelection.ANIMALFOLK_PANGOLINS+3:
                this.type = 'pangolin2';
                break;
            default:
                throw new Error(`Animalfolk ${animalfolk_id} has no die`);
        }
        this.parent = parentHTML;
        this.container = document.createElement('div');
        this.container.classList.add("dale-die-container");
        this.container.innerHTML = `
            <div class="dale-die" type="${this.type}" side="1">
                <div class="dale-die-side dale-die-side-1"></div>
                <div class="dale-die-side dale-die-side-2"></div>
                <div class="dale-die-side dale-die-side-3"></div>
                <div class="dale-die-side dale-die-side-4"></div>
                <div class="dale-die-side dale-die-side-5"></div>
                <div class="dale-die-side dale-die-side-6"></div>
            </div>
            <div class="dale-die-result"></div>
        `;
        this.parent.appendChild(this.container);
        this.die = this.container.querySelector(".dale-die")!;

        //roll the die
        this.die.setAttribute('side', String(d6+1));
        setTimeout((() => {
            this.die.classList.toggle('dale-roll');
        }).bind(this), 1)

        //show the result after 1000ms
        const resultLabel = this.die.parentElement?.querySelector('.dale-die-result') as HTMLElement;
        if (resultLabel) {
            resultLabel.classList.remove('dale-die-reveal');
            resultLabel.classList.add('dale-die-hide');
            resultLabel.innerHTML = `You rolled ${name_displayed}.`;
            setTimeout(() => {
              resultLabel.classList.add('dale-die-reveal');
              resultLabel.classList.remove('dale-die-hide');
            }, 1000);
        }

        //fade out the die after 1500ms
        const thiz = this;
        setTimeout((() => {
            dojo.fadeOut({node: thiz.container, onEnd: function (node: HTMLElement) { dojo.destroy(node);}}).play();
        }), 1500)
    }

    public static getIconTpl(die_icon: number): string {
        var col, row;
        switch(die_icon) {
            //ocelots (row = 0)
            case DaleDie.DIE_OCELOT_0:
                row = 0;
                col = 0;
                break;
            case DaleDie.DIE_OCELOT_1:
                row = 0;
                col = 1;
                break;
            case DaleDie.DIE_OCELOT_2:
                row = 0;
                col = 3;
                break;
            case DaleDie.DIE_OCELOT_3:
                row = 0;
                col = 5;
                break;
            //polecats (row = 1)
            case DaleDie.DIE_POLECAT_1:
                row = 1;
                col = 0;
                break;
            case DaleDie.DIE_POLECAT_2:
                row = 1;
                col = 2;
                break;
            case DaleDie.DIE_POLECAT_3:
                row = 1;
                col = 4;
                break;
            //hares (row = 2)
            case DaleDie.DIE_STARS:
                row = 2;
                col = 0;
                break;
            case DaleDie.DIE_PLANET:
                row = 2;
                col = 2;
                break;
            case DaleDie.DIE_PLANET_REROLL:
                row = 2;
                col = 4;
                break;
            case DaleDie.DIE_COMET:
                row = 2;
                col = 5;
                break;
            //pangolins1 (row = 3)
            case DaleDie.DIE_DISCARD:
                row = 3;
                col = 0;
                break;
            case DaleDie.DIE_DECK:
                row = 3;
                col = 2;
                break;
            case DaleDie.DIE_HAND:
                row = 3;
                col = 6;
                break;
            //pangolins2 (row = 4)
            case DaleDie.DIE_DISCARD2:
                row = 4;
                col = 0;
                break;
            case DaleDie.DIE_DECK2:
                row = 4;
                col = 2;
                break;
            case DaleDie.DIE_HAND2:
                row = 4;
                col = 6;
                break;
        }
        return `<i class="dale-die-side dale-icon" style="background-position: -${col}00% -${row}00%;"></i>`
    }
}