/**
 * Payment Utilities Tests
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  formatCurrency,
  formatCurrencyForApi,
  formatPhoneNumberDisplay,
  isValidEmail,
  isValidKenyanPhone,
  generateReferenceId,
  generateIdempotencyKey,
  retryWithBackoff,
  parseApiError,
  maskSensitiveData,
  getPaymentMethodName,
  calculateServiceFee,
  formatTransactionDate,
  getPaymentStatusColor,
  convertCurrency,
  isValidPaymentAmount,
} from '../lib/payment-utils';

describe('formatCurrency', () => {
  it('should format USD currency correctly', () => {
    expect(formatCurrency(100, 'USD')).toBe('$100.00');
    expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
    expect(formatCurrency(0.99, 'USD')).toBe('$0.99');
  });

  it('should format KES currency correctly', () => {
    // Intl.NumberFormat uses non-breaking space (\u00a0) between currency and number
    expect(formatCurrency(1000, 'KES')).toContain('KES');
    expect(formatCurrency(1000, 'KES')).toContain('1,000.00');
    expect(formatCurrency(12345.67, 'KES')).toContain('12,345.67');
  });

  it('should default to USD when no currency provided', () => {
    expect(formatCurrency(50)).toBe('$50.00');
  });

  it('should handle zero amount', () => {
    expect(formatCurrency(0, 'USD')).toBe('$0.00');
  });

  it('should handle negative amounts', () => {
    expect(formatCurrency(-100, 'USD')).toBe('-$100.00');
  });
});

describe('formatCurrencyForApi', () => {
  it('should format to 2 decimal places', () => {
    expect(formatCurrencyForApi(100)).toBe('100.00');
    expect(formatCurrencyForApi(99.9)).toBe('99.90');
    expect(formatCurrencyForApi(50.555)).toBe('50.56');
  });

  it('should round correctly', () => {
    expect(formatCurrencyForApi(10.004)).toBe('10.00');
    expect(formatCurrencyForApi(10.005)).toBe('10.01');
    expect(formatCurrencyForApi(10.995)).toBe('11.00');
  });

  it('should handle integers', () => {
    expect(formatCurrencyForApi(42)).toBe('42.00');
  });
});

describe('formatPhoneNumberDisplay', () => {
  it('should format 254 prefixed numbers', () => {
    expect(formatPhoneNumberDisplay('254712345678')).toBe('+254 712 345 678');
  });

  it('should format 0 prefixed numbers', () => {
    expect(formatPhoneNumberDisplay('0712345678')).toBe('0712 345 678');
  });

  it('should handle numbers with non-digit characters', () => {
    expect(formatPhoneNumberDisplay('+254-712-345-678')).toBe('+254 712 345 678');
    expect(formatPhoneNumberDisplay('254 712 345 678')).toBe('+254 712 345 678');
  });

  it('should return original if format not recognized', () => {
    expect(formatPhoneNumberDisplay('12345')).toBe('12345');
  });
});

describe('isValidEmail', () => {
  it('should validate correct emails', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name@domain.co.ke')).toBe(true);
    expect(isValidEmail('user+tag@gmail.com')).toBe(true);
  });

  it('should reject invalid emails', () => {
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('invalid@')).toBe(false);
    expect(isValidEmail('@domain.com')).toBe(false);
    expect(isValidEmail('test@.com')).toBe(false);
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('test @example.com')).toBe(false);
  });
});

describe('isValidKenyanPhone', () => {
  it('should validate correct 0-prefixed numbers', () => {
    expect(isValidKenyanPhone('0712345678')).toBe(true);
    expect(isValidKenyanPhone('0798765432')).toBe(true);
  });

  it('should validate correct 254-prefixed numbers', () => {
    expect(isValidKenyanPhone('254712345678')).toBe(true);
    expect(isValidKenyanPhone('254798765432')).toBe(true);
  });

  it('should reject invalid numbers', () => {
    expect(isValidKenyanPhone('1234567890')).toBe(false);
    expect(isValidKenyanPhone('07123')).toBe(false);
    expect(isValidKenyanPhone('')).toBe(false);
  });
});

describe('generateReferenceId', () => {
  it('should generate a reference with default prefix', () => {
    const ref = generateReferenceId();
    expect(ref).toMatch(/^REF-[A-Z0-9]+-[A-Z0-9]+$/);
  });

  it('should generate a reference with custom prefix', () => {
    const ref = generateReferenceId('SAFARI');
    expect(ref).toMatch(/^SAFARI-[A-Z0-9]+-[A-Z0-9]+$/);
  });

  it('should generate unique references', () => {
    const refs = new Set<string>();
    for (let i = 0; i < 100; i++) {
      refs.add(generateReferenceId());
    }
    expect(refs.size).toBe(100);
  });
});

describe('generateIdempotencyKey', () => {
  it('should include order ID', () => {
    const key = generateIdempotencyKey('order-123');
    expect(key).toContain('order-123');
  });

  it('should generate unique keys for same order', () => {
    const key1 = generateIdempotencyKey('order-123');
    const key2 = generateIdempotencyKey('order-123');
    expect(key1).not.toBe(key2);
  });
});

describe('retryWithBackoff', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return result on first success', async () => {
    const fn = vi.fn().mockResolvedValue('success');

    const promise = retryWithBackoff(fn, 3, 1000);
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should retry on failure and succeed', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValueOnce('success');

    const promise = retryWithBackoff(fn, 3, 100);
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should throw after max retries', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('persistent failure'));

    const promise = retryWithBackoff(fn, 3, 100);
    const rejection = expect(promise).rejects.toThrow('persistent failure');

    await vi.runAllTimersAsync();
    await rejection;

    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('should handle non-Error throws', async () => {
    const fn = vi.fn().mockRejectedValue('string error');

    const promise = retryWithBackoff(fn, 2, 100);
    const rejection = expect(promise).rejects.toThrow('string error');

    await vi.runAllTimersAsync();
    await rejection;
  });
});

describe('parseApiError', () => {
  it('should parse error with error field', () => {
    const result = parseApiError({ error: 'Something went wrong', code: 'ERR_001' });
    expect(result).toEqual({
      message: 'Something went wrong',
      code: 'ERR_001',
      details: undefined,
    });
  });

  it('should parse error with message field', () => {
    const result = parseApiError({ message: 'Not found' });
    expect(result).toEqual({
      message: 'Not found',
      code: 'UNKNOWN_ERROR',
      details: undefined,
    });
  });

  it('should include details when present', () => {
    const result = parseApiError({ error: 'Validation failed', details: { field: 'amount' } });
    expect(result.details).toEqual({ field: 'amount' });
  });

  it('should handle empty response', () => {
    const result = parseApiError({});
    expect(result).toEqual({
      message: 'Unknown error',
      code: 'UNKNOWN_ERROR',
      details: undefined,
    });
  });
});

describe('maskSensitiveData', () => {
  it('should mask phone numbers keeping last 4 digits', () => {
    expect(maskSensitiveData('254712345678')).toBe('********5678');
    expect(maskSensitiveData('0712345678')).toBe('******5678');
  });

  it('should handle short strings', () => {
    expect(maskSensitiveData('123')).toBe('123');
  });

  it('should handle strings with special characters', () => {
    expect(maskSensitiveData('+254-712-345-678')).toBe('********5678');
  });
});

describe('getPaymentMethodName', () => {
  it('should return formatted names', () => {
    expect(getPaymentMethodName('paypal')).toBe('PayPal');
    expect(getPaymentMethodName('mpesa')).toBe('M-Pesa');
  });
});

describe('calculateServiceFee', () => {
  it('should calculate PayPal fee (2.9% + $0.30)', () => {
    const fee = calculateServiceFee(100, 'paypal');
    expect(fee).toBeCloseTo(3.2, 2); // 100 * 0.029 + 0.30
  });

  it('should calculate M-Pesa fee (0.99 + 0.08%)', () => {
    const fee = calculateServiceFee(1000, 'mpesa');
    expect(fee).toBeCloseTo(1.79, 2); // 0.99 + 1000 * 0.0008
  });

  it('should handle zero amount', () => {
    expect(calculateServiceFee(0, 'paypal')).toBeCloseTo(0.3, 2);
    expect(calculateServiceFee(0, 'mpesa')).toBeCloseTo(0.99, 2);
  });
});

describe('formatTransactionDate', () => {
  it('should format Date object', () => {
    const date = new Date('2024-06-15T14:30:00Z');
    const formatted = formatTransactionDate(date);
    expect(formatted).toContain('2024');
    expect(formatted).toContain('June');
    expect(formatted).toContain('15');
  });

  it('should format date string', () => {
    const formatted = formatTransactionDate('2024-06-15T14:30:00Z');
    expect(formatted).toContain('2024');
    expect(formatted).toContain('June');
    expect(formatted).toContain('15');
  });
});

describe('getPaymentStatusColor', () => {
  it('should return correct colors for statuses', () => {
    expect(getPaymentStatusColor('completed')).toBe('green');
    expect(getPaymentStatusColor('pending')).toBe('yellow');
    expect(getPaymentStatusColor('failed')).toBe('red');
    expect(getPaymentStatusColor('cancelled')).toBe('red');
    expect(getPaymentStatusColor('processing')).toBe('blue');
    expect(getPaymentStatusColor('unknown')).toBe('gray');
  });

  it('should return gray for unrecognized status', () => {
    expect(getPaymentStatusColor('something')).toBe('gray');
  });
});

describe('convertCurrency', () => {
  it('should convert USD to KES', () => {
    expect(convertCurrency(100, 'USD', 'KES', 130)).toBe(13000);
  });

  it('should convert KES to USD', () => {
    expect(convertCurrency(13000, 'KES', 'USD', 130)).toBe(100);
  });

  it('should return same amount for same currency', () => {
    expect(convertCurrency(100, 'USD', 'USD')).toBe(100);
    expect(convertCurrency(1000, 'KES', 'KES')).toBe(1000);
  });

  it('should use default exchange rate', () => {
    expect(convertCurrency(100, 'USD', 'KES')).toBe(13000);
  });
});

describe('isValidPaymentAmount', () => {
  it('should accept valid amounts', () => {
    expect(isValidPaymentAmount(100)).toBe(true);
    expect(isValidPaymentAmount(1)).toBe(true);
    expect(isValidPaymentAmount(999999)).toBe(true);
    expect(isValidPaymentAmount(50.5)).toBe(true);
  });

  it('should reject amounts below minimum', () => {
    expect(isValidPaymentAmount(0)).toBe(false);
    expect(isValidPaymentAmount(0.5, 1)).toBe(false);
  });

  it('should reject amounts above maximum', () => {
    expect(isValidPaymentAmount(1000001)).toBe(false);
    expect(isValidPaymentAmount(200, 1, 100)).toBe(false);
  });

  it('should reject NaN', () => {
    expect(isValidPaymentAmount(NaN)).toBe(false);
  });

  it('should reject Infinity', () => {
    expect(isValidPaymentAmount(Infinity)).toBe(false);
    expect(isValidPaymentAmount(-Infinity)).toBe(false);
  });

  it('should accept custom min/max', () => {
    expect(isValidPaymentAmount(50, 10, 100)).toBe(true);
    expect(isValidPaymentAmount(10, 10, 100)).toBe(true);
    expect(isValidPaymentAmount(100, 10, 100)).toBe(true);
  });
});
