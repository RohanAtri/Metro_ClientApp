import { DistributionDropdownData } from './../models/distribution.model';
import { DISTRIBUTION } from './distribution.enums';
export class DistributionConstants {

    public dependentDropdownList: DistributionDropdownData[] = [
        { path: DISTRIBUTION.GENDER, data: [] },
        { path: DISTRIBUTION.BRAND_TYPE, data: [] },
        { path: DISTRIBUTION.CATEGORY, data: [] },
        { path: DISTRIBUTION.SUB_CATEGORY, data: [] },
        { path: DISTRIBUTION.AG, data: [] },
        { path: DISTRIBUTION.BRAND_NAME, data: [] }
    ];

    public filter: any = {
        companyId: null,
        genderId: null,
        categoryId: null,
        subcategoryId: null,
        agId: null,
        brandtypeId: null,
        brandnameId: null,
        periodId: null,
        showroomName: null
    }

    public paginationSettings = {
        pageNo: 1,
        pageSize: 15,
        sortColumn: "name",
        sortOrder: 'desc'
    }

    allShowroomDropDownData(): DistributionDropdownData[] {
        return [
            { path: DISTRIBUTION.COMPANY, data: [] },
            { path: DISTRIBUTION.PERIOD, data: [] }
        ];
    }

}

export const distributionConstant = new DistributionConstants();