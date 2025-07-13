import { Message, ThreadAutoArchiveDuration } from 'discord.js';
import { MarciClient } from '@/core/client/ClientClass';
import Event from '@/core/handlers/interfaces/EventInterface';

export default new Event(
    { name: 'messageCreate' },
    async (client: MarciClient, message: Message) => {
        const guild = await client.services.database.dota.findGuildById(
            message.guild!.id
        );

        if (
            message.channelId === guild?.channelForPosting &&
            guild.isEnabledComments &&
            (message.webhookId || message.author.id === client.user!.id)
        ) {
            const messages = await message.channel.messages.fetch({
                limit: 10
            });
            for (const [_, oldMessage] of messages) {
                if (
                    oldMessage?.embeds[0]?.url === message?.embeds[0]?.url &&
                    oldMessage.createdTimestamp < message.createdTimestamp
                ) {
                    await message.delete().catch(() => {});
                } else {
                    await message
                        .startThread({
                            name: 'Комменты',
                            autoArchiveDuration:
                                ThreadAutoArchiveDuration.OneDay
                        })
                        .catch(() => {});
                }
            }
        }
    }
);
