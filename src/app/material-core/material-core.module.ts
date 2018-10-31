import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatDividerModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatGridListModule,
  MatInputModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatButtonToggleModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatAutocompleteModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatTooltipModule
  ]
})
export class MaterialCoreModule { }
