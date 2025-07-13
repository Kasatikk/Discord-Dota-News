export default class Event {
    constructor(
        public readonly options: { name: string; once?: boolean },
        public readonly execute: Function
    ) {}
}
