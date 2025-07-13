import { modelOptions, prop, Severity } from '@typegoose/typegoose';

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW
    }
})
export class Dota {
    @prop()
    public guild!: string;

    @prop()
    public tgChannels!: string[];

    @prop()
    public usedPostsIds!: string[];

    @prop()
    public channelForPosting!: string;

    @prop({ default: false })
    public isEnabledPosting!: boolean;

    @prop({ default: false })
    public isEnabledComments!: boolean;

    @prop({ default: false })
    public isEnabledWebhook!: boolean;
}
