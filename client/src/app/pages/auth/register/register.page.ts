import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { PasswordConfirmedValidator } from '../../../shared/validators/password-confirmed.validator'
import { RestService } from '../../../shared/services/rest.service'
import { MessageService } from 'primeng/api'
import { PAGES, RedirectService } from 'src/app/shared/services/redirect.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: [ './register.page.scss' ],
})
export class RegisterPage implements OnInit {
  registerForm = this.formBuilder.group({
    name: [ '', Validators.compose([ Validators.required, Validators.minLength(3) ]) ],
    email: [ '', Validators.compose([ Validators.required, Validators.email ]) ],
    password: [ '', Validators.compose([ Validators.required, ]) ],
    password_confirmation: [ '', Validators.compose([ Validators.required, ]) ],
  }, { validators: [ PasswordConfirmedValidator ] })

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly rest: RestService,
    private readonly toast: MessageService,
    private readonly redirect: RedirectService,
  ) {}

  ngOnInit() {
    return
  }

  register() {
    this.rest.post('register', this.registerForm.value).subscribe(
      () => {
        this.toast.add({ severity: 'success', summary: 'Success', detail: 'You have successfully registered' })
        this.redirect.to(PAGES.login.url, { queryParams: { email: this.registerForm.value.email } })
      },
      (error) => this.toast.add({ severity: 'error', summary: 'Error', detail: error.error.message })
    )
  }
}
