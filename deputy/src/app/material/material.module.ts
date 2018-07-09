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
  MatSnackBarModule, MatTableModule, MatDatepickerModule, MatNativeDateModule, MatExpansionModule, MatGridListModule,
  MatListModule, MatCardModule, MatMenuModule, MatSortModule
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
      MatNativeDateModule,
      MatExpansionModule,
      MatListModule,
      MatCardModule,
      MatMenuModule,
      MatSortModule
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
      MatNativeDateModule,
      MatExpansionModule,
      MatListModule,
      MatCardModule,
      MatMenuModule,
      MatSortModule
  ],
  declarations: []
})
export class MaterialModule { }
