import { LIMITANDQUOTA } from './limit-quota.enums';
import { LimitQuotaDropdownData } from "../models/limit-quota-interface";
import { sharedConstants } from 'src/app/shared/constants/constants';

class LimitQuota {

    public dependentDropdownList: LimitQuotaDropdownData[] = [
        { path: LIMITANDQUOTA.GENDER, data: [], controlName: 'companyId' },
        { path: LIMITANDQUOTA.BRAND_TYPE, data: [], controlName: 'brandtypeId' },
        { path: LIMITANDQUOTA.CATEGORY, data: [], controlName: 'categoryId' }
    ];

    public filter = {
        companyId: null,
        genderId: null,
        categoryId: null,
        subcategoryId: null,
        agId: null,
        brandtypeId: null,
        brandnameId: null,
        periodId: null
    }

    public paginationControls = {
        pageNo: 1,
        pageSize: sharedConstants.pageSizeOption[1],
        sortColumn: "name",
        sortOrder: 'desc'
    }

    tabChangeEvent: any = {
        activeId: 0,
        nextId: 1
    }

    getLimitQuotaDropDownData(): LimitQuotaDropdownData[] {
        return [
            { path: LIMITANDQUOTA.COMPANY, data: [], controlName: 'companyId' },
            // { path: LIMITANDQUOTA.GENDER, data: [], controlName: 'genderId' },
            // { path: LIMITANDQUOTA.BRAND_TYPE, data: [], controlName: 'brandtypeId' },
            // { path: LIMITANDQUOTA.CATEGORY, data: [], controlName: 'categoryId' },
            { path: LIMITANDQUOTA.PERIOD, data: [], controlName: 'periodId' },
        ]
    }
}

export const limitQuota = new LimitQuota();