import { Collection, ApplicationCommand } from 'discord.js';
import { globSync } from 'glob';
import { LogLevel } from '@/enums/LogLevel';
import { MarciClient } from '@/core/client/ClientClass';
import Command from '@/core/handlers/interfaces/CommandInterface';

export class CommandsHandler {
    public readonly cache: Collection<string, Command> = new Collection();

    constructor(private readonly client: MarciClient) {}

    load() {
        try {
            const commandsPath = globSync(
                `${process.cwd()}/src/app/interactions/commands/**/*.ts`
            );

            Promise.all(
                commandsPath.map((path) => {
                    const command = require(`${process.cwd()}/${path}`)
                        .default as Command;

                    if (command) {
                        if (!command.options.disabled) {
                            this.cache.set(command.name, command);
                        }
                    }
                })
            ).then(async () => {
                const commands =
                    ((await this.client.application?.commands.fetch()) as Collection<
                        string,
                        ApplicationCommand
                    >) || [];

                commands.forEach((command) => {
                    if (!this.cache.has(command.name)) {
                        command.delete();
                    }
                });

                this.cache.forEach(async (command) => {
                    if (!commands.find((cmd) => cmd.name === command.name)) {
                        await this.client.application?.commands.create(
                            command.options.base
                        );
                    }
                });
            });
        } catch (error: any) {
            this.client.logger.log(
                LogLevel.WARN,
                `Не удалось загрузить файлы комманд\n${error.stack ?? error}`
            );
            return;
        }
    }
}
