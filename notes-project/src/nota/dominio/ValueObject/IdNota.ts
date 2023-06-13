import { v4 as uuidv4 } from 'uuid';

export class IdNota {
    getIDNota() {
        return this.UUID;
    }
    private UUID: string;

    private constructor() {
        this.UUID = uuidv4();
    }

    static create(): IdNota {
        return new IdNota();
    }

}