import Gamegui = require('ebg/core/gamegui');
import PopInDialog = require('bga-ts-template/typescript/types/ebg/popindialog');
import { DaleLocation } from './types/DaleLocation';
import { Images } from './Images';
import { DaleCard, OrderedSelection } from './DaleCard';
import { SelectionIconType } from './SelectionIconType';
import { DALE_WRAP_CLASSES, DaleWrapClass } from './types/DaleWrapClass';


declare function $(text: string | Element): HTMLElement;

/**
 * 'none':                      content popin can be viewed, but no cards can be selected
 * 'noneCantViewContent':       content popin can cannot be viewed, and no cards can be selected
 * 'single':                    a single card can be selected from the popin
 * 'singleAnimalfolk'           a single animalfolk card can be selected from the popin
 * 'multiple':                  multiple cards (up to the selectionMax) can be selected from the popin
 * 'multipleJunk':              up to 3 junk cards can be selected from the popin
 * 'multipleFromTopWithGaps':   multiple cards (up to the selectionMax) can be selected from the popin, up to 'selectionMax' cards deep
 * 'multipleFromTopNoGaps':     multiple cards (up to the selectionMax) can be selected from the popin, but they must be adjacent and the top card must be included
 * 'multipleProgrammatic':      multiple cards can be selected programmatically, but NOT by the player
 * 'multiplePrimarySecondary':  multiple cards in both the primary and secondary selection
 * 'top':                       content popin can cannot be viewed, and only the top card of the pile can be selected.
 * 'topIncludingEmpty':         content popin can cannot be viewed, and only the top card (or the empty pile) can be selected.
 * 'sliceOfLife':               only unused CT_SLICEOFLIFE cards may be selected from the popin
 */
type SelectionMode = 'none' | 'noneCantViewContent' | 'single' | 'singleAnimalfolk' | 'multiple' | 'multipleJunk' | 'multipleFromTopWithGaps' | 'multipleFromTopNoGaps' | 'multipleProgrammatic' | 'multiplePrimarySecondary' | 'top' | 'topIncludingEmpty' | 'sliceOfLife';

/**
 * A component to display a set of cards in a pile.
 * Only displays the size and top card of the pile.
 */
export class Pile implements DaleLocation {
    protected page: Gamegui;
    protected cards: DaleCard[];
    private containerHTML: HTMLElement;
    private sizeHTML: HTMLElement;
    private selectedSizeHTML: HTMLElement;
    public topCardHTML: HTMLElement | undefined;
    public placeholderHTML: HTMLElement;
    public previousTopCard: DaleCard | undefined;

    private pile_container_id: string;
    private pile_name: string | undefined;
    private player_id: number | undefined;

    private selectionMode: SelectionMode = 'none';
    private popin: PopInDialog = new ebg.popindialog();
    private isPopinOpen: boolean = false;
    private cardIdToPopinDiv: Map<number, HTMLElement> = new Map<number, HTMLElement>();
    private wrapClass: DaleWrapClass = "daleofmerchants-wrap-default";
    private showMainTitleBarInPopin: boolean = false;
    private openPopinRequested: boolean = false;

    public orderedSelection: OrderedSelection;

    

    /**
     * Array of cards that are in the pile (they should be in `cards`), but are still animating towards the pile
     */
    private _slidingCards: DaleCard[];
    
    constructor(page: Gamegui, pile_container_id: string, pile_name?: string, player_id?: number){
        (page as any).allPiles.push(this);
        this.pile_container_id = pile_container_id;
        this.pile_name = pile_name;
        this.player_id = player_id;
        $(pile_container_id).innerHTML = `
            ${pile_name ? `<h3 class="daleofmerchants-component-name">${pile_name}</h3>` : ""}
            <div class="daleofmerchants-pile" style="${Images.getCardStyle()}">
                <div class="daleofmerchants-pile-size"></div>
                <div class="daleofmerchants-pile-size daleofmerchants-pile-selected-size" style="top: 16%;"></div>
            </div>
        `;
        this.page = page;
        this.containerHTML = $(pile_container_id);
        this.placeholderHTML = Images.getPlaceholder()
        const sizeElements = this.containerHTML.querySelectorAll('.daleofmerchants-pile-size')! as unknown as HTMLElement[];
        this.sizeHTML = sizeElements[0]!;
        this.selectedSizeHTML = sizeElements[1]!;
        this.cards = [];
        this._slidingCards = [];
        this.orderedSelection = new OrderedSelection();
        this.containerHTML.querySelector(".daleofmerchants-pile")?.prepend(this.placeholderHTML);
        this.updateHTML();
        dojo.connect(this.orderedSelection, 'onSelect', this, 'onSelectPileCard');
        dojo.connect(this.orderedSelection, 'onUnselect', this, 'onUnselectPileCard');
        dojo.connect(this.placeholderHTML, 'onclick', this, "onClickPlaceholder");
	}

    public get size() {
        return this.cards.length;
    }

    /**
     * @return owner of this pile
     */
    public getPlayerId() {
        if (this.player_id === undefined) {
            throw new Error(`Pile ${this.pile_container_id} has no player_id`);
        }
        return this.player_id;
    }

    /**
     * @return copy of the internal list of cards in this pile
     */
    public getCards() {
        return this.cards.slice();
    }

    /**
     * Public updateHTML call
     */
    public updateHTMLPublic() {
        this.updateHTML();
    }

    /**
     * Attach the current topCard to the topCardHTML
     */
    protected updateHTML() {
        let topCard = this.peek(true);
        if ((this.selectionMode == 'multiple' || this.selectionMode == 'multipleJunk' || this.selectionMode == 'multipleFromTopWithGaps' || this.selectionMode == 'multipleFromTopNoGaps' || this.selectionMode == 'multipleProgrammatic' || this.selectionMode == 'multiplePrimarySecondary') && this.orderedSelection.getMaxSize() > 0) {
            const selectionSize = this.orderedSelection.getSize() + this.orderedSelection.getSize(true);
            const selectionMaxSize = this.orderedSelection.getMaxSize() + this.orderedSelection.getMaxSize(true);
            if (selectionSize < selectionMaxSize) {
                this.containerHTML.classList.add("daleofmerchants-blinking");
            }
            else {
                this.containerHTML.classList.remove("daleofmerchants-blinking");
            }
            this.selectedSizeHTML.classList.remove("daleofmerchants-hidden");
            this.selectedSizeHTML.innerHTML = `(x ${selectionSize})`;
        }
        else {
            this.selectedSizeHTML.classList.add("daleofmerchants-hidden");
        }
        this.sizeHTML.innerHTML = 'x '+this.cards.length;
        if (!this.isPopinOpen && this.previousTopCard != topCard) {
            this.topCardHTML?.remove();
            this.topCardHTML = undefined;
            if (topCard !== undefined) {
                this.topCardHTML = topCard.toDiv(this.placeholderHTML, 'pile');
                this.topCardHTML.classList.add("daleofmerchants-clickable");
                dojo.connect(this.topCardHTML, 'onclick', this, "onClickTopCard");
            }
            this.previousTopCard = topCard;
        }
        if (this.selectionMode == 'topIncludingEmpty') {
            this.placeholderHTML.classList.add("daleofmerchants-clickable");
        }
        else {
            this.placeholderHTML.classList.remove("daleofmerchants-clickable");
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
     * Remove a card from the pile and instantly place it on the the top. Animations are not supported.
     * @param index (optional) - default pop. index in range [0, this.cards.length-1]
     */
    public moveToTop(card: DaleCard) {
        if (this.cards.length == 0) {
            throw new Error("moveToTop failed: empty pile");
        }
        if (this.cards[this.cards.length-1]!.id == card.id) {
            return; //card is already on top
        }
        for (let index = 0; index < this.cards.length - 1; index++) {
            if (this.cards[index]!.id == card.id) {
                this.removeAt(index);
                this.push(card);
                return;
            }
        }
        console.warn(card);
        throw new Error("moveToTop failed: card not found");
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
        const card = this.cards.splice(index, 1)[0]!;
        this.updateHTML();
        return card;
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
    public push(card: DaleCard, from?: string | HTMLElement | Pile, onEnd?: Function | null, duration?: number, delay?: number) {
        this.cards.push(card);
        if (from) {
            if (from instanceof Pile) {
                from = from.placeholderHTML;
            }
            this._slidingCards.push(card);
            let slidingElement = card.toDiv(this.placeholderHTML);
            this.placeholderHTML.appendChild(slidingElement)
            //this.topCardHTML.insertAdjacentElement('afterend', slidingElement);

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
        if (to) {
            if (to instanceof Pile) {
                to = to.placeholderHTML;
            }
            let slidingElement = this.peek()!.toDiv();
            this.placeholderHTML.appendChild(slidingElement);

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
        card.detachDiv(this.topCardHTML); //this was a very nasty bug: it detached the new div in notifications like 'notif_draw'
        this.updateHTML();
        return card;
    }

    /**
    * Pop all cards from the pile, destroying the entire pile in the process. Adds hidden cards to the provided `drawPile`.
    * @param drawPile pile to add a hidden card to for each card popped.
    * @param duration (optional) defines the total duration in millisecond of the slide.
    * @param maxAmount (optional) if provided, stop after popping `maxAmount` cards
    */
    public shuffleToDrawPile(drawPile: Pile, duration: number = 1000, maxAmount: number = Infinity) {
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
            maxAmount -= 1;
            if (thiz.cards.length > 0 && maxAmount > 0) {
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
    * Pop all cards from the pile, destroying the entire pile in the process. Adds hidden cards to the provided `drawPile`.
    * @param drawPile pile to add a hidden card to for each card popped.
    * @param duration (optional) defines the total duration in millisecond of the slide.
    */
    public shuffleToPile(discardPile: Pile, duration: number = 1000) {
        if (this.cards.length == 0) {
            return;
        }
        if (this === discardPile) {
            throw new Error('Cannot shuffle to self.');
        }
        let n = this.cards.length;
        let durationPerPop = duration/n;
        for (let i = 0; i < n; i++) {
            const card = this.pop();
            if (card.id == 0) {
                throw new Error("shuffleToPile can only be used on piles with known contents. If this is a HiddenPile, call setContent first");
            }
            discardPile.push(card, this, null, durationPerPop, durationPerPop*i);
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
     * @returns If the popin is open, return the card div that corresponds to the specified card_id
     * @param card_id
     */
    public getPopinCardDiv(card_id: number): HTMLElement | undefined {
        return this.cardIdToPopinDiv.get(card_id);
    }

    /**
     * Quick and dirty way to copy all onclick events of buttons from the real "c" to the "maintitlebar_content" in the popin
     * @param source $("maintitlebar_content")
     * @param clone $("maintitlebar_content_clone")
     */
    private cloneEventHandlers(source: HTMLElement, clone: HTMLElement) {
        const sourceElements = source.querySelectorAll("a");
        const cloneElements = clone.querySelectorAll("a");
        if (sourceElements.length != cloneElements.length) {
            console.warn(sourceElements);
            console.warn(cloneElements);
            console.warn("cloneEventHandlers failed: unequal amount of anchor elements found");
            clone.remove();
            return;
        }

        sourceElements.forEach((sourceElement, index) => {
            const cloneElement = cloneElements[index]!;
            if (cloneElement.id != sourceElement.id) {
                console.warn(sourceElements);
                console.warn(cloneElements);
                console.warn(`cloneEventHandlers failed: '${cloneElement.id}' != '${sourceElement.id}'`);
                clone.remove();
                return;
            }

            dojo.connect(cloneElement, "onclick", () => {
                console.warn("Redirect onclick to the related 'maintitlebar_content' button");
                this.openPopinRequested = false; //by default, close the popin
                (sourceElement as HTMLAnchorElement).click(); //may set openPopinRequested to true
                if (!this.openPopinRequested) {
                    this.closePopin(); //arguably better: close the popin in each individual onclick handler. this allows the popin to stay open on errors
                }
            });
        });
    }

    /**
     * Open the pile popin
     */
    public openPopin() {
        this.openPopinRequested = true;
        if (this.isPopinOpen) {
            return;
        }
        console.warn("openPopin");
        this.peek()?.detachDiv();
        const player = this.player_id ? this.page.gamedatas.players[this.player_id] : undefined;
        var title = "";
        if (player) {
            if (this.player_id == this.page.player_id) {
                title = `<span style="font-weight:bold;color:#${player.color}">Your</span> `;
            }
            else {
                title = `<span style="font-weight:bold;color:#${player.color}">${player.name}</span>'s `
            }
            title += this.pile_name?.toLowerCase() ?? "unnamed pile";
        }
        else {
            title += this.pile_name ?? "Unnamed pile";
        }
        const popin_id = this.pile_container_id+'-popin';
        this.popin.create(popin_id);
		this.popin.setTitle(title);
        this.popin.setMaxWidth(1000);
        let maintitlebar = null;
        if (this.showMainTitleBarInPopin) {
            maintitlebar = $("maintitlebar_content")?.cloneNode(true) as HTMLElement;
            maintitlebar.id = "maintitlebar_content_clone";
            setTimeout(() => {
                this.cloneEventHandlers($("maintitlebar_content"), $("maintitlebar_content_clone"));
            }, 1);
            $("maintitlebar_content")?.classList.add("daleofmerchants-transparent");
        }
        this.popin.setContent(`${maintitlebar?.outerHTML ?? ""}<div id="${popin_id}-card-container" class="popin-card-container ${this.wrapClass}"></div>`);
        const container_id = popin_id+"-card-container";
        for (let card of this.cards.slice().reverse()) {
            const div = card.toDiv(container_id, 'stock'); // we show effective values in pile popins, because that's the value you get when building from a pile.
            div.classList.add("daleofmerchants-relative");
            if(this.isClickable(card)) {
                div.classList.add("daleofmerchants-clickable");
                if (this.isClickableHighPriority(card)) {
                    div.classList.add("daleofmerchants-high-priority");
                }
                else {
                    div.classList.remove("daleofmerchants-high-priority");
                }
                const thiz = this;
                dojo.connect(div, 'onclick', function() {
                    thiz.onClickCard(card, div);
                });
            }
            else if (this.isGrayedOut(card)) {
                div.classList.add("daleofmerchants-card-grayed-out");
            }
            this.cardIdToPopinDiv.set(card.id, div);
        }
        dojo.connect($("popin_" + this.popin.id + "_close"), "onclick", this, "onClosePopin");
        this.isPopinOpen = true;
        this.popin.show();
        this.orderedSelection.updateIcons();
        this.orderedSelection.updateIcons(true);
    }

    /**
     * User clicked on the top card of the pile. Show the popin.
     */
    public onClickTopCard() {
        switch(this.selectionMode) {
            case 'top':
            case 'topIncludingEmpty':
                (this.page as any).onSelectPileCard(this, this.peek()!.id);
                break;
            case 'noneCantViewContent':
                break;
            default:
                this.openPopin();
                break;
        }
    }

    /**
     * User clicked on this pile
     */
    public onClickPlaceholder() {
        if (this.size != 0) {
            return; //already handled by onClickCard
        }
        switch (this.selectionMode) {
            case 'topIncludingEmpty':
                (this.page as any).onSelectPileCard(this, undefined);
                break;
        }
    }

    public onUnselectPileCard(card_id: number) {
        (this.page as any).onUnselectPileCard(this, card_id);
    }

    public onSelectPileCard(card_id: number) {
        (this.page as any).onSelectPileCard(this, card_id);
    }

    /**
     * User clicked on a card within the popin.
     */
    public onClickCard(card: DaleCard, div: HTMLElement) {
        console.warn("Clicked on a card in the popin");
        //normal behavior
        switch(this.selectionMode) {
            case 'none':
                return;
            case 'single':
            case 'singleAnimalfolk':
            case 'sliceOfLife':
                (this.page as any).onSelectPileCard(this, card.id);
                this.closePopin();
                break;
            case 'multiple':
            case 'multipleJunk':
                this.orderedSelection.toggle(card.id);
                this.updateHTML();
                break;
            case 'multipleFromTopWithGaps':
                const multipleFromTopWithGaps_nbr = this.orderedSelection.getMaxSize();
                let multipleFromTopWithGaps_index = -1;
                for (let i = Math.max(0, this.cards.length-multipleFromTopWithGaps_nbr); i < this.cards.length; i++) {
                    if (this.cards[i]!.id == card.id) {
                        multipleFromTopWithGaps_index = i;
                        break;
                    }
                }
                if (multipleFromTopWithGaps_index == -1) {
                    this.page.showMessage(_("This card is not within the top cards of the pile")+` (top ${multipleFromTopWithGaps_nbr})`, 'error');
                    return;
                }
                this.orderedSelection.toggle(card.id);
                this.updateHTML();
                break;
            case 'multipleFromTopNoGaps':
                const multipleFromTopNoGaps_nbr = this.orderedSelection.getMaxSize();
                let multipleFromTopNoGaps_index = -1;
                for (let i = Math.max(0, this.cards.length-multipleFromTopNoGaps_nbr); i < this.cards.length; i++) {
                    if (this.cards[i]!.id == card.id) {
                        multipleFromTopNoGaps_index = i;
                        break;
                    }
                }
                if (multipleFromTopNoGaps_index == -1) {
                    this.page.showMessage(_("This card is not within the top cards of the pile")+` (top ${multipleFromTopNoGaps_nbr})`, 'error');
                    return;
                }
                if (this.orderedSelection.includes(card.id)) {
                    //deselect everything below. if nothing was deselected, deselect self
                    let deselect_self = true;
                    for (let i = Math.max(0, this.cards.length-multipleFromTopNoGaps_nbr); i < multipleFromTopNoGaps_index; i++) {
                        if (this.orderedSelection.includes(this.cards[i]!.id)) {
                            deselect_self = false;
                        }
                        this.orderedSelection.unselectItem(this.cards[i]!.id);
                    }
                    if (deselect_self) {
                        this.orderedSelection.unselectItem(this.cards[multipleFromTopNoGaps_index]!.id);
                    }
                }
                else {
                    //select this and everything above
                    for (let i = multipleFromTopNoGaps_index; i < this.cards.length; i++) {
                        this.orderedSelection.selectItem(this.cards[i]!.id);
                    }
                }
                this.updateHTML();
                break;
            case 'multiplePrimarySecondary':
                if (this.orderedSelection.includes(card.id)) {
                    if (this.orderedSelection.getSize(true) < this.orderedSelection.getMaxSize(true)) {
                        //primary => secondary
                        this.orderedSelection.unselectItem(card.id);
                        this.orderedSelection.selectItem(card.id, true);
                    }
                    else {
                        //primary => NONE
                        this.orderedSelection.unselectItem(card.id);
                    }
                }
                else if (this.orderedSelection.includes(card.id, true)) {
                    //secondary => NONE 
                    this.orderedSelection.unselectItem(card.id, true);
                }
                else if (this.orderedSelection.getSize() < this.orderedSelection.getMaxSize()) {
                    //NONE => primary
                    this.orderedSelection.selectItem(card.id);
                }
                else {
                    //NONE => secondary
                    this.orderedSelection.selectItem(card.id, true);
                }
                this.updateHTML();
                break;
        }
    }

    /**
     * Unselect a card_id in the pile popin
     * @param card_id 
     */
    unselectItem(card_id: number) {
        this.orderedSelection.unselectItem(card_id);
    }

    /**
     * Select a card_id in the pile popin
     * @param card_id 
     */
    selectItem(card_id: number) {
        this.orderedSelection.selectItem(card_id);
    }
    
    /**
     * Unselect the top card of this pile (html only)
     */
    unselectTopCard() {
        this.containerHTML?.classList.remove("daleofmerchants-selected");
    }

    /**
     * Select the top card of this pile (html only)
     */
    selectTopCard() {
        this.containerHTML?.classList.add("daleofmerchants-selected");
    }

    //TODO: safely remove this
    // /**
    //  * Moves `maintitlebar_content` to a given parent. If no parent is provided, move it back to the `page-title`
    //  * @param parent (optional) htmlelement to attach the `maintitlebar_content` to.
    //  */
    // private moveMainTitleBar(parent?: HTMLElement | ParentNode | null) {
    //     this.showMainTitleBarInPopin = true;
    //     if (!this.showMainTitleBarInPopin) {
    //         return;
    //     }
    //     const mainTitleBar = $("maintitlebar_content");
    //     if (parent) {
    //         // //create a clone that doesn't have click events, but stays during a fade out
    //         // const mainTitleBarContentClone = mainTitleBarContent.cloneNode(true) as HTMLElement;
    //         // mainTitleBarContentClone.id = "maintitlebar_content_clone";
    //         // parent.prepend(mainTitleBarContentClone);
    //         // parent.prepend(mainTitleBarContent);
    //         parent.prepend(mainTitleBar.cloneNode(true));
    //         $("maintitlebar_content")?.classList.add("daleofmerchants-hidden");
    //     }
    //     else {
    //         $("maintitlebar_content")?.classList.remove("daleofmerchants-hidden");
    //     }
    // }

    /**
     * Give the pile's wrap the specified css class
     */
    private setWrapClass(wrapClass: DaleWrapClass = 'daleofmerchants-wrap-default') {
		if (wrapClass != 'previous') {
			this.containerHTML.classList.remove(...DALE_WRAP_CLASSES);
			if (wrapClass) {
				this.containerHTML.classList.add(wrapClass);
			}
            this.wrapClass = wrapClass;
		}
	}

    /**
     * Set the selection mode for within the popin
     * @param mode see `SelectionIconType`
     * @param iconType
     * @param wrapClass
     * @param max (optional) default 0.
     * @param secondaryIconType (optional) default undefined
     * @param secondaryMax (optional) default 0.
     * if selection mode is 'multiple', a maximum number of selected cards is enforced upon the selection
     */
    public setSelectionMode(mode: SelectionMode, iconType?: SelectionIconType, wrapClass: DaleWrapClass = 'daleofmerchants-wrap-default', max: number = 0, secondaryIconType?: SelectionIconType, secondaryMax = 0) {
        this.setWrapClass(wrapClass);
        this.orderedSelection.setMaxSize(max);
        this.orderedSelection.setMaxSize(secondaryMax, true);
        this.orderedSelection.setIconType(iconType, secondaryIconType);
        this.selectionMode = mode;
        this.showMainTitleBarInPopin = false;
        switch (mode) {
            case 'noneCantViewContent':
                return; //don't update html!
            case 'multiple':
            case 'multipleJunk':
            case 'multipleFromTopWithGaps':
            case 'multipleFromTopNoGaps':
            case 'multipleProgrammatic':
            case 'multiplePrimarySecondary':
                this.showMainTitleBarInPopin = true;
                if (this.orderedSelection.getSize() < this.orderedSelection.getMaxSize()) {
                    this.containerHTML.classList.add("daleofmerchants-blinking");
                }
                else {
                    this.containerHTML.classList.remove("daleofmerchants-blinking");
                }
                //this.openPopin(); //doesn't call openPopin, because of nostalgic item for example
                break;
            case 'single':
            case 'singleAnimalfolk':
                this.showMainTitleBarInPopin = true;
                this.containerHTML.classList.add("daleofmerchants-blinking");
                this.openPopin();
                break;
            case 'sliceOfLife':
                for (const card of this.cards) {
                    if (card.effective_type_id == DaleCard.CT_SLICEOFLIFE && !card.isPassiveUsed()) {
                        this.containerHTML.classList.add("daleofmerchants-blinking");
                        break;
                    }
                }
                break; 
            default:
                this.containerHTML.classList.remove("daleofmerchants-blinking");
                this.orderedSelection.unselectAll();
                this.closePopin();
                break;
        }
        this.updateHTML();
    }

    /**
	 * @returns `true` if the card should be grayed out in the current selection mode (popin only!)
	 */
    private isGrayedOut(card: DaleCard) {
		switch (this.selectionMode) {
            case 'singleAnimalfolk':
            case 'multipleFromTopWithGaps':
            case 'multipleFromTopNoGaps':
            case 'multipleJunk':
                return !this.isClickable(card);
            default:
                return false;
        }
    }

    /**
	 * @returns `true` if card can be clicked in the current selection mode (popin only!)
	 */
	private isClickable(card: DaleCard): boolean {
		switch (this.selectionMode) {
            case 'single':
                return true;
            case 'singleAnimalfolk':
                return card.isAnimalfolk();
			case 'multiple':
				return this.orderedSelection.getMaxSize() > 0;
            case 'multipleJunk':
                return card.isJunk();
            case 'multipleFromTopWithGaps':
            case 'multipleFromTopNoGaps':
                const multipleFromTop_nbr = this.orderedSelection.getMaxSize();
                for (let i = Math.max(0, this.cards.length-multipleFromTop_nbr); i < this.cards.length; i++) {
                    const topCard = this.cards[i]!;
                    if (card === topCard) {
                        return true;
                    }
                }
                return false;
            case 'multiplePrimarySecondary':
                return true;
            case 'sliceOfLife':
                return card.effective_type_id == DaleCard.CT_SLICEOFLIFE
			default:
                return false;
		}
	}

	/**
	 * @returns `true` if the card should be highlighted (usually if `isClickable` is true)
	 * "Hello, please use me!"
	 */
	private isClickableHighPriority(card: DaleCard): boolean {
        switch (this.selectionMode) {
            case 'sliceOfLife':
                return this.isClickable(card);
            default:
                return false;
        }
    }

    /**
     * Close the popin
     */
    public closePopin(){
        if (this.isPopinOpen) {
            console.warn("closePopin");
            this.popin.hide();
            this.onClosePopin();
        }
    }

    /**
     * Triggers when a user closed the popin
     */
    private onClosePopin(){
        console.warn("onClosePopin");
        //Delete all tooltips from the popin
        for (let card of this.cards) {
            card.detachDiv();
        }

        //Reattach the tooltip of the top card of the pile
        this.isPopinOpen = false;
        this.updateHTML();

        //Re-attach the topCard to the topCardHTML
        const topCard = this.peek(true);
        if (topCard && this.topCardHTML) {
            topCard.attachDiv(this.topCardHTML)
        }

        //Move back the titlebar
        $("maintitlebar_content")?.classList.remove("daleofmerchants-transparent");
        const clone = $("maintitlebar_content_clone");
        if (clone) {
            clone.id = "maintitlebar_content_clone_closed";
        }
    }
}
