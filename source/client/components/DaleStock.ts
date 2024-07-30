import Stock = require('ebg/stock'); 
import "ebg/stock"; 
import { DaleCard } from './DaleCard';

/**
 * Decorator of the standard BGA Stock component.
 */
export class DaleStock extends Stock {
	/** Keeps track of the order in which cards in are selected */
	public orderedSelectedCardIds: number[];

	constructor(){
		super();
		this.orderedSelectedCardIds = [];
		this.onChangeSelection = function(control_name: string, item_id: number) {
			item_id = +item_id;
			const isSelected = this.isSelected(item_id);
			const index = this.orderedSelectedCardIds.indexOf(item_id);
			if (!item_id) {
				this.orderedSelectedCardIds = [];
			}
			else if (isSelected && index == -1) {
				this.orderedSelectedCardIds.push(item_id);
			}
			else if (!isSelected && index != -1) {
				this.orderedSelectedCardIds.splice(index, 1);
			}
			else {
				console.warn("orderedSelectedCardIds might be broken: " + this.orderedSelectedCardIds);
				this.orderedSelectedCardIds = [];
			}
			console.log(this.orderedSelectedCardIds);
		}
	}

	override setSelectionMode(mode: 0 | 1 | 2): void {
		super.setSelectionMode(mode);
		this.orderedSelectedCardIds = [];
	}

	/** 
	 * Add a `DaleCard` to a stock. Always use this instead of addToStockWithID. This ensures that the type id of the card id is registered in the `DaleCard` class.
	 * @param card card to add to the stock
	 * @param from The element to animate the item from. When the `from` parameter is specified, the item will be created at the location of the from element and animate to the stock. The location create is always an absolute position at the top left of the from div. This is optional and can be used to animate the item from a specific location on the page. If this is not specified, the item will be created and placed immediately inside the stock.
	*/
	public addDaleCardToStock(card: DaleCard, from?: string | HTMLElement) {
		this.addToStockWithId(card.type_id, card.id, from);
		card.addTooltip(this.control_name+'_item_'+card.id);
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