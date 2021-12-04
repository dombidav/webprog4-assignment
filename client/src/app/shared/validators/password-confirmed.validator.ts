import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export const PasswordConfirmedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')
  const confirmPassword = control.get('password_confirmation')
  return password
      && confirmPassword
      && password.touched
      && confirmPassword.touched
      && password.value !== confirmPassword.value
    ? { password_confirmation: false } : null
}
