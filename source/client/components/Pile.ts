import Gamegui = require('ebg/core/gamegui');
import PopInDialog = require('bga-ts-template/typescript/types/ebg/popindialog');
import { Images } from './Images';
import { DaleCard } from './DaleCard';


declare function $(text: string | Element): HTMLElement;

type SelectionMode = 'none' | 'single' | 'multiple';

/**
 * A component to display a set of cards in a pile.
 * Only displays the size and top card of the pile.
 */
export class Pile {
    private page: Gamegui;
    private cards: DaleCard[];
    private containerHTML: HTMLElement;
    private sizeHTML: HTMLElement;
    private selectedSizeHTML: HTMLElement;
    private topCardHTML: HTMLElement;
    public placeholderHTML: HTMLElement;

    private pile_container_id: string;
    private pile_name: string | undefined;
    private player_id: number | undefined;

    private selectionMode: SelectionMode = 'none';
    private selectionMax: number = 0;
    private popin: PopInDialog = new ebg.popindialog();

    public orderedSelectedCardIds: number[];

    /**
     * Array of cards that are in the pile (they should be in `cards`), but are still animating towards the pile
     */
    private _slidingCards: DaleCard[];

    constructor(page: Gamegui, pile_container_id: string, pile_name?: string, player_id?: number){
        this.pile_container_id = pile_container_id;
        this.pile_name = pile_name;
        this.player_id = player_id;
        $(pile_container_id).innerHTML = `
            ${pile_name ? `<h3 class="name">${pile_name}</h3>` : ""}
            <div class="pile" style="${Images.getCardStyle()}">
                <div class="placeholder" style="${Images.getCardStyle()}"></div>
                <div id="${pile_container_id}-top-card" class="clickable card"></div>
                <div class="size"></div>
                <div class="size" style="top: 16%;"></div>
            </div>
        `;
        this.page = page;
        this.containerHTML = $(pile_container_id);
        this.placeholderHTML = $(pile_container_id).querySelector('.placeholder')!;
        this.topCardHTML = $(pile_container_id).querySelector('.card')!;
        const sizeElements = $(pile_container_id).querySelectorAll('.size')! as unknown as HTMLElement[];
        this.sizeHTML = sizeElements[0]!;
        this.selectedSizeHTML = sizeElements[1]!;
        this.cards = [];
        this._slidingCards = [];
        this.orderedSelectedCardIds = [];
        this.updateHTML();
        dojo.connect(this.topCardHTML, 'onclick', this, "onClickTopCard");
	}

    public get size() {
        return this.cards.length;
    }

    private updateHTML() {
        //TODO: safely remove this
        // if (this.orderedSelectedCardIds.length == 0) {
        //     this.topCardHTML.classList.remove("selected");
        // }
        // else {
        //     this.topCardHTML.classList.add("selected");
        // }
        if (this.selectionMode == 'multiple' && this.selectionMax > 0) {
            this.selectedSizeHTML.classList.remove("hidden");
            this.selectedSizeHTML.innerHTML = `<span style="color: red;">(x ${this.orderedSelectedCardIds.length})</span>`;
        }
        else {
            this.selectedSizeHTML.classList.add("hidden");
        }
        this.sizeHTML.innerHTML = 'x '+this.cards.length;
        let topCard = this.peek(true);
        if (topCard == undefined) {
            //the pile is empty, hide the top card so we can see the placeholder
            this.topCardHTML.setAttribute('style', "display: none");
        }
        else {
            //the pile is non-empty and its content is known, draw the top card of the pile
            this.topCardHTML.setAttribute('style', Images.getCardStyle(topCard.type_id));
        }
    }

    /**
     * Set the z-index for sliding cards. The z-index must be 1 higher for each other sliding card.
     */
    private setZIndex(slidingElement: HTMLElement) {
        const z_index = Images.Z_INDEX_SLIDING_CARD + this._slidingCards.length;
        const style = slidingElement.getAttribute('style');
        slidingElement.setAttribute('style', style+`z-index: ${z_index};`);
    }

    /**
     * Remove a card from the pile at an specific index. Animations are not supported.
     * @param index (optional) - default pop. index in range [0, this.cards.length-1]
     */
    public removeAt(index?: number): DaleCard {
        if (index == undefined) {
            return this.pop();
        }
        if (index > this.cards.length - 1) {
            throw new Error(`Cannot remove a card in pile of size ${this.cards.length} at index ${index}`)
        }
        else if (index == this.cards.length - 1) {
            return this.pop();
        }
        return this.cards.splice(index, 1)[0]!;
    }
    
    /**
     * Insert a card in the pile at a specific index. Animations are not supported.
     * @param card: card to insert in the pile.
     * @param index: location within the pile. Should be in range [0, this.cards.length]
     */
    public insert(card: DaleCard, index: number) {
        if (index > this.cards.length) {
            throw new Error(`Cannot insert a card in pile of size ${this.cards.length} at index ${index}`)
        }
        else if (index == this.cards.length) {
            this.push(card);
        }
        else {
            this.cards.splice(index, 0, card);
        }
    }

     /**
     * Push dummy cards onto the pile. The content of these cards is unknown to the client.
     * @param amount: number of cards to push.
     */
    public pushHiddenCards(amount: number) {
        for (let i = 0; i < amount; i++) {
            this.cards.push(new DaleCard(0, 0));
        }
        this.updateHTML();
    }

    /**
     * Push a card on top of the pile.
     * @param card: card to push on the pile.
     * @param from (optional) when the `from` parameter is specified, the item will be animated from the specified location to the pile.
     * @param onEnd (optional) callback function to execute when the card arived on the pile
     * @param duration (optional) defines the duration in millisecond of the slide. The default is 500 milliseconds.
     * @param delay (optional) defines the delay in millisecond before the slide is executed. The default is 0 milliseconds.
     */
    public push(card: DaleCard, from?: string | HTMLElement, onEnd?: Function | null, duration?: number, delay?: number) {
        this.cards.push(card);
        card.addTooltip(this.topCardHTML.id);
        if (from != null) {
            this._slidingCards.push(card);
            let slidingElement = card.toDiv();
            this.topCardHTML.insertAdjacentElement('afterend', slidingElement);

            let thiz = this;
			let callback = function (node: any) { 
                dojo.destroy( node );
                const i = thiz._slidingCards.indexOf(card);
                if (i > -1) {
                    thiz._slidingCards.splice(i, 1);
                }
                thiz.updateHTML();
                if (onEnd) { 
                    onEnd( node ); 
                }
            };

            this.page.placeOnObject(slidingElement, from)
            var slideAnimation = this.page.slideToObject(slidingElement, this.placeholderHTML, duration, delay) as unknown as dojo._base.Animation;
            var fadeAnimation = dojo.fadeOut({ node: slidingElement, end: callback });
            dojo.fx.chain([slideAnimation, fadeAnimation]).play();
            dojo.addClass( slidingElement, 'to_be_destroyed' );
            this.setZIndex(slidingElement);
        }
        this.updateHTML();
    }

    /**
    * Pop the top card of the pile and destroy it.
    * @param to (optional) the element to animate the item to. When the `to` parameter is specified, the item will be animated from the pile to the location of the to element.
    * @param onEnd (optional) callback function to execute when the card arived at its location
    * @param duration (optional) defines the duration in millisecond of the slide. The default is 500 milliseconds.
    * @param delay (optional) defines the delay in millisecond before the slide is executed. The default is 0 milliseconds.
    */
    public pop(to?: string | HTMLElement | Pile, onEnd?: Function | null, duration?: number, delay?: number): DaleCard {
        if (this.cards.length == 0) {
            throw new Error('Cannot draw from an empty pile. The Server is responsible for reshuffling.');
        }

        //animate card
        if (to != null) {
            if (to instanceof Pile) {
                to = to.placeholderHTML;
            }
            let slidingElement = this.topCardHTML.cloneNode() as HTMLElement;
            this.topCardHTML.insertAdjacentElement('afterend', slidingElement);

			let callback = function (node: any) { 
                dojo.destroy( node ); 
                if (onEnd) { 
                    onEnd( node ); 
                }
            };

            var slideAnimation = this.page.slideToObject(slidingElement, to, duration, delay) as unknown as dojo._base.Animation;
            var fadeAnimation = dojo.fadeOut({ node: slidingElement, end: callback });
            dojo.fx.chain([slideAnimation, fadeAnimation]).play();
            dojo.addClass( slidingElement, 'to_be_destroyed' );
            this.setZIndex(slidingElement);
        }

        //pop the element from the pile, and update the html to reveal the next card in the pile.
        let card = this.cards.pop()!;
        this.updateHTML();
        return card;
    }

    /**
    * Pop all cards from the pile, destroying the entire pile in the process. Adds hidden cards to the provided `drawPile`.
    * @param drawPile pile to add a hidden card to for each card popped.
    * @param duration (optional) defines the total duration in millisecond of the slide.
    */
    public shuffleToDrawPile(drawPile: Pile, duration: number = 1000) {
        if (this.cards.length == 0) {
            return;
        }
        if (this === drawPile) {
            throw new Error('Cannot shuffle to self.');
        }
        let n = this.cards.length;
        let durationPerPop = duration/n;
        let thiz = this;
        let callback = function (node: any) {
            //pop next
            if (thiz.cards.length > 0) {
                thiz.pop(drawPile, callback, durationPerPop);
            }
            //add a hidden card to the drawpile
            drawPile.pushHiddenCards(1);
        };
        if (n > 10) {
            durationPerPop *= 4;
            this.pop(drawPile, callback, durationPerPop);
            this.pop(drawPile, callback, durationPerPop, durationPerPop*1/4);
            this.pop(drawPile, callback, durationPerPop, durationPerPop*2/4);
            this.pop(drawPile, callback, durationPerPop, durationPerPop*3/4);
        }
        else if (n > 5) {
            durationPerPop *= 2;
            this.pop(drawPile, callback, durationPerPop);
            this.pop(drawPile, callback, durationPerPop, durationPerPop*1/4);
        }
        else {
            this.pop(drawPile, callback, durationPerPop);
        }

    }

    /**
    * Get at the top card of the pile without modifying the pile.
    * @param exclude_sliding_cards (optional) default false. If true, return the top non-sliding card in the pile.
    * @returns {DaleCard} top card of the pile (visible).
    */
    public peek(exclude_sliding_cards: boolean = false): DaleCard | undefined {
        if (this.cards.length == 0) {
            //pile is empty, there is no top card
            return undefined;
        }
        let i = this.cards.length - 1;
        if (exclude_sliding_cards) {
            while (i >= 0 && this._slidingCards.indexOf(this.cards[i]!) != -1) {
                i--;
            }
            if (i == -1) {
                //all cards are still flying towards the pile
                return undefined;
            }
        }
        return this.cards[i]!;
    }

    /**
     * User clicked on the top card of the pile. Show the popin.
     */
    public onClickTopCard() {
        const player = this.player_id ? this.page.gamedatas.players[this.player_id] : undefined;
        const title_player = player ? `<span style="font-weight:bold;color:#${player.color}">${player.name}</span>'s ` : "";
        const title_pile_name = this.pile_name ?? "Unnamed Pile";
        const title = title_player + title_pile_name;
        const popin_id = this.pile_container_id+'-popin';
        this.popin.create(popin_id);
		this.popin.setTitle(title);
        this.popin.setMaxWidth(1000);
        this.popin.setContent(`<div id="${popin_id}-card-container" class="popin-card-container"></div>`);
        const container_id = popin_id+"-card-container";
        for (let card of this.cards) {
            const div = card.toDiv(container_id);
            div.classList.add("relative");
            console.log("selectionMode: "+this.selectionMode);
            if(this.selectionMode != 'none') {
                div.classList.add("clickable");
                const thiz = this;
                dojo.connect($(div.id), 'onclick', function() {
                    thiz.onClickCard(card, div);
                });
            }
            if(this.orderedSelectedCardIds.includes(card.id)) {
                div.classList.add("selected");
            }
        }
        dojo.connect($("popin_" + this.popin.id + "_close"), "onclick", this, "onClosePopin");
        this.popin.show();
    }

    /**
     * User clicked on a card within the popin.
     */
    public onClickCard(card: DaleCard, div: HTMLElement){
        console.log(card);
        switch(this.selectionMode) {
            case 'none':
                return;
            case 'single':
                this.popin.hide();
                break;
            case 'multiple':
                const card_id = +card.id;
                const index = this.orderedSelectedCardIds.indexOf(card_id);
                if (index == -1) {
                    //add a card to selection
                    if (this.orderedSelectedCardIds.length >= this.selectionMax) {
                        if (this.selectionMax == 0) {
                            this.page.showMessage(_(`You cannot select cards from this pile!`), 'error');
                        }
                        else if (this.selectionMax == 1) {
                            this.page.showMessage(_(`You can only select 1 card from this pile!`), 'error');
                        }
                        else {
                            this.page.showMessage(_(`You can only select up to ${this.selectionMax} cards from this pile!`), 'error');
                        }
                        return;
                    }
                    div.classList.add("selected");
                    this.orderedSelectedCardIds.push(card_id);
                }
                else {
                    //remove a card from selection
                    div.classList.remove("selected");
                    this.orderedSelectedCardIds.splice(index, 1);
                }
                console.log(this.orderedSelectedCardIds);
                this.updateHTML();
                break;
        }
        (this.page as any).onPileSelectionChanged(this, card);
    }

    /**
     * Set the selection mode for within the popin
     * @param mode 
     * 'none': nothing can be selected
     * 'single': any card can be selected from the popin. the popin is closed upon selection
     * 'multiple': multiple cards can be selected from the popin.
     * @param max (optional) default 0.
     * if selection mode is 'multiple', a maximum number of selected cards is enforced upon the selection
     */
    public setSelectionMode(mode: SelectionMode, max: number = 0) {
        if (mode != 'multiple') {
            this.orderedSelectedCardIds = [];
        }
        if (max < this.selectionMax) {
            this.orderedSelectedCardIds = this.orderedSelectedCardIds.slice(0, max);
        }
        this.selectionMax = max;
        this.selectionMode = mode;
        this.updateHTML();
    }

    /**
     * Triggers when a user closed the popin
     */
    public onClosePopin(){
        console.log("onClosePopin");
        //Delete all tooltips from the popin
        for (let card of this.cards) {
            card.destroyTooltip();
        }
        //Reattach the tooltip of the top card of the pile
        this.cards[this.cards.length-1]?.addTooltip(this.topCardHTML.id);
    }
}
