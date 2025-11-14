/**
 * Metrics collection service
 * Stub implementation for tracking performance and usage metrics
 */

export interface Metric {
  name: string;
  value: number;
  timestamp: Date;
  tags?: Record<string, string>;
}

export class Metrics {
  private metrics: Metric[] = [];

  /**
   * Record a counter metric
   * Stub: Stores in array
   */
  increment(name: string, value: number = 1, tags?: Record<string, string>): void {
    this.metrics.push({
      name,
      value,
      timestamp: new Date(),
      tags
    });
  }

  /**
   * Record a gauge metric
   * Stub: Stores in array
   */
  gauge(name: string, value: number, tags?: Record<string, string>): void {
    this.metrics.push({
      name,
      value,
      timestamp: new Date(),
      tags
    });
  }

  /**
   * Record a timing metric
   * Stub: Stores in array
   */
  timing(name: string, durationMs: number, tags?: Record<string, string>): void {
    this.metrics.push({
      name: `${name}.duration`,
      value: durationMs,
      timestamp: new Date(),
      tags
    });
  }

  /**
   * Start a timer and return function to end it
   * Stub: Returns function that records timing
   */
  startTimer(name: string, tags?: Record<string, string>): () => void {
    const startTime = Date.now();
    return () => {
      const duration = Date.now() - startTime;
      this.timing(name, duration, tags);
    };
  }

  /**
   * Get all recorded metrics
   * Stub: Returns array copy
   */
  getMetrics(): Metric[] {
    return [...this.metrics];
  }

  /**
   * Clear all metrics
   * Stub: Clears array
   */
  clear(): void {
    this.metrics = [];
  }

  /**
   * Get metrics summary
   * Stub: Returns basic stats
   */
  getSummary(): Record<string, any> {
    const summary: Record<string, any> = {};

    for (const metric of this.metrics) {
      if (!summary[metric.name]) {
        summary[metric.name] = {
          count: 0,
          total: 0,
          min: Infinity,
          max: -Infinity
        };
      }

      const stat = summary[metric.name];
      stat.count++;
      stat.total += metric.value;
      stat.min = Math.min(stat.min, metric.value);
      stat.max = Math.max(stat.max, metric.value);
      stat.avg = stat.total / stat.count;
    }

    return summary;
  }
}

/**
 * Create a metrics instance
 */
export function createMetrics(): Metrics {
  return new Metrics();
}
