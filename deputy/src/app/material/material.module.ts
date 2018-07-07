import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatSnackBarModule, MatTableModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';


@NgModule({
  imports: [
      CommonModule,
      MatButtonModule,
      MatCheckboxModule,
      MatToolbarModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatProgressSpinnerModule,
      MatProgressBarModule,
      ReactiveFormsModule,
      FormsModule,
      MatSnackBarModule,
      MatTableModule,
      MatDatepickerModule,
      MatNativeDateModule
  ],
  exports: [
      MatButtonModule,
      MatCheckboxModule,
      MatToolbarModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatProgressSpinnerModule,
      MatProgressBarModule,
      ReactiveFormsModule,
      FormsModule,
      MatSnackBarModule,
      MatTableModule,
      MatDatepickerModule,
      MatNativeDateModule
  ],
  declarations: []
})
export class MaterialModule { }
