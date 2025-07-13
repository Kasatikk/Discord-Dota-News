import { GuildMember, User, ImageSize } from 'discord.js';

export class BaseUtils {
    public getAvatar(member: GuildMember | User, size: ImageSize = 4096) {
        return member.displayAvatarURL({
            extension: 'png',
            forceStatic: false,
            size: size
        });
    }

    public async sleep(ms: number) {
        await new Promise((r) => setTimeout(r, ms));
    }

    public formatUsername(channelUsername: string) {
        return channelUsername.split('@')[1];
    }
}
