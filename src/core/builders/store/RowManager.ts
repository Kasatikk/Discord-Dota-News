import { Menus } from '@/core/builders/store/rows/Menus';
import { Buttons } from '@/core/builders/store/rows/Buttons';
import { MarciClient } from '@/core/client/ClientClass';

export class RowManager {
    public readonly menus: Menus;
    public readonly buttons: Buttons;

    constructor(private readonly client: MarciClient) {
        this.menus = new Menus(client);
        this.buttons = new Buttons();
    }
}
