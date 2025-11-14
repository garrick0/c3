/**
 * Progress spinner utilities
 */

export class Spinner {
  private message: string;
  private isSpinning: boolean = false;

  constructor(message: string) {
    this.message = message;
  }

  start(): void {
    this.isSpinning = true;
    console.log(`⏳ ${this.message}...`);
  }

  succeed(message?: string): void {
    this.isSpinning = false;
    console.log(`✅ ${message || this.message}`);
  }

  fail(message?: string): void {
    this.isSpinning = false;
    console.log(`❌ ${message || this.message}`);
  }

  stop(): void {
    this.isSpinning = false;
  }
}

export function createSpinner(message: string): Spinner {
  return new Spinner(message);
}
