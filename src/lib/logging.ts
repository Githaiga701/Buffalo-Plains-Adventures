export type LogLevel = "info" | "warn" | "error" | "debug";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  data?: Record<string, any>;
  error?: {
    message: string;
    code?: string;
    stack?: string;
  };
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";

  private formatTimestamp(): string {
    return new Date().toISOString();
  }

  private formatLog(level: LogLevel, message: string, context?: string, data?: Record<string, any>): LogEntry {
    return {
      timestamp: this.formatTimestamp(),
      level,
      message,
      context,
      data,
    };
  }

  info(message: string, context?: string, data?: Record<string, any>): void {
    const log = this.formatLog("info", message, context, data);
    console.log(JSON.stringify(log));
    if (this.isDevelopment) {
      console.log(`[${log.timestamp}] INFO [${context}]: ${message}`, data);
    }
  }

  warn(message: string, context?: string, data?: Record<string, any>): void {
    const log = this.formatLog("warn", message, context, data);
    console.warn(JSON.stringify(log));
    if (this.isDevelopment) {
      console.warn(`[${log.timestamp}] WARN [${context}]: ${message}`, data);
    }
  }

  error(message: string, error?: Error | string, context?: string, data?: Record<string, any>): void {
    const errorData = typeof error === "string" ? new Error(error) : error;
    const log: LogEntry = this.formatLog("error", message, context, data);
    log.error = {
      message: errorData?.message || "Unknown error",
      stack: errorData?.stack,
    };
    console.error(JSON.stringify(log));
    if (this.isDevelopment) {
      console.error(`[${log.timestamp}] ERROR [${context}]: ${message}`, errorData, data);
    }
  }

  debug(message: string, context?: string, data?: Record<string, any>): void {
    if (!this.isDevelopment) return;

    const log = this.formatLog("debug", message, context, data);
    console.debug(`[${log.timestamp}] DEBUG [${context}]: ${message}`, data);
  }

  logTransactionStart(context: string, orderId: string, amount: number, method: string): void {
    this.info(`Transaction initiated for ${method}`, context, {
      orderId,
      amount,
      method,
    });
  }

  logTransactionSuccess(context: string, orderId: string, transactionId: string, amount: number): void {
    this.info(`Transaction completed successfully`, context, {
      orderId,
      transactionId,
      amount,
    });
  }

  logTransactionFailure(context: string, orderId: string, error: Error | string, additionalData?: Record<string, any>): void {
    this.error(
      `Transaction failed for order`,
      error,
      context,
      {
        orderId,
        ...additionalData,
      }
    );
  }

  logWebhookReceived(context: string, webhookId: string, eventType: string): void {
    this.info(`Webhook received`, context, {
      webhookId,
      eventType,
    });
  }

  logWebhookProcessed(context: string, webhookId: string, success: boolean, details?: Record<string, any>): void {
    const level = success ? "info" : "warn";
    if (level === "info") {
      this.info(`Webhook processed successfully`, context, {
        webhookId,
        ...details,
      });
    } else {
      this.warn(`Webhook processing failed`, context, {
        webhookId,
        ...details,
      });
    }
  }
}

// Export singleton instance
export const logger = new Logger();

export default logger;
