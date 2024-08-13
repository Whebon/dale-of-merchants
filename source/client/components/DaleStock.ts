import Gamegui = require('ebg/core/gamegui');
import Stock = require('ebg/stock'); 
import "ebg/stock"; 
import { DaleCard } from './DaleCard';
import { Images } from './Images';
import { DaleLocation } from './types/DaleLocation';

type SelectionIcons = 'none' | 'pile' | 'handandpile';

/**
 * Decorator of the standard BGA Stock component.
 */
export class DaleStock extends Stock implements DaleLocation {
	/** Keeps track of the order in which cards in are selected (in !REVERSED! order). */
	private orderedSelectedCardIds: number[];
	public selectionIcons: SelectionIcons = 'none';

	public get selectionMode() {
		return (this as any).selectable;
	}

	/**
	 * Get the order of selection as shown by the selection icons
	 */
	public getSelectionOrder(): number[] {
		return this.orderedSelectedCardIds.slice().reverse();
	}

	constructor(){
		super();
		this.orderedSelectedCardIds = [];
		this.onChangeSelection = function(control_name: string, item_id: number) {
			if (item_id && !this.isSelected(item_id)) {
				this.updateSelectionIcons();
			}
		}
	}
	
	/**
	 * Initialize everything that is needed for a Stock
	 * @param page Gamegui
	 * @param container The div element to attach the stock to. This element should be empty.
	 * @param hideOuterContainer (optional) This element will be hidden iff the stock is empty.
	 * @param onItemCreate (optional) Callback function to execute when a new item is added to the stock
	 * @param onItemDelete (optional) Callback function to execute when a new item is removed from the stock
	 */
	init(page: Gamegui, container: Element, hideOuterContainer?: Element, onItemCreate?: (itemDiv: HTMLElement, typeId: number, itemId: number) => void, onItemDelete?: (itemDiv: HTMLElement, typeId: number, itemId: number) => void) {
		//configure card types
		(page as any).allDaleStocks.push(this);
		for (let i in page.gamedatas.cardTypes) {
			let type_id = page.gamedatas.cardTypes[i]!.type_id;
			this.addItemType(type_id, type_id, g_gamethemeurl + 'img/cards.jpg', type_id);
		}
		this.create( page, container, Images.CARD_WIDTH, Images.CARD_HEIGHT);
		this.resizeItems(Images.CARD_WIDTH_S, Images.CARD_HEIGHT_S, Images.SHEET_WIDTH_S, Images.SHEET_HEIGHT_S);
		this.image_items_per_row = Images.IMAGES_PER_ROW;
		
		//configure callback functions
		this.onItemCreate = function(itemDiv: HTMLElement, typeId: number, itemId: number) {
			if (hideOuterContainer) {
				hideOuterContainer.classList.remove("hidden");
			}
			if (onItemCreate) {
				onItemCreate(itemDiv, typeId, itemId);
			}
		}
		this.onItemDelete = function(itemDiv: HTMLElement, typeId: number, itemId: number) {
			if (hideOuterContainer && this.count() <= 1) {
				hideOuterContainer.classList.add("hidden");
			}
			if (onItemDelete) {
				onItemDelete(itemDiv, typeId, itemId);
			}
		}
		hideOuterContainer?.classList.add("hidden");
	}

	/**
	 * Adds the correct selection icon to the given item_div
	 * @param item_div div to add the selection icon to
	 * @param index index of the item in this.orderedSelectedCardIds
	 */
	private addSelectionIcon(item_div: Element, index: number) {
		let offset = Math.min(7, index);
		if (this.selectionIcons == 'pile') {
			offset += 1;
		}
		const icon = document.createElement("div");
		icon.classList.add("selection-icon");
		icon.setAttribute('style', `
			background-position: -${offset}00%;
		`);
		item_div.appendChild(icon);
	}

	/**
	 * Shift selection icons to ensure the icons remain contiguous. Should be called when the user removes an element from the selection.
	 */
	private updateSelectionIcons() {
		console.log("updateSelectionIcons");
		if (this.selectionIcons != 'none') {
			for (let i = 0; i < this.orderedSelectedCardIds.length; i++) {
				const card_id = this.orderedSelectedCardIds[i]!;
				const item_div = $(this.control_name+"_item_"+card_id);
				if (item_div) {
					item_div.querySelector(".selection-icon")?.remove();
					this.addSelectionIcon(item_div, i);
				}
			}
		}
	}

	/**
	 * Selects the item with the specified unique id.
	 * @param item_id The unique id of the item to be removed from the stock. This id must be unique within the stock and is used to identify the item when removing it from the stock.
	 * @returns {void}
	 */
	override selectItem(item_id: number): void {
		super.selectItem(item_id);
		item_id = +item_id;
		this.orderedSelectedCardIds.push(item_id);
		console.log(this.orderedSelectedCardIds);
		if (this.selectionIcons != 'none') {
			const item_div = $(this.control_name+"_item_"+item_id);
			if (item_div) {
				this.addSelectionIcon(item_div, this.orderedSelectedCardIds.length-1);
			}
		}
	}

	/**
	 * Deselects the item with the specified unique id.
	 * @param item_id The unique id of the item to be removed from the stock. This id must be unique within the stock and is used to identify the item when removing it from the stock.
	 * @returns {void}
	 */
	override unselectItem(item_id: number): void {
		super.unselectItem(item_id);
		item_id = +item_id;
		const index = this.orderedSelectedCardIds.indexOf(item_id);
		this.orderedSelectedCardIds.splice(index, 1);
		console.log(this.orderedSelectedCardIds);
		if (this.selectionIcons != 'none') {
			$(this.control_name+"_item_"+item_id)?.querySelector(".selection-icon")?.remove();
		}
	}

	/**
	 * Sets the selection mode for the stock. The selection mode determines how the user can interact with the items in the stock.
	 * Additionally, it resets the 'orderedSelectedCardIds', which is needed to track the order in the selection
	 */
	override setSelectionMode(mode: 0 | 1 | 2): void {
		if (mode == this.selectionMode) {
			return;
		}
		super.setSelectionMode(mode);
		this.orderedSelectedCardIds = [];
	}

	public setSelectionIcons(type: SelectionIcons) {
		this.selectionIcons = type;
		if (type == 'none') {
			$(this.control_name)?.querySelectorAll(".selection-icon").forEach(icon => icon.remove());
		}
	}

	/**
	 * Function to be called after unbinding chameleon cards. All bound chameleon cards are removed and readded to the stock.
	 * @param card (optional) - if provided, only update this html elements of this card
	 */
	public updateHTML(card?: DaleCard) {
		console.log(`updateHTML for DaleStock '${this.control_name}'`);
		if (card) {
			if (card.isBoundChameleon()) {
				this.addChameleonOverlay(card);
			}
			else {
				this.removeChameleonOverlay(card);
			}
			// console.log("remove and add "+card.id);
			// this.removeFromStockById(card.id);
			// this.addDaleCardToStock(card);
		}
		else {
			for (let item of this.getAllItems()) {
				this.updateHTML(new DaleCard(item.id, item.type));
			}
			//TODO: safely delete this
			// console.log("AAAA");
			//Remove outdated chameleon overlays. WARNING: will not add missing chameleon overlays!
			// const chameleonIcons = this.container_div.querySelectorAll('.chameleon-icon');
			// chameleonIcons.forEach(icon => {
			// 	const overlay = icon.parentElement!;
			// 	const html_id = overlay.parentElement!.id;
			// 	const match = html_id.match(/\d+$/);
			// 	if (match) {
			// 		const card_id = +match[0];
			// 		const card = new DaleCard(card_id);
			// 		if (!card.isBoundChameleon()) {
			// 			dojo.fadeOut({node: overlay, onEnd: function (node: any){dojo.destroy(node);}}).play();
			// 			//Alternative animation:
			// 			// this.removeFromStockById(card_id);
			// 			// this.addDaleCardToStock(card);
			// 		}
			// 	}
			// });
		}
	}

	/**
	 * Replace the chameleon card overlay on top of the stock item with an animation. If the same type of overlay already exists, nothing will be done
	 * @param card dale card to add an overlay to
	 * @param fadein (default) true. If true, the overlay will be added with a fade in animation
	 */
	public addChameleonOverlay(card: DaleCard, fadein: boolean = true) {
		const stockitem = $(this.control_name+"_item_"+card.id);
		if (!stockitem) {
			return;
		}
		const old_overlay = stockitem?.querySelector(".card");
		if (old_overlay) {
			if (old_overlay.classList.contains("type-id-"+card.effective_type_id)) {
				return;
			}
			this.removeChameleonOverlay(card);
		}
		const overlay = card.toDiv();
		overlay.classList.add("type-id-"+card.effective_type_id);
		stockitem.appendChild(overlay);
		if (fadein) {
			dojo.setStyle(overlay, 'opacity', '0');
			dojo.fadeIn({node: overlay}).play();
		}
		card.addTooltip(stockitem as HTMLElement);
	}

	/**
	 * Remove the chameleon card overlay on top of the stock item with an animation
	 * @param card_id
	 */
	public removeChameleonOverlay(card: DaleCard) {
		const stockitem = $(this.control_name+"_item_"+card.id);
		const old_overlay = stockitem?.querySelector(".card") as HTMLElement;
		if (old_overlay) {
			dojo.fadeOut({node: old_overlay, onEnd: function (node: HTMLElement){dojo.destroy(node);}}).play();
			card.addTooltip(stockitem as HTMLElement);
		}
	}

	/** 
	 * Add a `DaleCard` to a stock. Always use this instead of addToStockWithID. This ensures that the type id of the card id is registered in the `DaleCard` class.
	 * @param card card to add to the stock
	 * @param from The element to animate the item from. When the `from` parameter is specified, the item will be created at the location of the from element and animate to the stock. The location create is always an absolute position at the top left of the from div. This is optional and can be used to animate the item from a specific location on the page. If this is not specified, the item will be created and placed immediately inside the stock.
	*/
	public addDaleCardToStock(card: DaleCard, from?: string | HTMLElement) {
		this.addToStockWithId(card.original_type_id, card.id, from);
		card.addTooltip(this.control_name+'_item_'+card.id);
		if (card.isBoundChameleon()) {
			this.addChameleonOverlay(card, false);
		}
	}

	/**
	 * Modified version of a Stock's "removeFromStockById" without any animations. (see https://x.boardgamearena.net/data/themereleases/220811-1000/js/modules/stock.js)
	 * @param stock Stock to remove a card id from
	 * @param id card id to be removed
	 * @param boolean `true` if the id was in the stock
	 */
	public removeFromStockByIdNoAnimation(id: number): boolean {
		//WARNING: this function modifies private fields of the underlying Stock
        let stock: any = this; //type-safety is off
		for(let i in stock.items){
			let item = stock.items[i];
			if(item.id == id){
				let item = stock.items[i];
		
				// Item deletion hook (allow user to perform some additional item delete operation)
				if(stock.onItemDelete){   
					stock.onItemDelete(stock.getItemDivId(item.id), item.type, item.id);  
				}
				stock.items.splice( i, 1 );
		
				// Trigger immediately the disappearance of corresponding item
				var item_id = stock.getItemDivId( item.id );
				stock.unselectItem( item.id );
				var item_div = $( item_id );
				dojo.destroy(item_div);

				stock.updateDisplay();
				return true;
            }   
        }
        return false;
	}
}

//new ebg.stock();