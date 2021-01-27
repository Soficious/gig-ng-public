import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentsComponent } from './payments/payments.component';
import { GeneratorComponent } from './generator/generator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodePipe } from './code.pipe';
import { DisableInputDirective } from './disable-input.directive';

@NgModule({
  declarations: [AppComponent, PaymentsComponent, GeneratorComponent, CodePipe, DisableInputDirective],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [CodePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
