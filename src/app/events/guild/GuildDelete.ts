import { Guild } from 'discord.js';
import { MarciClient } from '@/core/client/ClientClass';
import Event from '@/core/handlers/interfaces/EventInterface';

export default new Event(
    { name: 'guildDelete' },
    async (client: MarciClient, guild: Guild) => {
        await client.services.methods.parser.sendMessageToDeveloper(
            guild,
            false
        );
    }
);
