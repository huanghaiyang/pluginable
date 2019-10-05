import { IPluginable, IPlugin, PluginType, IError, IStacktrace, IPluginFactory, IEvent, ISubscribe, SubscribePredicate } from './interface';
import { isUndefined, isNull, isNullOrUndefined } from 'util';

class Subscribe implements ISubscribe {

  predicate(func: SubscribePredicate): ISubscribe {
    return new InternalSubscribe();
  }
}

class InternalSubscribe extends Subscribe {
  constructor() {
    super();
    this.predicateFunc = (event: IEvent) => true
  }

  predicateFunc: SubscribePredicate;
}

export default class Pluginable implements IPluginable<IPlugin, IPluginFactory<IPlugin>, IEvent, ISubscribe> {

  _subscribes: Map<String, ISubscribe> = new Map();

  events: Array<IEvent> = [];

  asyncPlugins: Array<IPlugin> = [];

  addPlugin(plugin?: IPlugin, pluginFactory?: IPluginFactory<IPlugin>): ISubscribe | null {
    if (isNullOrUndefined(plugin)) {
      console.warn('WARNING: The parameter named "plugin" of function [addPlugin] is null or undefined.')
      if (!isNullOrUndefined(pluginFactory)) {
        plugin = pluginFactory.product();
      }
    }
    if (!isNullOrUndefined(plugin)) {
      this._tap(PluginType.ASYNC, plugin);
      const sub = new Subscribe();
      this._subscribes.set(plugin.id, sub);
      return sub;
    } else {
      console.warn('WARNING: The returned value of function [addPlugin] is null.')
      return null;
    }
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

  async publish(event: IEvent, payload?: any) {
    try {
      this.asyncPlugins.forEach(async plugin => {
        if (this._subscribes.has(plugin.id)) {
          const subscribe = this._subscribes.get(plugin.id) as InternalSubscribe;
          if (subscribe.predicateFunc(event)) {
            const loaded = await plugin.onLoaded() as Boolean;
            if (loaded) {
              plugin.onPayload(payload);
            }
          }
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