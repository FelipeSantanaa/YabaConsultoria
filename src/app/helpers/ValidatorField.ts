import { AbstractControl, FormGroup } from "@angular/forms";

export class ValidatorField {

  static MustMach(controlName: string, mathchingControlName: string): any{

    return(group: AbstractControl)=> {
      const formGroup = group as FormGroup;
      const control = formGroup.controls[controlName];
      const matchingControl = group as FormGroup;

      if(matchingControl.errors && !matchingControl.errors.mustMach){
        return null;
      }

      if(control.value !== matchingControl.value){
        matchingControl.setErrors({mustMach: true});
      }else{
        matchingControl.setErrors(null);
      }

      return null;
    };
  }
}
