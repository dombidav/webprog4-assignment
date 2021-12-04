import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthRoutingModule } from './auth-routing.module'
import { SharedModule } from '../../shared/shared.module'
import { IonicModule } from '@ionic/angular'
import { ReactiveFormsModule } from '@angular/forms'

/** Handles Authentication and authorization*/
@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule,
        IonicModule,
        ReactiveFormsModule
    ]
})
export class AuthModule { }
