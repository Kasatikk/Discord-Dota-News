import { CommandInteraction } from 'discord.js';
import { stripIndents } from 'common-tags';
import { MarciClient } from '@/core/client/ClientClass';
import Command from '@/core/handlers/interfaces/CommandInterface';

export default new Command(
    'clusters',
    async (client: MarciClient, interaction: CommandInteraction<'cached'>) => {
        await interaction.deferReply();

        const promises = [
            client.cluster.fetchClientValues('guilds.cache.size'),
            client.cluster.broadcastEval((c) =>
                c.guilds.cache.reduce(
                    (acc, guild) => acc + guild.memberCount,
                    0
                )
            )
        ];

        const results = (await Promise.all(promises)) as [number[], number[]];
        let text: string = '';

        for (let i = 0; i < client.cluster.count; i++) {
            text +=
                stripIndents(`
                Кластер **#${i + 1}**:
                    ・ Серверов: ${results[0][i]}
                    ・ Пользователей: ${results[1][i]}
            `) + '\n';
        }

        await interaction.editReply(text);
    },
    {
        base: {
            name: 'clusters',
            description: 'посмотреть краткую информацию о кластерах бота'
        }
    }
);
