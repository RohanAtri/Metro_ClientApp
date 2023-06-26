import { sharedConstants } from 'src/app/shared/constants/constants';
import { DashboardDropdownData } from '../models/dashboard.model';
import { DASHBOARD } from './dashboard.enums';
export class DashboardConstants {

    // public dependentDropdownList: DashboardDropdownData[] = [
    //     { path: DASHBOARD.SUB_CATEGORY, data: [] },
    //     { path: DASHBOARD.AG, data: [] },
    //     { path: DASHBOARD.BRAND_NAME, data: [] }
    // ];

    public filter: any = {
        companyId: null,
        genderId: null,
        categoryId: null,
        subcategoryId: null,
        agId: null,
        brandtypeId: null,
        brandnameId: null,
        periodId: null
    }

    public paginationSettings = {
        pageNo: 1,
        pageSize:sharedConstants.pageSizeOption[0],
        sortColumn: "name",
        sortOrder: 'desc'
    }

    allShowroomDropDownData(): DashboardDropdownData[] {
        return [
            { path: DASHBOARD.COMPANY, data: [] },
            { path: DASHBOARD.GENDER, data: [] },
            { path: DASHBOARD.BRAND_TYPE, data: [] },
            { path: DASHBOARD.CATEGORY, data: [] },
            { path: DASHBOARD.SUB_CATEGORY, data: [] },
            { path: DASHBOARD.AG, data: [] },
            { path: DASHBOARD.BRAND_NAME, data: [] },
            { path: DASHBOARD.PERIOD, data: [] }
        ];
    }

}

export const dashboardConstant = new DashboardConstants();