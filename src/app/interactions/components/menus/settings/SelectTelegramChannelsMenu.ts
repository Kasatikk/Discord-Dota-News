import { AnySelectMenuInteraction } from 'discord.js';
import { stripIndents } from 'common-tags';
import { MarciClient } from '@/core/client/ClientClass';
import Component from '@/core/handlers/interfaces/ComponentInterface';

export default new Component(
    { name: 'SelectTelegramChannels' },
    async (
        client: MarciClient,
        interaction: AnySelectMenuInteraction<'cached'>
    ) => {
        await interaction.deferUpdate();

        await client.services.database.dota
            .updateTgChannels({
                guildID: interaction.guild.id,
                channels: interaction.values
            })
            .then(async (data) => {
                await interaction.editReply({
                    embeds: [
                        client.services.builders.embeds.adminPanel(
                            data.guild,
                            interaction.member
                        )
                    ],
                    components: [
                        await client.services.builders.rows.menus.telegramChannels(
                            data.guild
                        ),
                        client.services.builders.rows.menus.selectPostingChannel(),
                        client.services.builders.rows.buttons.adminPanel(
                            data.guild
                        )
                    ]
                });

                await interaction.followUp({
                    embeds: [
                        client.services.builders.embeds.default(
                            interaction.member,
                            'Успешно обновлены каналы',
                            stripIndents(`
                                ты **обновил** каналы
                                
                                >>> Удалены: \`${data.sortedChannels.channelsForRemove.join(', ') || 'Отсутствуют'}\`
                                Добавлены: \`${data.sortedChannels.channelsForPush.join(', ') || 'Отсутствуют'}\`
                            `)
                        )
                    ],
                    flags: ['Ephemeral']
                });
            });
    }
);
