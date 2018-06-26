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
    MatSnackBarModule
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
      MatSnackBarModule
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
      MatSnackBarModule
  ],
  declarations: []
})
export class MaterialModule { }
