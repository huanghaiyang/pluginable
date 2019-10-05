import { IPluginable, IPlugin, PluginType, IError, IStacktrace, IPluginFactory } from './interface';
import { isUndefined, isNull, isNullOrUndefined } from 'util';

export default class Pluginable implements IPluginable<IPlugin, IPluginFactory<IPlugin>> {

  asyncPlugins: Array<IPlugin> = [];

  addPlugin(plugin?: IPlugin, pluginFactory?: IPluginFactory<IPlugin>): IPlugin | null {
    if (isNullOrUndefined(plugin)) {
      console.warn('WARNING: The parameter named "plugin" of function [addPlugin] is null or undefined.')
      if (!isNullOrUndefined(pluginFactory)) {
        plugin = pluginFactory.product();
      }
    }
    if (!isNullOrUndefined(plugin)) {
      this._tap(PluginType.ASYNC, plugin);
      return plugin;
    } else {
      console.warn('WARNING: The returned value of function [addPlugin] is null.')
    }
    return null;
  }

  _tap(type: PluginType, plugin: IPlugin): IPlugin {
    switch (type) {
      case PluginType.ASYNC:
        if (this.asyncPlugins.some(item => item.id === plugin.id)) {
          console.warn(`WARNING: duplicate plugin named '${plugin.name} with id '${plugin.id}' was not added.`)
        } else {
          this.asyncPlugins.push(plugin);
        }
        break;
    }
    return plugin;
  }

  async publish(payload: any) {
    try {
      this.asyncPlugins.forEach(async plugin => {
        const loaded = await plugin.onLoaded() as Boolean;
        if (loaded) {
          plugin.onPayload(payload);
        }
      });
    } catch (error) {

    }
  }

  onError(callback?: (error: IError<String>, stacktrace?: IStacktrace<String>) => void): void {

  }

  onComplete(callback?: (result: any) => void): void {

  }
}