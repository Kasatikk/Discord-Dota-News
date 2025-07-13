import { globSync } from 'glob';
import { MarciClient } from '@/core/client/ClientClass';
import { LogLevel } from '@/enums/LogLevel';
import Event from '@/core/handlers/interfaces/EventInterface';

export class EventHandler {
    constructor(private readonly client: MarciClient) {}

    load() {
        try {
            const eventPath = globSync(
                `${process.cwd()}/src/app/events/**/*.ts`
            );

            eventPath.map((path) => {
                const event = require(`${process.cwd()}/${path}`)
                    .default as Event;
                if (!event.options.once) {
                    this.client.on(
                        event.options.name,
                        event.execute.bind(null, this.client)
                    );
                } else {
                    this.client.once(
                        event.options.name,
                        event.execute.bind(null, this.client)
                    );
                }
            });
        } catch (error: any) {
            this.client.logger.log(
                LogLevel.WARN,
                `Не удалось загрузить файлы ивентов\n${error.stack ?? error}`
            );
            return;
        }
    }
}
