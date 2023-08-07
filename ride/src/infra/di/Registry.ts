// Registry - Um objeto muito conhecido, que outros objetos podem utilizar para localizar objetos e serviços.
export default class Registry {
  private dependencies: { [name: string]: any };
  static instance: Registry

  private constructor () {
    this.dependencies = {};
  }

  static getInstance() {
    if (!Registry.instance)
      Registry.instance = new Registry();
    
    return Registry.instance;
  }
  provide (name: string, dependency: any) {
    this.dependencies[name] = dependency;
  }

  inject (name: string) {
    return this.dependencies[name];
  }
}