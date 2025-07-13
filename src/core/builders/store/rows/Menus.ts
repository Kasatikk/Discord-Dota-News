import { DocumentType } from '@typegoose/typegoose';
import {
    ActionRowBuilder,
    ChannelSelectMenuBuilder,
    StringSelectMenuBuilder
} from 'discord.js';
import { Dota } from '@/app/services/dota/database/models/Dota';
import { TelegramChannels } from '@/cfg/ChannelsConfig';
import { MarciClient } from '@/core/client/ClientClass';

export class Menus {
    constructor(private readonly client: MarciClient) {}

    public async telegramChannels(dto: DocumentType<Dota>) {
        return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('SelectTelegramChannels')
                .setMaxValues(TelegramChannels.length)
                .setPlaceholder('🔍 Выбери (не)нужные каналы...')
                .addOptions(
                    this.client.services.methods.parser.cache.map((channel) => {
                        return {
                            label: channel.title,
                            description: `Ссылка: t.me/${this.client.services.baseUtils.formatUsername(channel.username)} | Кол-во подписчиков: ${channel.subscribers}`,
                            value: this.client.services.baseUtils.formatUsername(
                                channel.username
                            ),
                            emoji: dto.tgChannels.includes(
                                this.client.services.baseUtils.formatUsername(
                                    channel.username
                                )
                            )
                                ? this.client.ui.emojis.selectedChannel
                                : this.client.ui.emojis.notSelectChannel
                        };
                    })
                )
        );
    }

    public selectPostingChannel() {
        return new ActionRowBuilder<ChannelSelectMenuBuilder>().addComponents(
            new ChannelSelectMenuBuilder()
                .setPlaceholder('🔍 Выбери канал для постов...')
                .setCustomId('SelectChannelForPosting')
        );
    }
}
