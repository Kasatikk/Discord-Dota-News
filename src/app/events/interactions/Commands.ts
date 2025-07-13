import { AutocompleteInteraction, CommandInteraction } from 'discord.js';
import { MarciClient } from '@/core/client/ClientClass';
import Command from '@/core/handlers/interfaces/CommandInterface';
import Event from '@/core/handlers/interfaces/EventInterface';

export default new Event(
    { name: 'commands' },
    async (
        client: MarciClient,
        interaction:
            | CommandInteraction<'cached'>
            | AutocompleteInteraction<'cached'>
    ) => {
        const command: Command = client.commands.cache.get(
            interaction.commandName
        )!;

        if (!command) return;

        if (command.autoComplete) {
            await command.autoComplete(
                interaction as AutocompleteInteraction<'cached'>
            );
        }

        await command.execute(client, interaction);
    }
);
