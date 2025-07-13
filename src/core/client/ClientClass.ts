import { Client as DJSClient, Options } from 'discord.js';
import { getInfo, ClusterClient } from 'discord-hybrid-sharding';
import { DatabaseService } from '@/services/internal/DatabaseService';
import { EventHandler } from '@/core/handlers/Events';
import { ComponentsHandler } from '@/core/handlers/Components';
import { CommandsHandler } from '@/core/handlers/Commands';
import { LoggerService } from '@/services/internal/LoggerService';
import { BaseUtils } from '@/services/internal/BaseUtils';
import { ParserService } from '@/services/telegram/ParserService';
import { UI } from '@/cfg/UIConfig';
import { BuilderManager } from '@/core/builders/BuildersManager';
import { DotaMethods } from '@/app/services/dota/methods/DotaMethods';

export class MarciClient extends DJSClient {
    public readonly cluster: ClusterClient;
    public readonly logger: LoggerService;
    public readonly events: EventHandler;
    public readonly commands: CommandsHandler;
    public readonly components: ComponentsHandler;
    public readonly services: {
        database: DatabaseService;
        baseUtils: BaseUtils;
        methods: {
            parser: ParserService;
            dota: DotaMethods;
        };
        builders: BuilderManager;
    };
    public readonly ui: UI;

    constructor() {
        super({
            intents: 131071,
            shards: getInfo().SHARD_LIST,
            shardCount: getInfo().TOTAL_SHARDS,
            sweepers: {
                ...Options.DefaultSweeperSettings
            },
            makeCache: Options.cacheWithLimits({
                ...Options.DefaultMakeCacheSettings,
                GuildMessageManager: {
                    maxSize: 100,
                    keepOverLimit: (message) =>
                        message.author.id === this.user!.id
                },
                GuildTextThreadManager: {
                    maxSize: 100
                }
            })
        });

        this.cluster = new ClusterClient(this);
        this.logger = new LoggerService();
        this.events = new EventHandler(this);
        this.commands = new CommandsHandler(this);
        this.components = new ComponentsHandler(this);
        this.services = {
            database: new DatabaseService(this),
            baseUtils: new BaseUtils(),
            builders: new BuilderManager(this),
            methods: {
                parser: new ParserService(),
                dota: new DotaMethods(this)
            }
        };
        this.ui = new UI();
    }
}
