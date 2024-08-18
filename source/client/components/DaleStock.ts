import Gamegui = require('ebg/core/gamegui');
import Stock = require('ebg/stock'); 
import "ebg/stock"; 
import { DaleCard } from './DaleCard';
import { Images } from './Images';
import { DaleLocation } from './types/DaleLocation';
import { OrderedSelection, SelectionIconType } from './OrderedSelection';

/**
 * Ordered selection for a stock
 */
class StockOrderedSelection extends OrderedSelection {
    private _stock: Stock;

    constructor(stock: Stock) {
        super();
        this._stock = stock;
    }

    protected override getDiv(card_id: number): Element | null {
        return $(this._stock.control_name+"_item_"+card_id);
    }
}

type DaleWrapClass = 'dale-wrap-technique' | 'dale-wrap-purchase' | 'dale-wrap-build' | 'dale-wrap-discard' | 'dale-wrap-default';

/**
 * Decorator of the standard BGA Stock component.
 */
export class DaleStock extends Stock implements DaleLocation {
	private readonly wrapClasses = ['dale-wrap-technique', 'dale-wrap-purchase', 'dale-wrap-build', 'dale-wrap-discard', 'dale-wrap-default'];
	public wrap: Element | undefined = undefined;
	private actionLabel: Element | undefined = undefined;
	private actionLabelDefaultText: string = "<DefaultText>";

	/** Keeps track of the order in which cards in are selected (in !REVERSED! order). */
	public orderedSelection: OrderedSelection;

	public static readonly MAX_HORIZONTAL_OVERLAP = 85;

	public get selectionMode() {
		return (this as any).selectable;
	}

	constructor(){
		super();
		this.orderedSelection = new StockOrderedSelection(this);
		this.onChangeSelection = function(control_name: string, item_id: number) {
			if (item_id && !this.isSelected(item_id)) {
				this.orderedSelection.updateIcons();
			}
		}
	}
	
	/**
	 * Initialize everything that is needed for a Stock
	 * @param page Gamegui
	 * @param container The div element to attach the stock to. This element should be empty.
	 * @param wrap (optional) html wrap element that holds both the stock and the action label
	 * @param defaultText (optional) default text to display on the action label
	 * @param onItemCreate (optional) Callback function to execute when a new item is added to the stock
	 * @param onItemDelete (optional) Callback function to execute when a new item is removed from the stock
	 */
	init(page: Gamegui, container: Element, wrap?: Element, defaultText?: string, onItemCreate?: (itemDiv: HTMLElement, typeId: number, itemId: number) => void, onItemDelete?: (itemDiv: HTMLElement, typeId: number, itemId: number) => void) {
		//configure card types
		(page as any).allDaleStocks.push(this);
		for (let i in page.gamedatas.cardTypes) {
			let type_id = page.gamedatas.cardTypes[i]!.type_id;
			this.addItemType(type_id, type_id, g_gamethemeurl + 'img/cards.jpg', type_id);
		}
		this.create( page, container, Images.CARD_WIDTH, Images.CARD_HEIGHT);
		this.resizeItems(Images.CARD_WIDTH_S, Images.CARD_HEIGHT_S, Images.SHEET_WIDTH_S, Images.SHEET_HEIGHT_S);
		this.image_items_per_row = Images.IMAGES_PER_ROW;

		//configure wrap (set a reference to the wrap div that holds the action labels)
		if (wrap) {
			dojo.setStyle(wrap, 'min-height', 2*Images.CARD_WIDTH_S+'px');
			this.wrap = wrap;
			this.actionLabel = wrap.querySelector(".dale-label") ?? undefined;
			if (!this.actionLabel) {
				throw new Error("initActionLabelWrap failed: no action label found")
			}
			if (defaultText) {
				this.actionLabelDefaultText = defaultText;
			}
			this.apparenceBorderWidth = '0px'; //the selection border will be managed by the action label instead of the bga stock
			this.setWrapClass();
		}
		
		//configure callback functions
		if (onItemCreate) this.onItemCreate = onItemCreate;
		if (onItemDelete) this.onItemDelete = onItemDelete;
	}

	/**
	 * Selects the item with the specified unique id.
	 * @param item_id The unique id of the item to be removed from the stock. This id must be unique within the stock and is used to identify the item when removing it from the stock.
	 * @returns {void}
	 */
	override selectItem(item_id: number): void {
		super.selectItem(item_id);
		this.orderedSelection.selectItem(+item_id);
	}

	/**
	 * Deselects the item with the specified unique id.
	 * @param item_id The unique id of the item to be removed from the stock. This id must be unique within the stock and is used to identify the item when removing it from the stock.
	 * @returns {void}
	 */
	override unselectItem(item_id: number): void {
		super.unselectItem(item_id);
		this.orderedSelection.unselectItem(+item_id);
	}

	/**
	 * Sets the selection mode for the stock. The selection mode determines how the user can interact with the items in the stock.
	 * Additionally, it resets the 'orderedSelectedCardIds', which is needed to track the order in the selection
	 * @param mode selection mode
	 * @param iconType (optional) none. types of icons to use for the selection
	 * @param wrapClass (optional) if provided, set the class of this stock's wrap
	 * @param actionLabelText (optional)
	 */
	override setSelectionMode(mode: 0 | 1 | 2, iconType: SelectionIconType = 'none', wrapClass?: DaleWrapClass, actionLabelText?: string): void {
		this.orderedSelection.setIconType(iconType);
		this.setWrapClass(wrapClass, actionLabelText);
		super.setSelectionMode(mode);
		for(let i in this.items){
			const card_id = this.items[i]!.id;
			if (mode == 0) {
				$(this.control_name+"_item_"+card_id)?.classList.remove("dale-clickable");
			}
			else {
				$(this.control_name+"_item_"+card_id)?.classList.add("dale-clickable");
			}
		}
	}

	 /**
     * Set the wrap class to one of the pre-made wrap classes.
     * @param wrapClass (optional) default `'dale-wrap-default'`
	 * @param labelText (optional) this text will be displayed on the label of the wrap
     */
	private setWrapClass(wrapClass: DaleWrapClass = 'dale-wrap-default', labelText?: string) {
		if (this.actionLabel) {
			if (!labelText) {
				labelText = this.actionLabelDefaultText
			}
			this.actionLabel.innerHTML = labelText ?? this.actionLabelDefaultText;
			this.wrap!.classList.remove(...this.wrapClasses);
			if (wrapClass) {
				this.wrap!.classList.add(wrapClass);
			}
		}
	}

	/**
	 * Function to be called after unbinding chameleon cards. All bound chameleon cards are removed and readded to the stock.
	 * @param card (optional) - if provided, only update this html elements of this card
	 */
	public updateHTML(card?: DaleCard) {
		console.log(`updateHTML for DaleStock '${this.control_name}', card = ${card?.id}`);
		if (card) {
			if (card.isBoundChameleon()) {
				this.addChameleonOverlay(card);
			}
			else {
				this.removeChameleonOverlay(card);
			}
		}
		else {
			for (let item of this.getAllItems()) {
				this.updateHTML(new DaleCard(item.id, item.type));
			}
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
		const old_overlay = stockitem?.querySelector(".dale-card");
		if (old_overlay) {
			if (old_overlay.classList.contains("type-id-"+card.effective_type_id)) {
				return;
			}
			this.removeChameleonOverlay(card);
		}
		const overlay = card.toDiv();
		overlay.classList.add("type-id-"+card.effective_type_id);
		overlay.classList.add("dale-overlay");
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
		const old_overlay = stockitem?.querySelector(".dale-card") as HTMLElement;
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

	override updateDisplay(from?: string | HTMLElement): void {
		//Stock bullshit calculations, our goal is to force perLines == 1
		// var item_visible_width = this.item_width;
		// var item_visible_width_lastitemlost = 0;
		// if( this.horizontal_overlap != 0 ){
		// 	item_visible_width = Math.round( this.item_width*this.horizontal_overlap/100 );
		// 	item_visible_width_lastitemlost = this.item_width - item_visible_width;
		// }
		// const control_width = dojo.marginBox( this.control_name as any ).w!;
		// const perLines = Math.max( 1, Math.floor( (control_width-item_visible_width_lastitemlost) / ( item_visible_width + this.item_margin ) ) );

		//Automatically set the item_margin
		//horizontal_overlap is broken! don't use it!
		const containerWidth = dojo.marginBox( this.control_name as any ).w!;
		const totalWidth = this.item_width * this.items.length + 5; //+5 adds a little bit of margin and prevents an unwanted linebreak by bga stock
		this.item_margin = (containerWidth-totalWidth)/Math.max(1, this.items.length-1);
		this.item_margin = Math.min(-3, this.item_margin);

		//arc
		super.updateDisplay(from);
		var div = undefined;
		for(var i in this.items){
			var item = this.items[i]!;
			var index = +i+1 as number;
			div = $(this.getItemDivId(String(item.id))) as HTMLElement;
			div.dataset['arc'] = index+'/'+this.items.length;
			dojo.setStyle(div, 'z-index', String(Images.Z_INDEX_HAND_CARD+index));
		}

		//Conpensate for the first item having margin
		if (this.item_margin < 0) {
			dojo.setStyle(this.container_div, 'left', `${this.item_margin/2}px`)
		}
	}
}
