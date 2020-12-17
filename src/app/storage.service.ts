import { BehaviorSubject, Observable, timer } from 'rxjs';

import { Injectable } from '@angular/core';
import { PaymentsData } from './payments-data.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly GRID_SIZE = 10;

  private readonly MAX_CHAR = 20;

  public code: Observable<string> = new Observable(this.codeGenerator);

  public charMap = new Map();

  public grid = new BehaviorSubject<Array<Array<string>>>([]);

  public paymentsData = new BehaviorSubject<Array<PaymentsData>>([]);

  constructor() {
    this.initializeCharMap();
    this.initializeGrid();
  }

  /**
   * Initializes Grid with random characters.
   * This grid is a 2D array with a fixed length.
   */
  public initializeGrid(): void {
    setInterval(() => {
      this.resetCharMap();
      this.grid.next(
        Array.from({ length: this.GRID_SIZE }, () =>
          Array.from({ length: this.GRID_SIZE }, () => {
            const randomChar = String.fromCharCode(
              'A'.charCodeAt(0) + Math.floor(Math.random() * 26)
            );
            let countChar = this.charMap.get(randomChar);
            this.charMap.set(randomChar, ++countChar);
            return randomChar;
          })
        )
      );
    }, 2000);
  }

  /**
   * Generates a new Grid with the given character occupying a percentage on the gridpreviously defined.
   * @param inputChar string
   */
  public generateGrid(inputChar: string): void {
    if (inputChar) {
      const upperCaseChar = inputChar.toUpperCase();
      let mapStr = this.charMap.get(upperCaseChar);
      while (mapStr < this.MAX_CHAR) {
        const randomI = Math.floor(Math.random() * this.GRID_SIZE);
        const randomJ = Math.floor(Math.random() * this.GRID_SIZE);
        const currentChar = this.grid.value[randomI][randomJ];
        if (currentChar !== upperCaseChar) {
          this.charMap.set(upperCaseChar, ++mapStr);
          let currentCharCount = this.charMap?.get(currentChar);
          this.charMap.set(currentChar, --currentCharCount);

          this.grid.value[randomI][randomJ] = upperCaseChar;
        }
      }
      this.grid.next(this.grid.value);
    }
  }

  /**
   * Adds Payment Data to the paymentData Subject array so that it can be later used to send to an external
   * API if necessary
   *
   * @param paymentData PaymentData
   */
  public addPaymentData(paymentData: PaymentsData): void {
    const currentValue = this.paymentsData.value;
    const updatedValue = [...currentValue, paymentData];
    this.paymentsData.next(updatedValue);
  }

  /**
   * Initializes a character Map. This Map has all of the twenty-six(26) letters of the alphabet and the count for their presence
   * on the grid. By default, this count will be zero(0).
   */
  private initializeCharMap(): void {
    for (let i = 0; i < 26; i++) {
      this.charMap.set(String.fromCharCode('A'.charCodeAt(0) + i), 0);
    }
  }

  /**
   * Resets the character Map to ensure that everytime a new grid is created, the count of the characters
   * are set to zero(0).
   */
  private resetCharMap(): void {
    [...this.charMap.keys()].forEach((key) => this.charMap.set(key, 0));
  }

  /**
   * Generates a code to be used. This code is of the current time seconds.
   * @param sub subject
   */
  private codeGenerator(sub: any): void {
    setInterval(() => {
      let currentSeconds: any = new Date().getSeconds().toString();
      if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
      }
      sub.next(currentSeconds);
    }, 2000);
  }
}
