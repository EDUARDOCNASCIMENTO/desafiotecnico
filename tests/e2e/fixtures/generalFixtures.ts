import { test as base } from "@playwright/test";
import SignUp from "../page-objects/registerNewUser.pom"; 

type MyFixtures = {
  signUp: SignUp; 
};

export const test = base.extend<MyFixtures>({
  signUp: async ({ page }, use) => {
    await use(new SignUp(page)); 
  },
});

export { expect } from "@playwright/test";
export function step(stepName?: string) {
  return function decorator(
    target: Function,
    context: ClassMethodDecoratorContext
  ) {
    return function replacementMethod(this: any, ...args: any) {
      const name = `${stepName || (context.name as string)} (${this.name})`;
      return test.step(name, async () => {
        return await target.call(this, ...args);
      });
    };
  };
}
