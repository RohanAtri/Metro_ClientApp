import { GETDROPDOWNLIST } from 'src/app/main/master/constants/master.route';
import { keyValue } from 'src/app/shared/shared.model';
import { ChangePasswordControls } from './../models/core.models';

class CoreModuleContants {

    allUserDropdown(): ChangePasswordControls[] {
        return [
            { path: GETDROPDOWNLIST.NAME, data: [], isDisable: true },
            { path: GETDROPDOWNLIST.PASSWORD, data: [], isDisable: false },
            { path: GETDROPDOWNLIST.USERNAME, data: [], isDisable: true },
            { path: GETDROPDOWNLIST.EMAILID, data: [], isDisable: true },
            { path: GETDROPDOWNLIST.MOBILE_NO, data: [], isDisable: true },
            { path: GETDROPDOWNLIST.ROLE, data: [], isDisable: true }
        ]
    }

    userControlNames(): keyValue[] {
        return [
            { id: "id", name: 'ID', type: 'text', isDisable: true },
            { id: "name", name: 'Name', type: 'text', isDisable: true },
            { id: "password", name: 'Password', type: 'text', notrequired: false, isDisable: false },
            { id: "confirmPassword", name: 'Confirm Password', type: 'text', notrequired: false, isDisable: false },
            { id: "userName", name: 'User Name', type: 'text', isDisable: true },
            { id: "email", name: 'Email ID', type: 'text', isDisable: true },
            { id: "mobile", name: 'Mobile', type: 'text', isDisable: true },
            { id: "roleIdNo", name: 'Role Name', type: 'select', isDisable: true },
            { id: "isActive", name: 'Status', type: 'text', isDisable: true }
        ]
    }
}

export const coreModuleConstants = new CoreModuleContants();