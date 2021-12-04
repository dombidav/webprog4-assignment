import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function passwordValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {
    if (!control.value)
      return null
    return !(control.value < 8 && /[A-Z]+/.test(control.value) && /[a-z]+/.test(control.value) && /[0-9]+/.test(control.value)) ? { passwordStrength:true } : null
  }
}
