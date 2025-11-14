/**
 * Test data builder for Rules
 */

import { Rule } from '../../../contexts/compliance/domain/aggregates/RuleSet/Rule.js';
import { Condition } from '../../../contexts/compliance/domain/aggregates/RuleSet/Condition.js';
import { RuleType } from '../../../contexts/compliance/domain/value-objects/RuleType.js';
import { Severity } from '../../../contexts/compliance/domain/value-objects/Severity.js';

export class RuleBuilder {
  private id = 'test-rule';
  private name = 'Test Rule';
  private description = 'Test Description';
  private type = RuleType.DEPENDENCY;
  private severity = Severity.ERROR;
  private condition = Condition.create('test', {});

  withId(id: string): RuleBuilder {
    this.id = id;
    return this;
  }

  withName(name: string): RuleBuilder {
    this.name = name;
    return this;
  }

  withType(type: RuleType): RuleBuilder {
    this.type = type;
    return this;
  }

  withSeverity(severity: Severity): RuleBuilder {
    this.severity = severity;
    return this;
  }

  build(): Rule {
    return new Rule(
      this.id,
      this.name,
      this.description,
      this.type,
      this.severity,
      this.condition
    );
  }
}
