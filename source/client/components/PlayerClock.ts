import Gamegui = require('ebg/core/gamegui');
import { DaleIcons } from './DaleIcons';

declare function $(text: string | Element): HTMLElement;

/**
 * Manages a player clock
 */
export class PlayerClock {
    private page: Gamegui;
    private player_id: number = 0;
    private position: number = 0;
    private is_mono: boolean = false;

    private wrap: HTMLElement;
    private label: HTMLElement;
    private icon: HTMLElement | undefined;

    public static readonly CLOCK_DAWN = 0;
    public static readonly CLOCK_DAY = 1;
    public static readonly CLOCK_NIGHT = 2;

    /**
     * Construct a clock for a player
     */
    constructor(page: Gamegui, player_id: number, is_mono: boolean = false) {
        this.page = page;
        this.player_id = player_id;
        this.wrap = $('daleofmerchants-clock-wrap-'+player_id)! as HTMLElement;
        this.label = $('daleofmerchants-clock-label-'+player_id)! as HTMLElement;
        this.is_mono = is_mono
            
        //initial position
        this.advanceClock(page.gamedatas.players[player_id]!.clock);
    }

    /**
     * Advance the clock within the linear axis [CLOCK_DAWN, CLOCK_DAY, CLOCK_NIGHT]
     * @param steps number of steps to advance (negative numbers are allowed)
     */
    public advanceClock(steps: number) {
        const prevPostion = this.position;
        if (this.is_mono) {
            const newPosition = (prevPostion + steps) % 3
            this.setClock(newPosition);
        }
        else {
            const newPosition = Math.max(PlayerClock.CLOCK_DAWN, Math.min(PlayerClock.CLOCK_NIGHT, prevPostion + steps));
            this.setClock(newPosition);
        }
    }

    /**
     * Get the current clock position
     */
    public getClock() {
        return this.position;
    }

    /**
     * Set the clock to a specific position
     * @param newPosition either CLOCK_DAWN, CLOCK_DAY or CLOCK_NIGHT
     */
    public setClock(newPosition: number) {
        this.position = newPosition;
        this.wrap!.dataset['clock'] = this.position.toString();
        this.icon?.remove();
        this.icon = PlayerClock.getClockIcon(this.position);
        this.icon.id = 'daleofmerchants-clock-icon-'+this.player_id;
        this.wrap.prepend(this.icon);
        this.page.addTooltip('daleofmerchants-clock-icon-'+this.player_id, PlayerClock.getClockTooltip(this.position), '');
        this.label.innerText = PlayerClock.getClockLabel(this.position);
    }

    /**
     * @param position `CLOCK_DAWN`, `CLOCK_DAY` or `CLOCK_NIGHT`
     * @returns an tooltip corresponding to the clock's position
     */
    public static getClockTooltip(position: number): string {
        let content = "";
        switch (position) {
            case PlayerClock.CLOCK_DAWN:
                content += _("It is DAWN time. After playing a technique, move your clock to DAY time.");
                break;
            case PlayerClock.CLOCK_DAY:
                content += _("It is DAY time. After playing a technique, move your clock to NIGHT time.");
                break;
            case PlayerClock.CLOCK_NIGHT:
                content += _("It is NIGHT time. At the start of your next turn, your clock resets to DAWN time.");
                break;
            default:
                throw new Error("Invalid clock position "+position);
        }
        return content.replace('DAWN', `dawn (<span class="daleofmerchants-log-span">${DaleIcons.getDawnIcon().outerHTML}</span>)`)
            .replace('DAY', `day (<span class="daleofmerchants-log-span">${DaleIcons.getDayIcon().outerHTML}</span>)`)
            .replace('NIGHT', `night (<span class="daleofmerchants-log-span">${DaleIcons.getNightIcon().outerHTML}</span>)`);
    }

    /**
     * @param position `CLOCK_DAWN`, `CLOCK_DAY` or `CLOCK_NIGHT`
     * @returns either 'dawn', 'day' or 'night'
     */
    public static getClockLabel(position: number): string {
        switch (position) {
            case PlayerClock.CLOCK_DAWN:
                return _("Dawn");
            case PlayerClock.CLOCK_DAY:
                return _("Day");
            case PlayerClock.CLOCK_NIGHT:
                return _("Night");
            default:
                throw new Error("Invalid clock position "+position);
        }
    }

    /**
     * @param position `CLOCK_DAWN`, `CLOCK_DAY` or `CLOCK_NIGHT`
     * @returns an icon corresponding to the clock's position
     */
    public static getClockIcon(position: number): HTMLElement {
        switch (position) {
            case PlayerClock.CLOCK_DAWN:
                return DaleIcons.getDawnIcon();
            case PlayerClock.CLOCK_DAY:
                return DaleIcons.getDayIcon();
            case PlayerClock.CLOCK_NIGHT:
                return DaleIcons.getNightIcon();
            default:
                throw new Error("Invalid clock position "+position);
        }
    }

    /**
     * @param position `CLOCK_DAWN`, `CLOCK_DAY` or `CLOCK_NIGHT`
     * @returns html string of style `"${label} (${icon})""`
     */
    public static getClockLabelAndIconTpl(position: number): string {
        const label = PlayerClock.getClockLabel(position).toLowerCase();
        const iconTpl = PlayerClock.getClockIcon(position);
        return `${label} (<span class="daleofmerchants-log-span">${iconTpl.outerHTML}</span>)`;
    }
}
