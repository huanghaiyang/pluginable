export interface IPluginable<T> {
  syncPlugins: Array<T>;
  asyncPlugins: Array<T>;
  promisePlugins: Array<T>;

  pluginSync(t: T): T;
  pluginAsync(t: T): T;
  pluginPromise(t: T): T;
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
  onData: (cusumer: (data: any) => void) => void;
  onError: (callback: (error: IError<String>, stacktrace?: IStacktrace<String>) => void) => void;
  onDone: (callback: (result: any) => any) => void;
  onComplete: (callback: (result: any) => void) => void;
}

export enum PluginType {
  SYNC,
  ASYNC,
  PROMISE
}