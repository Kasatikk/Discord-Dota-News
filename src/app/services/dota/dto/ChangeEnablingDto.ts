export type ChangeEnablingDtoTypes = 'Post' | 'Comments' | 'Webhook';

export interface ChangeEnablingDto {
    readonly guildID: string;
    readonly type: ChangeEnablingDtoTypes;
}
