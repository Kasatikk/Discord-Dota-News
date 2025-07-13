import { DocumentType } from '@typegoose/typegoose';
import { EmbedBuilder, GuildMember } from 'discord.js';
import { stripIndents } from 'common-tags';
import { Dota } from '@/app/services/dota/database/models/Dota';
import { MarciClient } from '@/core/client/ClientClass';

export class EmbedManager {
    constructor(private readonly client: MarciClient) {}

    public default(member: GuildMember, title: string, description: string) {
        return new EmbedBuilder()
            .setTitle(`—・ ${title}`)
            .setColor(2829617)
            .setDescription(`${member.toString()}, ${description}`)
            .setThumbnail(this.client.services.baseUtils.getAvatar(member));
    }

    public adminPanel(dto: DocumentType<Dota>, member: GuildMember) {
        return new EmbedBuilder()
            .setTitle('—・ Управление постами')
            .setColor(2829617)
            .setThumbnail(this.client.services.baseUtils.getAvatar(member))
            .setDescription(
                stripIndents(`
                    >>> *Постинг включен:* ${dto.isEnabledPosting ? this.client.ui.emojis.selectedChannel : this.client.ui.emojis.notSelectChannel}
                    *Комменты включены:* ${dto.isEnabledComments ? this.client.ui.emojis.selectedChannel : this.client.ui.emojis.notSelectChannel}
                    *Постинг вебхуком:* ${dto.isEnabledWebhook ? this.client.ui.emojis.selectedChannel : this.client.ui.emojis.notSelectChannel}
                    *Кол-во выбранных телеграмм-каналов:* **${dto.tgChannels.length}**
                    *Канал для постинга:* ${dto.channelForPosting ? `<#${dto.channelForPosting}>` : this.client.ui.emojis.notSelectChannel}
                `)
            );
    }

    public telegramPost(dto: {
        description: string;
        photos: string[];
        error?: string;
        postId: number;
        channel: string;
    }) {
        const embed = new EmbedBuilder()
            .setURL(`https://t.me/${dto.channel}/${dto.postId}`)
            .setTitle('Новый пост')
            .setColor(2829617)
            .setDescription(dto?.description || ' ')
            .setFooter({ text: `https://t.me/${dto.channel}/${dto.postId}` })
            .setTimestamp();

        dto.photos.length > 0 ? embed.setImage(dto.photos[0]) : null;

        return embed;
    }
}
