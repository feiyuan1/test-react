import module from "./module";
import { unTypeModule } from "./unTypeModule";

module.prototype.get = function () {
  return Object.getPrototypeOf(this).constructor.name;
};

unTypeModule({});

export default module;
