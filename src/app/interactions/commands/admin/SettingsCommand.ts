import { CommandInteraction, PermissionFlagsBits } from 'discord.js';
import { MarciClient } from '@/core/client/ClientClass';
import Command from '@/core/handlers/interfaces/CommandInterface';

export default new Command(
    'settings',
    async (client: MarciClient, interaction: CommandInteraction<'cached'>) => {
        await interaction.deferReply({ flags: ['Ephemeral'] });

        await interaction
            .editReply({
                embeds: [
                    client.services.builders.embeds.default(
                        interaction.member,
                        'Управление постами',
                        '**подожди**, пока я **загружаю** панель'
                    )
                ]
            })
            .then(async () => {
                const guild = await client.services.database.dota.findGuildById(
                    interaction.guild.id
                );

                await interaction.editReply({
                    content: '',
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
    },
    {
        base: {
            name: 'settings',
            description: 'открыть панель настройки постинга',
            defaultMemberPermissions: PermissionFlagsBits.Administrator
        }
    }
);
