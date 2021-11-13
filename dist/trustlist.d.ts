export interface CertInfo {
    subject: string;
    issuer: string;
    notbefore: number;
    notafter: number;
    pubkey: string;
    rawX509data: string;
}
export declare class Trustlist {
    static instance: Trustlist;
    private initialized;
    private certInfos;
    getCertInfos(): Promise<CertInfo[]>;
}
