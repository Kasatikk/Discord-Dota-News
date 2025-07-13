import { ChannelInfoDto } from '@/services/telegram/dto/ChannelInfoDto';
import { stripIndents } from 'common-tags';
import { Collection, Guild } from 'discord.js';
import { PostInfoDto } from '@/services/telegram/dto/PostInfoDto';
import { TelegramChannels } from '@/cfg/ChannelsConfig';

export class ParserService {
    public readonly cache: Collection<string, ChannelInfoDto> =
        new Collection();
    private apiUrl = process.env['API_URL'];

    public async initCache() {
        for (const channel of TelegramChannels) {
            const info = await this.getInfoOfChannel(channel);
            this.cache.set(channel, info);
        }
    }

    public async getInfoOfChannel(channelUsername: string) {
        const request = await fetch(
            `${this.apiUrl}/get_info/${channelUsername}`
        );

        return (await request.json()) as ChannelInfoDto;
    }

    public async getInfoOfPost(channelUsername: string) {
        const data = await this.getLastPostId(channelUsername);
        const request = await fetch(
            `${this.apiUrl}/getpostby_id/${channelUsername}/${data.last_post_id}`
        );

        return {
            data: {
                postId: data.last_post_id,
                channel: channelUsername,
                ...((await request.json()) as PostInfoDto)
            }
        };
    }

    private async getLastPostId(channelUsername: string) {
        const request = await fetch(
            `${this.apiUrl}/getlastpost_id/${channelUsername}`
        );

        return (await request.json()) as { last_post_id: number };
    }

    public async sendMessageToDeveloper(guild: Guild, state: boolean) {
        await fetch(
            `https://api.telegram.org/bot${process.env['TELEGRAM_BOT_TOKEN']}/sendMessage`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: process.env['DEVELOPER_TELEGRAM_ID'],
                    text: stripIndents(`
                        ${state ? '🍕 Добавлен' : '🗑 Удален'} сервер:

                        Название: ${guild.name}
                        Кол-во участников: ${guild.memberCount}
                        Владелец: ${(await guild.fetchOwner()).user.username} (${guild.ownerId})
                    `)
                })
            }
        );
    }

    public async sendNotifyToDeveloper(message: string) {
        await fetch(
            `https://api.telegram.org/bot${process.env['TELEGRAM_BOT_TOKEN']}/sendMessage`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: process.env['DEVELOPER_TELEGRAM_ID'],
                    text: message
                })
            }
        );
    }
}
