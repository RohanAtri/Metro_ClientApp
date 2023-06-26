export interface Distribution {
    id?: number;
    showroom?: string;
    limit?: number;
    closing?: number;
    trfSh2sh?: number;
    trfWh2wh?: number;
    pendingTo?: number;
    pendingPo?: number;
    saleCr?: number;
    totalClosing?: number;
    sale?: number;
    quota?: number;
    avgQuota?: number;
    saleOnQuota?: number;
    avgQuotaNxtMonth?: number;
    closingLimit?: number;
    closingSale?: number;
}

export interface DistributionHeaders {
    propName: string;
    placeholderName: string;
    canEdit?: boolean;
}

export interface DistributionTable {
    header: DistributionHeaders[],
    data: Distribution[]
}
export interface DistributionDropdownData {
    path: string;
    data: FieldsValue[];
}

export interface FieldsValue {
    id: number;
    name: string
}
export interface ReferenceList {
    id: number;
    name: string;
    isActive: boolean;
}