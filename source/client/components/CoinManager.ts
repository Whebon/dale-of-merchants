import Gamegui = require('ebg/core/gamegui');
import Counter = require('ebg/counter'); 
import { DaleIcons } from './DaleIcons';
import { DALE_WRAP_CLASSES, DaleWrapClass } from './types/DaleWrapClass';
import { DaleCard } from './DaleCard';

declare function $(text: string | Element): HTMLElement;

type CoinSelectionMode = 'none' | 'explicit' | 'implicit'; 

/**
 * Manages everything related to coins and spending
 */
export class CoinManager {
    private page: Gamegui | undefined;
    private selectionMode: CoinSelectionMode = 'none';

    private wrap: HTMLElement | undefined;
    private actionLabel: Element | undefined;
    private coinsToSpendSpan: HTMLElement | undefined;

    private get defaultActionLabelText(): string {
        //return _("Click to <strong>spend</strong> coins");\
        return _("Click to add coins");
    }
    
	/** A coin counter for each player  */
	private playerCoins: Record<number, Counter> = {};

	/** A coin counter for this player  */
    get myCoins(): Counter {
        const counter = this.playerCoins[this.page!.player_id];
        if (counter == undefined && !this.page!.isSpectator) {
            throw new Error("myCoins should be defined for non-spectators");
        }
        return counter!;
    }

    /**
     * Initialize the counter for each player
     */
    init(page: Gamegui) {
        this.page = page;
        for(let player_id in page.gamedatas.players ){
            const coins_wrap = $('daleofmerchants-coins-wrap-'+player_id)! as HTMLElement;
            
            //coin counter
            const coins_span = coins_wrap.querySelector('.daleofmerchants-coins-counter')! as HTMLElement;
            const coins_icon = DaleIcons.getCoinIcon();
            coins_icon.id = 'daleofmerchants-coins-icon-'+player_id;
            coins_wrap.append(coins_icon);
            this.playerCoins[player_id] = new ebg.counter();
            this.playerCoins[player_id].create(coins_span);
            this.playerCoins[player_id].setValue(page.gamedatas.players[player_id]!.coins);
            page.addTooltip('daleofmerchants-coins-icon-'+player_id, _("Number of coins"), '');
        }
        if (!page.isSpectator) {
            this.wrap = $('daleofmerchants-coins-wrap-'+page.player_id)! as HTMLElement;
            this.actionLabel = this.wrap.querySelector(".daleofmerchants-label")! as HTMLElement;

            //spending UI
            this.coinsToSpendSpan = this.wrap.querySelector('.daleofmerchants-coins-to-spend-counter')! as HTMLElement;
            this.setCoinsToSpend(0);
            this.actionLabel.addEventListener('click', this.onClickWrap.bind(this));
        }
    }

    /**
     * Give the coins the specified css class
     */
    private setWrapClass(wrapClass: DaleWrapClass = 'daleofmerchants-wrap-default', actionLabelText?: string) {
        if (!this.wrap || !this.actionLabel) {
            return; //for spectators
        }
        this.wrap.classList.remove(...DALE_WRAP_CLASSES);
        if (wrapClass) {
            this.wrap.classList.add(wrapClass);
            this.actionLabel.innerHTML = actionLabelText ?? this.defaultActionLabelText;
        }
    }

    /**
     * Returns the maximum amount of value this player is able to spend using cards and coins
     */
    public getMaximumSpendValue(funds: DaleCard[]): number {
        let max_value = this.myCoins.getValue();
        for (const card of funds) {
            max_value += card.effective_value;
        }
        return max_value;
    }

    /**
     * Get the coins to spend
     */
    public getCoinsToSpend(): number {
        return +this.coinsToSpendSpan!.innerText;
    }
    
    /**
     * Set the coins to spend to the remaining amount
     * @param funds cards that will be used to spend
     * @param total total amount that needs to be spend
     * @param is_purchase if `false`, this is a regular spend ability. if `true`, apply additional cost rules for purchases.  
     */
    public setCoinsToSpendImplicitly(funds: DaleCard[], total: number, is_purchase: boolean = false): void {
        console.warn("setCoinsToSpendImplicitly");
        if (this.selectionMode != 'implicit') {
            return;
        }
        let remaining = total;
        for (const card of funds) {
            remaining -= card.effective_value;
            if (is_purchase && card.effective_type_id == DaleCard.CT_RIGOROUSCHRONICLER) {
                remaining -= 2; //always use CT_RIGOROUSCHRONICLER over coins
            }
        }
        this.setCoinsToSpend(remaining);
    }

    /**
     * Set the coins to spend, If the amount of coins is larger than the total_coins, the number will be red
     * @param amount amount to set
     */
    private setCoinsToSpend(amount: number): void {
        if (amount <= 0) {
            if (this.selectionMode != 'explicit') {
                this.wrap?.classList.add("daleofmerchants-wrap-default"); //practical hide
            }
            this.coinsToSpendSpan!.innerHTML = '0';
            return;
        }
        this.wrap?.classList.remove("daleofmerchants-wrap-default"); //practical show
        this.coinsToSpendSpan!.innerHTML = amount.toString();
        dojo.setStyle(this.coinsToSpendSpan!, 'color', amount >  this.myCoins.getValue() ? 'red' : 'black');
    }

    private onClickWrap() {
        console.warn("onClickWrap", this.selectionMode);
        switch(this.selectionMode) {
            case 'explicit':
                const amount = this.getCoinsToSpend();
                if (amount >= this.myCoins.getValue()) {
                    this.setCoinsToSpend(0);
                }
                else {
                    this.setCoinsToSpend(this.getCoinsToSpend() + 1);
                }
                (this.page as any).onClickCoinManager();
                break;
        }
    }

    /**
     * @param mode
     * @param wrapClass css style for the label
     * @param actionLabelText text to display on the label
    */
    setSelectionMode(mode: CoinSelectionMode, wrapClass: DaleWrapClass = "daleofmerchants-wrap-default", actionLabelText?: string) {
        if (mode == this.selectionMode) {
            return;
        }
        this.selectionMode = mode;
        if (mode != 'none' && this.myCoins?.getValue() == 0) {
            this.setSelectionMode('none', "daleofmerchants-wrap-default");
            return;
        }
        this.setCoinsToSpend(0);
        this.setWrapClass(wrapClass, actionLabelText);
        switch(this.selectionMode) {
            case 'explicit':
                this.actionLabel?.classList.add("daleofmerchants-clickable");
                break;
            case 'none':
                this.actionLabel?.classList.remove("daleofmerchants-clickable");
                break;  
        }
    }

    /**
     * Increment the coin counter, and disable all selection modes
     * @param player_id owner of the coin counter
     * @param nbr amount of coins (may be negative)
    */
    public addCoins(player_id: number, nbr: number) {
        this.playerCoins[player_id]!.incValue(nbr);
        this.setSelectionMode('none');
    }
}
