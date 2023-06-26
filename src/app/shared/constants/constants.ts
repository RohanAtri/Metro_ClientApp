import { menuList } from "../shared.model";
import { RoleFunctions } from "./shared.enums";

class SharedConstants {
    navBarMenu(): menuList[] {
        let menuList: menuList[] = [];
        menuList = [
            {
                id: 0,
                name: 'Dashboard',
                function : RoleFunctions.Dashboard,
                path: 'dashboard'
            },
            {
                id: 1,
                name: 'Overview',
                path: 'overview',
                function: RoleFunctions.Overview
            },
            {
                id: 2,
                name: 'Masters',
                path: 'masters',
                function: RoleFunctions.Masters
            },
            {
                id: 3,
                name: 'Report',
                path: '/report',
                function: RoleFunctions.Reports
            },
            {
                id: 4,
                name: 'Distribution',
                path: 'distribution',
                function: RoleFunctions.Distribution
            },
            {
                id: 5,
                name: 'Limit & Quota',
                path: 'limitQuota',
                function: RoleFunctions.LimitAndQuota
            },
        ];
        return menuList;
    }

    pageSizeOption: number[] = [15, 30, 50, 100, 200, 500];
}

export const sharedConstants = new SharedConstants();