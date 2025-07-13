import { AnySelectMenuInteraction } from 'discord.js';
import { MarciClient } from '@/core/client/ClientClass';
import Component from '@/core/handlers/interfaces/ComponentInterface';

export default new Component(
    { name: 'SelectChannelForPosting' },
    async (
        client: MarciClient,
        interaction: AnySelectMenuInteraction<'cached'>
    ) => {
        await interaction.deferUpdate();

        await client.services.database.dota
            .setChannelForPosting({
                guildID: interaction.guild.id,
                channelId: interaction.values[0]
            })
            .then(async (guild) => {
                await interaction.editReply({
                    embeds: [
                        client.services.builders.embeds.adminPanel(
                            guild,
                            interaction.member
                        )
                    ]
                });
            });
    }
);
