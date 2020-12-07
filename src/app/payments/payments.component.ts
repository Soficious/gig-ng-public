import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CodePipe } from '../code.pipe';
import { PaymentsData } from '../payments-data.interface';

import { StorageService } from '../storage.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  public code!: string;

  public paymentForm!: FormGroup;

  public payments!: PaymentsData[];

  constructor(
    private readonly storageService: StorageService,
    private fb: FormBuilder,
    private pipe: CodePipe
  ) {
    this.storageService.code.subscribe((serviceCode) => {
      this.code = serviceCode;
    });
    this.pipe = new CodePipe(storageService);
    this.storageService.paymentsData.subscribe((data) => {
      this.payments = data;
    });
  }

  public ngOnInit(): void {
    this.paymentForm = this.fb.group({
      payment: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    });
  }

  /**
   * Creates a new PaymentData and saves it on the service.
   * This information will be used to show the table of all the saved payments.
   */
  public addPayment(): void {
    const transformedCode = this.pipe.transform(this.code);

    const paymentData = {
      ...this.paymentForm.getRawValue(),
      code: transformedCode,
      gridData: this.storageService.grid.value,
    };

    this.storageService.addPaymentData(paymentData);
  }
}
