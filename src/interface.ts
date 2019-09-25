export interface IPluginable<T> {
  asyncPlugins: Array<T>;
  plugin(t: T): T;
  publish(payload: any): void;
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
  onPayload: (cusumer?: (payload: any) => void) => void;
}

export enum PluginType {
  ASYNC,
}