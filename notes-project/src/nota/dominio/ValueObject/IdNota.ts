import { v4 as uuidv4 } from 'uuid';

export class IdNota {
    getIDNota() {
        return this.UUID;
    }
    private UUID: string;

    constructor() {
        this.UUID = uuidv4();
    }

    getUUID(): string{
        return this.UUID;
    }
}