import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter.component';

@NgModule({
  declarations: [
    CounterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CounterModule { }
