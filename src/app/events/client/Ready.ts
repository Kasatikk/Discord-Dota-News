import { MarciClient } from '@/core/client/ClientClass';
import Event from '@/core/handlers/interfaces/EventInterface';

export default new Event({ name: 'ready' }, async (client: MarciClient) => {
    setInterval(async () => {
        await client.services.methods.dota.posting();
    }, 900000);

    setInterval(async () => {
        await client.services.methods.parser.initCache();
    }, 3600000);
});
