import {
    AutocompleteInteraction,
    ChatInputApplicationCommandData,
    MessageApplicationCommandData,
    UserApplicationCommandData
} from 'discord.js';

export default class Command {
    constructor(
        public readonly name: string,
        public readonly execute: Function,
        public readonly options: {
            base:
                | ChatInputApplicationCommandData
                | UserApplicationCommandData
                | MessageApplicationCommandData;
            disabled?: boolean;
        },
        public readonly autoComplete?: (
            interaction: AutocompleteInteraction<'cached'>
        ) => Promise<any>
    ) {}
}
