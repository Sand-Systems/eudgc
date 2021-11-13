import { Buffer } from 'buffer';
export declare class Cose1 {
    protected_: Buffer;
    unprotected: Map<any, any>;
    payload: Buffer;
    signatures: Buffer;
    static decodeCborAsync(data: Buffer): Promise<null | any>;
    static valueOf(encodedData: string): Promise<Cose1 | null>;
    constructor(protected_: Buffer, unprotected: Map<any, any>, payload: Buffer, signatures: Buffer);
    makeDataForVerification(): Uint8Array;
    encodedUnsignedInteger(i: Uint8Array): Uint8Array;
    computeLength(x: number): Uint8Array;
    static set(src: Uint8Array, srcpos: number, dest: Uint8Array, destpos: number, n: number): void;
    encodeSignature(raw: Uint8Array): Uint8Array;
}
