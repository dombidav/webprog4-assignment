import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { PasswordInputComponent } from './components/password-input/password-input.component'

/** Module for grouping shared components */
@NgModule({
  declarations: [
    PasswordInputComponent
  ],
  exports: [
    PasswordInputComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SharedModule {
}
