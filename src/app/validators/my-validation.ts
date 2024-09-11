import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { map } from "rxjs/operators"
import { EmpleadoService } from "../services/empleado.service";
import moment from "moment";

export class MyValidation {

    constructor(public empleadoService: EmpleadoService) {

    }




    static existsEmail(_empleadoService: EmpleadoService) {
        return (control: AbstractControl) => {
            const value = control.value;
            return _empleadoService.verifyEmail(value).pipe(
                map(res => {
                    return !res.existe ? null : { existe: true };
                })
            );
        }
    }

    static dateMinimun(date: string | undefined): ValidatorFn {
        console.log(date);
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value == null) {
                return null;
            }

            const controlDate = moment(control.value, 'YYYY-MM-DD');
            if (!controlDate.isValid()) {
                return null;
            }
            const validationDate = moment(date);

            return controlDate.isAfter(validationDate) ? null : {
                'date-minimum': {
                    'date-minimum': validationDate.format('YYYY-MM-DD'),
                    'actual': controlDate.format('YYYY-MM-DD')
                }
            };
        }
    }


}