import { IPluginable, IPlugin, PluginType, IError, IStacktrace } from './interface';

export default class Pluginable implements IPluginable<IPlugin> {

  asyncPlugins: Array<IPlugin> = [];

  plugin(plugin: IPlugin): IPlugin {
    this._tap(PluginType.ASYNC, plugin);
    return plugin;
  }

  _tap(type: PluginType, plugin: IPlugin): IPlugin {
    switch (type) {
      case PluginType.ASYNC:
        this.asyncPlugins.push(plugin);
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