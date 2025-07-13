export default class Component {
    constructor(
        public readonly options: { name: string },
        public readonly execute: Function
    ) {}
}
