import { MarciClient } from '@/core/client/ClientClass';
import { RowManager } from '@/core/builders/store/RowManager';
import { EmbedManager } from '@/core/builders/store/EmbedManager';

export class BuilderManager {
    public readonly rows: RowManager;
    public readonly embeds: EmbedManager;

    constructor(private client: MarciClient) {
        this.rows = new RowManager(client);
        this.embeds = new EmbedManager(client);
    }
}
