import { ClusterManager } from 'discord-hybrid-sharding';

const manager = new ClusterManager(`${__dirname}/Marci.ts`, {
    totalShards: 2,
    shardsPerClusters: 1,
    token: process.env['BOT_TOKEN'],
    queue: {
        auto: true
    }
});

manager.spawn();
