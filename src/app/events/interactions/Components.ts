import {
    AnySelectMenuInteraction,
    ButtonInteraction,
    MessageComponentInteraction,
    ModalSubmitInteraction
} from 'discord.js';
import { MarciClient } from '@/core/client/ClientClass';
import Component from '@/core/handlers/interfaces/ComponentInterface';
import Event from '@/core/handlers/interfaces/EventInterface';

export default new Event(
    { name: 'components' },
    async (
        client: MarciClient,
        interaction: MessageComponentInteraction<'cached'>
    ) => {
        const component: Component =
            client.components.cache.get(interaction.customId)! ||
            client.components.cache.get(interaction.customId?.split('-')[0])!;

        if (!component) return;

        if (interaction.isButton()) {
            await component.execute(
                client,
                interaction as ButtonInteraction<'cached'>
            );
        } else if (interaction.isModalSubmit()) {
            await component.execute(
                client,
                interaction as ModalSubmitInteraction<'cached'>
            );
        } else if (interaction.isAnySelectMenu()) {
            await component.execute(
                client,
                interaction as AnySelectMenuInteraction<'cached'>
            );
        }
    }
);
