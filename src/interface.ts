export interface IPluginable<T, F, D, H> extends IDispatcherable {
  asyncPlugins: Array<T>;
  events: Array<D>,
  addPlugin(t?: T, f?: F): H | null;
  publish(event: IEvent, payload?: any): void;
}

export interface IPlugin extends IDispatcherable {
  id: String;
  name: String;
  isLoaded: Boolean;
  onLoaded: (cusumer?: () => void) => Boolean;
}

export interface IDispatcherable {
  onPayload: IOnPayload;
  onError: IOnError;
  onComplete: IOnComplete;
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
  predicate(func: ISubscribePredicate): ISubscribe
}

export interface ISubscribePredicate {
  (event: IEvent): Boolean;
}

export interface IOnPayload {
  (event: IEvent, payload?: any): void
}

export interface IOnError {
  (event: IEvent, error?: Error): void
}

export interface IOnComplete {
  (event: IEvent, result?: any): void
}

export enum DispatcherType {
  ONPAYLOAD, ONERROR, ONCOMPLETE
}