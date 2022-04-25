import { LethargyConfig } from './Lethargy.interface';
export default class Lethargy {
    private config;
    private lastUpDeltas;
    private lastDownDeltas;
    private deltasTimestamp;
    constructor(userConfig: LethargyConfig);
    check(e: WheelEvent): void;
    isInertia(direction: number): void;
}
