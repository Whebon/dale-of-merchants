import Gamegui = require('ebg/core/gamegui');
import Stock = require('ebg/stock'); 
import "ebg/stock"; 
import { DaleCard } from './DaleCard';
import { Images } from './Images';
import { DaleLocation } from './types/DaleLocation';
import { OrderedSelection, SelectionIconType } from './OrderedSelection';

//Safely delete this
// /**
//  * Ordered selection for a stock
//  */
// class StockOrderedSelection extends OrderedSelection {
//     private _stock: Stock;

//     constructor(stock: Stock) {
//         super();
//         this._stock = stock;
//     }

//     protected override getDiv(card_id: number): Element | null {
//         return $(this._stock.control_name+"_item_"+card_id);
//     }
// }

type DaleWrapClass = 'dale-wrap-technique' | 'dale-wrap-purchase' | 'dale-wrap-build' | 'dale-wrap-discard' | 'dale-wrap-default' | 'previous';

/**
 * Selection modes for the dale stock
 * 0: no selection possible
 * 1: single card can be selected
 * 2: multiple cards can be selected
 * 3: single PLAYABLE card can be selected
 * 'essentialPurchase': up to 3 junk cards on can be selected. It is required that they are already selected on the secondary selection level.
 * 'only_card_id47': no new selections are possible, the previous selection is retained. only the specified card_id can be clicked.
 */
type DaleStockSelectionMode = 0 | 1 | 2 | 3 | `only_card_id${number}` | 'essentialPurchase'

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

	private selectionMode: DaleStockSelectionMode = 0;
	// public get selectionMode() {
	// 	return (this as any).selectable;
	// }

	constructor(){
		super();
		this.orderedSelection = new OrderedSelection();
		this.jstpl_stock_item = '<div id="${id}" class="dale-card" style="top:${top}px;left:${left}px;width:${width}px;height:${height}px;${position};"></div>';
		//this.jstpl_stock_item = '<div id="${id}" class="stockitem ${extra_classes}" style="top:${top}px;left:${left}px;width:${width}px;height:${height}px;${position};"></div>';
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
			this.addItemType(type_id, type_id); //, g_gamethemeurl + 'img/cards.jpg', type_id);
		}
		this.create( page, container, Images.CARD_WIDTH, Images.CARD_HEIGHT);
		this.resizeItems(Images.CARD_WIDTH_S, Images.CARD_HEIGHT_S, Images.SHEET_WIDTH_S, Images.SHEET_HEIGHT_S);
		this.image_items_per_row = Images.IMAGES_PER_ROW;
		this.create( page, container, Images.CARD_WIDTH_S, Images.CARD_HEIGHT_S);

		//configure wrap (set a reference to the wrap div that holds the action labels)
		if (wrap) {
			dojo.setStyle(wrap, 'min-height', 2*Images.CARD_WIDTH_S+'px');
			dojo.setStyle(wrap, 'max-height', 2*Images.CARD_WIDTH_S+'px');
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
	 * To be connected to client methods
	 */
	public onOrderedSelectionChanged (item_id: number) {
		console.log("onChangeSelection (dojo connect)");
	}

	override onClickOnItem( evt: MouseEvent ) {
		console.log("onClickOnItem");
		evt.stopPropagation();
		if (this.selectionMode !== 0) {
			const target = evt.currentTarget as HTMLElement
			if (target.classList.contains("dale-clickable")) {
				const match = target.id.match(/(\d+)$/)
				const item_id = +match![0]
				if (!this.isClickable(item_id)) {
					//not clickable
					return;
				}
				else if (this.isSelected(item_id)) {
					//unselect
					this.unselectItem(item_id);
					this.orderedSelection.updateIcons();
				}
				else {
					//select
					if (this.selectionMode === 1) {
						this.unselectAll();
						this.orderedSelection.updateIcons();
					}
					else if (this.selectionMode == 'essentialPurchase') {
						while (this.orderedSelection.getSize() >= 2) {
							this.orderedSelection.dequeue();
						}
					}
					this.selectItem(item_id);
				}
				this.onOrderedSelectionChanged(item_id);  
			}
		}
	}

	override isSelected(item_id: number): boolean {
		return this.orderedSelection.includes(item_id);
	}

	/**
	 * Selects the item with the specified unique id.
	 * @param item_id The unique id of the item to be removed from the stock. This id must be unique within the stock and is used to identify the item when removing it from the stock.
	 * @param secondary (optional) If true, adjust the selection on the secondary level
	 * @returns {void}
	 */
	override selectItem(item_id: number, secondary?: boolean): void {
		this.orderedSelection.selectItem(+item_id, secondary);
		this.setClickable(item_id);
	}

	/**
	 * Deselects the item with the specified unique id.
	 * @param item_id The unique id of the item to be removed from the stock. This id must be unique within the stock and is used to identify the item when removing it from the stock.
	 * @param secondary (optional) If true, adjust the selection on the secondary level
	 * @returns {void}
	 */
	override unselectItem(item_id: number, secondary?: boolean): void {
		this.orderedSelection.unselectItem(+item_id, secondary);
		this.setClickable(item_id);
	}

	/**
	 * Unselects all items, on both the primary and selection levels
	 */
	override unselectAll(): void {
		this.orderedSelection.unselectAll();
	}


	/**
	 * Sets the selection mode for the stock. The selection mode determines how the user can interact with the items in the stock.
	 * Additionally, it resets the 'orderedSelectedCardIds', which is needed to track the order in the selection
	 * @param mode selection mode
	 * @param iconType (optional) types of icons to use for the selection
	 * @param wrapClass (optional) if provided, set the class of this stock's wrap
	 * @param actionLabelText (optional)
	 * @param secondaryIconType (optional) types of icons to use for the secondary selection
	 */
	override setSelectionMode(mode: DaleStockSelectionMode, iconType?: SelectionIconType, wrapClass?: DaleWrapClass, actionLabelText?: string, secondaryIconType?: SelectionIconType): void {
		this.selectionMode = mode;
		this.orderedSelection.setIconType(iconType, secondaryIconType);
		this.setWrapClass(wrapClass, actionLabelText);
		if (this.selectionMode == 0) {
			this.unselectAll();
		}
		for(let i in this.items){
			const card_id = this.items[i]!.id;
			this.setClickable(card_id);
		}
	}

	/**
	 * Make the given card with the given card id clickable based on the current selectionMode 
	 */
	private setClickable(card_id: number) {
		const div = $(this.control_name+"_item_"+card_id);
		if (!div) {
			throw new Error(`Card ${card_id} does not exist in hand, so setClickable cannot be set`);
		}
		if (this.isClickable(card_id)) {
			div.classList.add("dale-clickable");
		}
		else {
			div.classList.remove("dale-clickable");
		}
	}

	/**
	 * @returns `true` if the card id can be clicked in the current selection mode
	 */
	private isClickable(card_id: number): boolean {
		const card = new DaleCard(card_id);
		switch (this.selectionMode) {
			case 0:
				return false;
			case 1:
				return true;
			case 2:
				return true;
			case 3:
				return card.isPlayable();
			case 'essentialPurchase':
				return card.isJunk() && this.orderedSelection.get(true).includes(card.id);
			default:
				const match = this.selectionMode.match(/^only_card_id(\d+)$/);
				if (match) {
					return card.id == +match[1]!;
				}
				throw new Error(`isClickable has no definition for selectionMode '${this.selectionMode}'`)
		}
	}

	 /**
     * Set the wrap class to one of the pre-made wrap classes.
     * @param wrapClass (optional) default `'dale-wrap-default'`
	 * @param labelText (optional) this text will be displayed on the label of the wrap
     */
	private setWrapClass(wrapClass: DaleWrapClass = 'dale-wrap-default', labelText?: string) {
		if (this.actionLabel && wrapClass != 'previous') {
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
	 * Add a `DaleCard` to a stock. Always use this instead of addToStockWithID. This ensures that the type id of the card id is registered in the `DaleCard` class.
	 * @param card card to add to the stock
	 * @param from The element to animate the item from. When the `from` parameter is specified, the item will be created at the location of the from element and animate to the stock. The location create is always an absolute position at the top left of the from div. This is optional and can be used to animate the item from a specific location on the page. If this is not specified, the item will be created and placed immediately inside the stock.
	*/
	public addDaleCardToStock(card: DaleCard, from?: string | HTMLElement) {
		this.addToStockWithId(card.original_type_id, card.id, from);
		this.setClickable(card.id);
		const stockitem_div = $(this.control_name+'_item_'+card.id) as HTMLElement;
		card.attachDiv(stockitem_div);
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
			if (this.control_name.includes("hand")) {
				dojo.setStyle(div, 'z-index', String(index+Images.Z_INDEX_HAND_CARD));
			}
			else {
				dojo.setStyle(div, 'z-index', String(index+Images.Z_INDEX_LIMBO_CARD));
			}
		}

		//Conpensate for the first item having margin
		if (this.item_margin < 0) {
			dojo.setStyle(this.container_div, 'left', `${this.item_margin/2}px`)
		}
	}
}
