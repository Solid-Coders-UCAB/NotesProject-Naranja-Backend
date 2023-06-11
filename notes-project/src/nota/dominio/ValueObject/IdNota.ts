import { v4 as uuidv4 } from 'uuid';

export class IdNota {
    private UUID: string;

    constructor() {
        this.UUID = uuidv4();
    }

    getUUID(): string{
        return this.UUID;
    }
}