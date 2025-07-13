import { ButtonInteraction } from 'discord.js';
import { ChangeEnablingDtoTypes } from '@/app/services/dota/dto/ChangeEnablingDto';
import { MarciClient } from '@/core/client/ClientClass';
import Component from '@/core/handlers/interfaces/ComponentInterface';

export default new Component(
    { name: 'ChangeEnabling' },
    async (client: MarciClient, interaction: ButtonInteraction<'cached'>) => {
        await interaction.deferUpdate();

        const type = interaction.customId.split(
            '-'
        )[1] as ChangeEnablingDtoTypes;

        await client.services.database.dota
            .changeEnabling({
                guildID: interaction.guild.id,
                type: type
            })
            .then(async (guild) => {
                await interaction.editReply({
                    embeds: [
                        client.services.builders.embeds.adminPanel(
                            guild,
                            interaction.member
                        )
                    ],
                    components: [
                        await client.services.builders.rows.menus.telegramChannels(
                            guild
                        ),
                        client.services.builders.rows.menus.selectPostingChannel(),
                        client.services.builders.rows.buttons.adminPanel(guild)
                    ]
                });
            });
    }
);
