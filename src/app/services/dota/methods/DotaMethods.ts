import { BaseGuildTextChannel } from 'discord.js';
import { MarciClient } from '@/core/client/ClientClass';
import { LogLevel } from '@/enums/LogLevel';
import { ChannelInfoDto } from '@/services/telegram/dto/ChannelInfoDto';

export class DotaMethods {
    constructor(private readonly client: MarciClient) {}

    public async posting() {
        const guildsCache = this.client.services.database.dota.cache;

        for (const [_, guild] of guildsCache) {
            if (guild.isEnabledPosting) {
                for (const channel of guild.tgChannels) {
                    try {
                        const postInfo =
                            await this.client.services.methods.parser.getInfoOfPost(
                                channel
                            );
                        const channelInfo =
                            this.client.services.methods.parser.cache.get(
                                channel
                            )!;

                        const guildChannel = (await this.client.channels
                            .fetch(guild.channelForPosting)
                            .catch(() => {})) as BaseGuildTextChannel;

                        if (
                            guild.usedPostsIds.includes(
                                `${postInfo.data.channel}.${postInfo.data.postId}`
                            ) ||
                            postInfo.data.error === 'NO_POST_FOUND' ||
                            !guildChannel
                        )
                            continue;

                        const embed =
                            this.client.services.builders.embeds.telegramPost(
                                postInfo.data
                            );

                        if (guild.isEnabledWebhook) {
                            const webhook = await this.findWebhookByChannel(
                                guildChannel,
                                channelInfo
                            );

                            await webhook.send({
                                embeds: [embed],
                                components:
                                    this.client.services.builders.rows.buttons.telegramPostLink(
                                        `https://t.me/${postInfo.data.channel}/${postInfo.data.postId}`
                                    )
                            });
                        } else {
                            await guildChannel.send({
                                embeds: [embed],
                                components:
                                    this.client.services.builders.rows.buttons.telegramPostLink(
                                        `https://t.me/${postInfo.data.channel}/${postInfo.data.postId}`
                                    )
                            });
                        }

                        guild.usedPostsIds.push(
                            `${postInfo.data.channel}.${postInfo.data.postId}`
                        );
                        await this.client.services.database.dota.save(guild);
                        await this.client.services.methods.parser.sendNotifyToDeveloper(
                            `Отправлен пост ${postInfo.data.channel}.${postInfo.data.postId} на гильдию ${guild.guild}`
                        );
                        await this.client.services.baseUtils.sleep(5000);
                    } catch (error: any) {
                        this.client.logger.log(
                            LogLevel.WARN,
                            `Не удалось отправить пост в гильдию ${guild.guild}\n${error.stack ?? error}`
                        );
                        return;
                    }
                }
            }
        }
    }

    private async findWebhookByChannel(
        guildChannel: BaseGuildTextChannel,
        channelInfo: ChannelInfoDto
    ) {
        let webhook = (await guildChannel.fetchWebhooks()).find(
            (w) => w.name === channelInfo.title
        );

        if (!webhook)
            webhook = await guildChannel.createWebhook({
                name: channelInfo.title,
                avatar: channelInfo.profile
            });

        return webhook;
    }
}
