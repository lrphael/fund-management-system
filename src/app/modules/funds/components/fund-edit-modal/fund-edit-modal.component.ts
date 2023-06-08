import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Fund } from '@models/fund.model';
import { FundService } from '@services/fund.service';

@Component({
  selector: 'app-fund-edit-modal',
  templateUrl: './fund-edit-modal.component.html',
  styleUrls: ['./fund-edit-modal.component.scss']
})
export class FundEditModalComponent implements OnInit {
  fundForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<FundEditModalComponent>,
    private formBuilder: FormBuilder,
    private fundService: FundService,
    @Inject(MAT_DIALOG_DATA) public data: Fund
  ) { }

  ngOnInit(): void {
    this._initForm();
    this.isEditMode = !!this.data;
    if (this.isEditMode) {
      this._patchFormValues(this.data!);
    }
  }

  private _initForm(): void {
    this.fundForm = this.formBuilder.group({
      name: ['', Validators.required],
      interest: ['', Validators.required],
      minimumValue: ['', Validators.required],
      maximumValue: ['', Validators.required],
      mandatoryPeriodMonths: ['', Validators.required],
      description: ['']
    });
  }

  private _patchFormValues(fund: Fund): void {
    this.fundForm.patchValue({
      name: fund.name,
      interest: fund.interest,
      minimumValue: fund.minimumValue,
      maximumValue: fund.maximumValue,
      mandatoryPeriodMonths: fund.mandatoryPeriodMonths,
      description: fund.description
    });
  }

  private _createFundObject(): Fund {
    const formValues = this.fundForm.value;
    return {
      id: this.isEditMode ? this.data.id : 0,
      name: formValues.name,
      interest: formValues.interest,
      minimumValue: formValues.minimumValue,
      maximumValue: formValues.maximumValue,
      mandatoryPeriodMonths: formValues.mandatoryPeriodMonths,
      description: formValues.description
    };
  }

  private _createFundRequest(): Observable<Fund> {
    return this.fundService.getFundMaxId().pipe(
      switchMap((maxId: number) => {
        const fundObject: Fund = this._createFundObject();
        fundObject.id = this.isEditMode ? fundObject.id : maxId + 1;
        return this.isEditMode ? this.fundService.updateFund(fundObject) : this.fundService.createFund(fundObject);
      })
    );
  }

  save(): void {
    if (this.fundForm.invalid) {
      return;
    }
    this._createFundRequest().subscribe((data) => {
      this.dialogRef.close();
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
