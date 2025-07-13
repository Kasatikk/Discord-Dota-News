import { DocumentType } from '@typegoose/typegoose';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { Dota } from '@/app/services/dota/database/models/Dota';

export class Buttons {
    public adminPanel(dto: DocumentType<Dota>) {
        return new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setLabel(`${!dto.isEnabledPosting ? 'Вкл.' : 'Выкл.'} постинг`)
                .setStyle(ButtonStyle.Secondary)
                .setCustomId('ChangeEnabling-Post'),
            new ButtonBuilder()
                .setLabel(
                    `${!dto.isEnabledComments ? 'Вкл.' : 'Выкл.'} комменты`
                )
                .setStyle(ButtonStyle.Secondary)
                .setCustomId('ChangeEnabling-Comments'),
            new ButtonBuilder()
                .setLabel(
                    `${!dto.isEnabledWebhook ? 'Вкл.' : 'Выкл.'} посты вебхуком`
                )
                .setStyle(ButtonStyle.Secondary)
                .setCustomId('ChangeEnabling-Webhook')
        );
    }

    public telegramPostLink(postLink: string) {
        return [
            new ActionRowBuilder<ButtonBuilder>().addComponents(
                new ButtonBuilder()
                    .setLabel('Перейти к посту')
                    .setStyle(ButtonStyle.Link)
                    .setURL(postLink)
            )
        ];
    }
}
