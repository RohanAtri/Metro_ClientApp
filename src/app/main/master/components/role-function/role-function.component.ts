import { RoleFunction } from './../../models/master.model';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MasterData } from '../../models/master.model';
import { MasterDataService } from '../../services/master-data-api.service';

@Component({
    selector: 'app-role-function',
    templateUrl: './role-function.component.html',
    styleUrls: ['./role-function.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleFunctionComponent implements OnInit, OnDestroy {


    @Input() modal: any;
    @Input()
    set dataToEdit(value: any) {
        this.roleFunctions = value;
    }
    get dataToEdit(): any {
        return this.roleFunctions;
    }

    @Output() saveRole: EventEmitter<RoleFunction> = new EventEmitter<RoleFunction>();

    masterDataToEdit: MasterData;
    roleFunctions: any;
    id: number;


    constructor(private masterDataService: MasterDataService) {

    }

    ngOnInit(): void {
    }

    closeModal() {
        this.modal.close('Close click');
    }

    saveRoleFunction(data: RoleFunction, typeName: string) {
        this.id = this.roleFunctions.id
        const dataToSave = {
            id: 0,
            roleId: this.id,
            functionId: data.functionId,
            type: typeName,
            hasAccess: data[typeName as keyof typeof data]
        }
        this.saveRole.emit(dataToSave);
    }

    ngOnDestroy(): void {
        //throw new Error('Method not implemented.');
    }
}
