import mongoose from 'mongoose';
import { DotaDatabaseMethods } from '@/app/services/dota/database/DotaDatabaseMethods';
import { MarciClient } from '@/core/client/ClientClass';
import { LogLevel } from '@/enums/LogLevel';

export class DatabaseService {
    public readonly dota: DotaDatabaseMethods;

    constructor(private readonly client: MarciClient) {
        this.dota = new DotaDatabaseMethods(client);
    }

    async connect() {
        try {
            await mongoose
                .connect(process.env['DATABASE_URL']!, {
                    serverSelectionTimeoutMS: 20000,
                    socketTimeoutMS: 45000,
                    connectTimeoutMS: 30000
                })
                .then(() =>
                    this.client.logger.log(
                        LogLevel.INFO,
                        'Успешное подключение к базе данных'
                    )
                );

            await this.dota
                .init()
                .then(() =>
                    this.client.logger.log(
                        LogLevel.INFO,
                        'Проинициализирован кэш базы данных'
                    )
                );

            await this.client.services.methods.parser
                .initCache()
                .then(() =>
                    this.client.logger.log(
                        LogLevel.INFO,
                        'Проинициализирован кэш тг каналов'
                    )
                );
        } catch (error: any) {
            this.client.logger.log(
                LogLevel.WARN,
                `Ошибка подключения к базе данных\n${error.stack ?? error}`
            );
            return;
        }
    }
}
