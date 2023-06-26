export enum UploadTypes {
    SALES_CR = 1,
    PENDING_PO = 2,
    PENDING_TO = 3,
    CLOSING = 4,
    TRF_WH2SH = 5,
    TRF_SH2SH = 6,
    SALES = 7
}

export class UploadTypesConst {
    constructor(uploadTypeId: number, uploadTypeCode: string, tabName: string, datatype: string, displayName: string) {
        this.uploadTypeId = uploadTypeId;
        this.uploadTypeCode = uploadTypeCode;
        this.tabName = tabName;
        this.datatype = datatype;
        this.displayName = displayName;
    }
    uploadTypeId: number;
    uploadTypeCode: string;
    tabName: string;
    datatype: string;
    displayName: string;
}

export class UploadOptionTypes {
    types: any[] = [
        new UploadTypesConst(1, "SALES_CR", "overview", "reference", "SALES_CR"),
        new UploadTypesConst(2, "PENDING_PO", "overview", "reference", "PENDING_PO"),
        new UploadTypesConst(3, "PENDING_TO", "overview", "reference", "PENDING_TO"),
        new UploadTypesConst(4, "CLOSING", "overview", "reference", "CLOSING"),
        new UploadTypesConst(5, "TRF_WH2SH", "overview", "reference", "TRF_WH2SH"),
        new UploadTypesConst(6, "TRF_SH2SH", "overview", "reference", "TRF_SH2SH"),
        new UploadTypesConst(7, "SALES", "overview", "reference", "SALES"),

        new UploadTypesConst(9, "DISTRIBUTION", "distribution", "limit", "Showroom wise limit distribution"),
        new UploadTypesConst(10, "DISTRIBUTION", "distribution", "quota", "Showroom wise quota distribution"),

        new UploadTypesConst(11, "SHOWROOM", "showroom", "limit", "Showroom level limit bifurcation"),
        new UploadTypesConst(12, "SHOWROOM", "showroom", "quota", "Showroom level quota bifurcation"),

        new UploadTypesConst(13, "LIMITQUOTA", "category", "limit", "Category wise limit"),
        new UploadTypesConst(14, "LIMITQUOTA", "category", "quota", "Category wise quota"),

        new UploadTypesConst(15, "LIMITQUOTA", "company", "limit", "Company wise limit"),
        new UploadTypesConst(16, "LIMITQUOTA", "company", "quota", "Company wise quota"),
    ];

    getDataAll(): any[] {
        return this.types;
    }
    
    getData(tabName: string): any[] {
        return this.types.filter(x => x.tabName == tabName);
    }
}

export const UploadOptionTypesConstants = new UploadOptionTypes();