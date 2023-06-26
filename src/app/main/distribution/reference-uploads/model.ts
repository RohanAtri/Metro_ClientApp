import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class Model {
    name: string = "Default value";

    updated: Subject<void> = new Subject<void>();
}