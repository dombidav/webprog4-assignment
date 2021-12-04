import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../../shared/services/auth.service'
import { MessageService } from 'primeng/api'
import { HOME, RedirectService } from '../../../shared/services/redirect.service'

/** Login page */
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: [ './login.page.scss' ],
})
export class LoginPage implements OnInit {
  /** Login form */
  formGroup: FormGroup
  /** Indicates if the form is submitted */
  isSubmitted = false

  /**
   * @param {FormBuilder} formBuilder Angular form builder instance
   * @param {AuthService} authService Responsible for authentication
   * @param {MessageService} toast Service Responsible for toast messages
   * @param {RedirectService} redirect Service Responsible for in-app redirects
   */
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toast: MessageService,
    private redirect: RedirectService
  ) {}

  /** returns the form group controls */
  get errorControl() {
    return this.formGroup.controls
  }

  /** Runs when the page is initialized */
  ngOnInit() {
    console.log('LoginPage::ngOnInit')
    /** Initialize the form with validators */
    this.formGroup = this.formBuilder.group({
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required ] ],
      rememberMe: [ false, [ Validators.required ] ],
    })
  }

  /**
   * Runs when the form is submitted
   * @param event Form submit event
   */
  submitForm(event: Event) {
    event.preventDefault() // Prevent default form submit
    this.isSubmitted = true
    if (!this.formGroup.valid) // If form is invalid we do not proceed
      return false

    /** If form is valid we proceed to login2 */
    this.authService.login(this.formGroup.value.email, this.formGroup.value.password, this.formGroup.value.rememberMe).then(res => {
      console.log('logged in', res)
      this.toast.add({ summary: 'Log in successful', severity: 'success' }) // Show success message
      this.redirect.intendedOr(HOME, false) // Redirect to home
    }).catch(err => {
      console.error('Login error: ', JSON.stringify(err, null, 2))
      this.toast.add({ summary: err.status === 403 ? 'Unknown credentials' : 'Server error. Try again later...', severity: 'error' }) // Show error message
    })
  }

}
