import { RemediationService } from '../../domain/services/RemediationService.js';
import { Logger } from '@c3/shared';

export class ApplyFixesUseCase {
  constructor(
    private remediationService: RemediationService,
    private logger: Logger
  ) {}

  async execute(violationId: string): Promise<void> {
    this.logger.info('Applying fixes', { violationId });
  }
}
