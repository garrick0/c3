import { Entity } from '@c3/shared';
export class Query extends Entity {
    question;
    context;
    createdAt;
    constructor(id, question, context, createdAt = new Date()) {
        super(id);
        this.question = question;
        this.context = context;
        this.createdAt = createdAt;
    }
}
//# sourceMappingURL=Query.js.map