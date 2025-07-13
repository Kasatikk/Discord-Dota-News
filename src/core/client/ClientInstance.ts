import { LogLevel } from '@/enums/LogLevel';
import { MarciClient } from '@/core/client/ClientClass';

export const client = new MarciClient();

export const start = () => {
    client.logger.listen();
    client.events.load();

    client.login(process.env['BOT_TOKEN']).then(async () => {
        client.logger.log(
            LogLevel.INFO,
            `Клиент запущен на кластере #${client.cluster.id + 1}`
        );

        await client.services.database.connect();
        client.components.load();
        client.commands.load();
    });
};
