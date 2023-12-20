import "mocha";
import { use } from "chai";
import chaiAsPromised from "chai-as-promised";
import "express-async-errors";
import { createContainer } from "../container";
import "express-async-errors";

use(chaiAsPromised);

before(async () => {
  global.container = await createContainer();
});
