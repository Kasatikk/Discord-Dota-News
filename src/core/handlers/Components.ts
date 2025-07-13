import { Collection } from 'discord.js';
import { globSync } from 'glob';
import { LogLevel } from '@/enums/LogLevel';
import { MarciClient } from '@/core/client/ClientClass';
import Component from '@/core/handlers/interfaces/ComponentInterface';

export class ComponentsHandler {
    public readonly cache: Collection<string, Component> = new Collection();

    constructor(private readonly client: MarciClient) {}

    load() {
        try {
            const componentsPath = globSync(
                `${process.cwd()}/src/app/interactions/components/**/*.ts`
            );

            componentsPath.map((path) => {
                const component = require(`${process.cwd()}/${path}`)
                    .default as Component;

                if (component) {
                    this.cache.set(component.options.name, component);
                }
            });
        } catch (error: any) {
            this.client.logger.log(
                LogLevel.WARN,
                `Не удалось загрузить файлы компонентов\n${error.stack ?? error}`
            );
            return;
        }
    }
}
