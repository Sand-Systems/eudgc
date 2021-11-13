import { CertInfo } from "./trustlist";
export interface EuDgcCert {
    v: EuDgcVaccincation[];
    dob: string;
    nam: {
        fn: string;
        gn: string;
        fnt: string;
        gnt: string;
    };
    ver: string;
}
export interface EuDgcVaccincation {
    ci: string;
    co: string;
    dn: number;
    dt: string;
    is: string;
    ma: string;
    mp: string;
    sd: number;
    tg: string;
    vp: string;
}
export interface ValidationOptions {
    certFilter?: (certInfo: CertInfo) => boolean;
    explicitCerts?: CertInfo[];
}
export declare class EuDgc {
    /**
     * Parses the data of a digital vaccination qrcode and returns a promise
     *
     * @param encodedData the data inside the qr-code.
     * @returns a javascrip structure with the contents
     */
    static parse(encodedData: string): Promise<EuDgcCert>;
    static validate(encodedData: string, options?: ValidationOptions): Promise<CertInfo | null>;
}
