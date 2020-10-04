import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  constructor() {}

  public lowerBound = 1;
  public upperBound = 1000;
  public maxChances = 3;

  public inputNumber: number;
  public luckyNumber = 635;
  public chances: number;

  public attempts = new Array<number>();

  public isInputDisabled = false;
  public hasErrors = false;
  public luckedOut = false;

  ngOnInit(): void {
    this._checkLocalStorage();

    if (this.chances <= 0) {
      this.isInputDisabled = true;
    }
  }

  private _checkLocalStorage() {
    const storedAttempts = JSON.parse(localStorage.getItem('attempts'));
    if (storedAttempts) {
      this.attempts = storedAttempts;
      this.chances = this.maxChances - this.attempts.length;
    } else this.chances = this.maxChances;
  }

  public checkNumber(number: string) {
    this.inputNumber = parseInt(number);

    this.attempts.push(this.inputNumber);
    localStorage.setItem('attempts', JSON.stringify(this.attempts));

    if (this.inputNumber === this.luckyNumber) this._onSuccess();
    else {
      this._onFailedAttempt();
    }
  }

  public checkRange(number: string) {
    const int = parseInt(number);
    if (int < this.lowerBound || int > this.upperBound) this.hasErrors = true;
    else this.hasErrors = false;
  }

  private _onSuccess() {
    alert('Hooray! You got it right!');
    this.isInputDisabled = true;
    this.luckedOut = true;
  }

  private _onFailedAttempt() {
    this.chances--;
    alert('No luck this time, try again.' + this.chances + ' attempts left!');

    if (this.chances === 0) {
      this.isInputDisabled = true;
    }
  }

  public resetGame() {
    localStorage.clear();
    this._generateLuckyNumber();
    this.attempts = new Array<number>();
    this.chances = this.maxChances;
    this.luckedOut = false;
    this.isInputDisabled = false;
  }

  private _generateLuckyNumber() {
    this.luckyNumber =
      Math.floor(Math.random() * this.upperBound) + this.lowerBound;
  }
}
