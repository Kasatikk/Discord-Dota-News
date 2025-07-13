import { DocumentType } from '@typegoose/typegoose';
import { Collection } from 'discord.js';
import { DotaModel } from '@/app/services/dota/database/models/Central';
import { Dota } from '@/app/services/dota/database/models/Dota';
import { ChangeEnablingDto } from '@/app/services/dota/dto/ChangeEnablingDto';
import { SetChannelDto } from '@/app/services/dota/dto/SetChannelDto';
import { UpdateTgChannelsDto } from '@/app/services/dota/dto/UpdateTgChannelsDto';
import { MarciClient } from '@/core/client/ClientClass';
import { LogLevel } from '@/enums/LogLevel';

export class DotaDatabaseMethods {
    public readonly cache: Collection<string, DocumentType<Dota>> =
        new Collection();

    constructor(private readonly client: MarciClient) {}

    public async init() {
        const allGuildsInDb = await DotaModel.find();

        for (let i = 0; i < allGuildsInDb.length; i++) {
            const doc = allGuildsInDb[i];
            this.cache.set(doc.guild, doc);
        }
    }

    public async findGuildById(guildID: string) {
        let guild =
            this.cache.get(guildID) ??
            (await DotaModel.findOne({ guild: guildID })) ??
            (await DotaModel.create({ guild: guildID }));

        if (!this.cache.has(guildID)) this.cache.set(guildID, guild);
        return guild;
    }

    public async changeEnabling(dto: ChangeEnablingDto) {
        const guild = await this.findGuildById(dto.guildID);

        switch (dto.type) {
            case 'Post':
                guild.isEnabledPosting = !guild.isEnabledPosting;
                break;
            case 'Comments':
                guild.isEnabledComments = !guild.isEnabledComments;
                break;
            case 'Webhook':
                guild.isEnabledWebhook = !guild.isEnabledWebhook;
                break;
        }
        await this.save(guild);

        return guild;
    }

    public async updateTgChannels(dto: UpdateTgChannelsDto) {
        const guild = await this.findGuildById(dto.guildID);
        const sortedChannels = this.resolveChannels(guild, dto.channels);

        guild.tgChannels = [
            ...guild.tgChannels.filter(
                (channel) => !sortedChannels.channelsForRemove.includes(channel)
            ),
            ...sortedChannels.channelsForPush
        ];
        await this.save(guild);

        return {
            sortedChannels,
            guild
        };
    }

    public async setChannelForPosting(dto: SetChannelDto) {
        const guild = await this.findGuildById(dto.guildID);

        guild.channelForPosting = dto.channelId;
        await this.save(guild);

        return guild;
    }

    public async save(doc: DocumentType<Dota>) {
        await doc.save().catch((error: any) => {
            this.client.logger.log(
                LogLevel.ERROR,
                `Не удалось сохранить гильдию ${doc.guild}\n${error.stack ?? error}`
            );
        });
        this.cache.set(doc.guild, doc);
    }

    private resolveChannels(dto: DocumentType<Dota>, channels: string[]) {
        return {
            channelsForRemove: channels.filter((channel) =>
                dto.tgChannels.includes(channel)
            ),
            channelsForPush: channels.filter(
                (channel) => !dto.tgChannels.includes(channel)
            )
        };
    }
}
