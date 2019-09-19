import { IPluginable, IPlugin, PluginType } from './interface';

export default class Pluginable implements IPluginable<IPlugin> {

  syncPlugins: Array<IPlugin> = [];

  asyncPlugins: Array<IPlugin> = [];

  promisePlugins: Array<IPlugin> = [];

  pluginSync(plugin: IPlugin): IPlugin {
    this._tap(PluginType.SYNC, plugin);
    return plugin;
  }

  pluginAsync(plugin: IPlugin): IPlugin {
    this._tap(PluginType.ASYNC, plugin);
    return plugin;
  }

  pluginPromise(plugin: IPlugin): IPlugin {
    this._tap(PluginType.PROMISE, plugin);
    return plugin;
  }

  _tap(type: PluginType, plugin: IPlugin): IPlugin {
    switch (type) {
      case PluginType.ASYNC:
        this.asyncPlugins.push(plugin);
        break;
      case PluginType.SYNC:
        this.asyncPlugins.push(plugin);
        break;
      case PluginType.PROMISE:
        this.promisePlugins.push(plugin);
        break;
    }
    return plugin;
  }

}