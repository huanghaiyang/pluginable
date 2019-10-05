export interface IPluginable<T, F, D, H> {
  asyncPlugins: Array<T>;
  events: Array<D>,
  addPlugin(t?: T, f?: F): H | null;
  publish(event: IEvent, payload?: any): void;
  onError: (callback?: (error: IError<String>, stacktrace?: IStacktrace<String>) => void) => void;
  onComplete: (callback?: (result: any) => void) => void;
}

export interface IStacktrace<T> {
  value: T;
}

export interface IError<T> {
  value: T;
}

export interface IPlugin {
  id: String;
  name: String;
  isLoaded: Boolean;
  onLoaded: (cusumer?: () => void) => Boolean;
  onPayload: (payload?: any) => void;
}

export interface IPluginFactory<T> {
  product(): T
}

export enum PluginType {
  ASYNC,
}


export interface IEvent {
  name: String
}

export interface ISubscribe {
  predicate(func: SubscribePredicate): ISubscribe
}

export interface SubscribePredicate {
  (event: IEvent): Boolean;
}