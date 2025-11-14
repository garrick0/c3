import { Whitelist } from '../aggregates/Remediation/Whitelist.js';

export class WhitelistService {
  private whitelist = new Whitelist('default');

  isWhitelisted(pattern: string): boolean {
    return this.whitelist.isWhitelisted(pattern);
  }
}
