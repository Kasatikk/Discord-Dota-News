import {
    CommandInteraction,
    Interaction,
    MessageComponentInteraction
} from 'discord.js';
import { MarciClient } from '@/core/client/ClientClass';
import Event from '@/core/handlers/interfaces/EventInterface';

export default new Event(
    { name: 'interactionCreate' },
    async (client: MarciClient, interaction: Interaction<'cached'>) => {
        if (interaction.isCommand()) {
            client.emit(
                'commands',
                interaction as CommandInteraction<'cached'>
            );
        } else {
            client.emit(
                'components',
                interaction as MessageComponentInteraction<'cached'>
            );
        }
    }
);
