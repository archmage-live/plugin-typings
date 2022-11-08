// Archmage Plugin API version 1

declare module 'archmage' {
  /**
   * The version of Archmage.
   */
  export const version: string

  /**
   * The console.
   */
  export const console: Console

  /**
   * Represents the console.
   *
   * The plugin environment exposes the browser console API,
   * so expected calls like archmage.console.log() work.
   */
  export interface Console {
    log(message?: any, ...optionalParams: any[]): void

    info(message?: any, ...optionalParams: any[]): void

    warn(message?: any, ...optionalParams: any[]): void

    error(message?: any, ...optionalParams: any[]): void

    assert(value: any, message?: string, ...optionalParams: any[]): void

    clear(): void
  }

  /**
   * Represents a reference to a command. Provides a title which
   * will be used to represent a command in the UI and, optionally,
   * an array of arguments which will be passed to the command handler
   * function when invoked.
   */
  export interface Command {
    /**
     * Title of the command, like `save`.
     */
    title: string

    /**
     * The identifier of the actual command handler.
     * @see {@link commands.registerCommand}
     */
    command: string

    /**
     * A tooltip for the command, when represented in the UI.
     */
    tooltip?: string

    /**
     * Arguments that the command handler should be
     * invoked with.
     */
    arguments?: any[]
  }

  /**
   * Namespace for dealing with commands. In short, a command is a function with a
   * unique identifier. The function is sometimes also called _command handler_.
   *
   * Commands can be added to the editor using the {@link commands.registerCommand registerCommand}
   * and {@link commands.registerTextEditorCommand registerTextEditorCommand} functions. Commands
   * can be executed {@link commands.executeCommand manually} or from a UI gesture. Those are:
   *
   * * palette - Use the `commands`-section in `package.json` to make a command show in
   * the [command palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette).
   * * keybinding - Use the `keybindings`-section in `package.json` to enable
   * [keybindings](https://code.visualstudio.com/docs/getstarted/keybindings#_customizing-shortcuts)
   * for your extension.
   *
   * Commands from other extensions and from the editor itself are accessible to an extension. However,
   * when invoking an editor command not all argument types are supported.
   *
   * This is a sample that registers a command handler and adds an entry for that command to the palette. First
   * register a command handler with the identifier `extension.sayHello`.
   * ```javascript
   * commands.registerCommand('extension.sayHello', () => {
   *     window.showInformationMessage('Hello World!');
   * });
   * ```
   * Second, bind the command identifier to a title under which it will show in the palette (`package.json`).
   * ```json
   * {
   *     "contributes": {
   *         "commands": [{
   *             "command": "extension.sayHello",
   *             "title": "Hello World"
   *         }]
   *     }
   * }
   * ```
   */
  export namespace commands {
    /**
     * Registers a command that can be invoked via a keyboard shortcut,
     * a menu item, an action, or directly.
     *
     * Registering a command with an existing command identifier twice
     * will cause an error.
     *
     * @param command A unique identifier for the command.
     * @param callback A command handler function.
     * @param thisArg The `this` context used when invoking the handler function.
     * @return Disposable which unregisters this command on disposal.
     */
    export function registerCommand(
      command: string,
      callback: (...args: any[]) => any,
      thisArg?: any,
    ): Disposable

    /**
     * Executes the command denoted by the given command identifier.
     *
     * * *Note 1:* When executing an editor command not all types are allowed to
     * be passed as arguments. Allowed are the primitive types `string`, `boolean`,
     * `number`, `undefined`, and `null`.
     * * *Note 2:* There are no restrictions when executing commands that have been contributed
     * by extensions.
     *
     * @param command Identifier of the command to execute.
     * @param rest Parameters passed to the command function.
     * @return A promise that resolves to the returned value of the given command. Returns `undefined` when
     * the command handler function doesn't return anything.
     */
    export function executeCommand<T = unknown>(command: string, ...rest: any[]): Promise<T>

    /**
     * Retrieve the list of all available commands. Commands starting with an underscore are
     * treated as internal commands.
     *
     * @param filterInternal Set `true` to not see internal commands (starting with an underscore)
     * @return Promise that resolves to a list of command ids.
     */
    export function getCommands(filterInternal?: boolean): Promise<string[]>
  }

  /**
   * Represents a type which can release resources, such
   * as event listening or a timer.
   */
  export class Disposable {
    /**
     * Combine many disposable-likes into one. Use this method
     * when having objects with a dispose function which are not
     * instances of Disposable.
     *
     * @param disposableLikes Objects that have at least a `dispose`-function member.
     * @return Returns a new disposable which, upon dispose, will
     * dispose all provided disposables.
     */
    static from(...disposableLikes: { dispose: () => any }[]): Disposable

    /**
     * Creates a new Disposable calling the provided function
     * on dispose.
     * @param callOnDispose Function that disposes something.
     */
    constructor(callOnDispose: Function)

    /**
     * Dispose this object.
     */
    dispose(): any
  }

  /**
   * Represents a typed event.
   *
   * A function that represents an event to which you subscribe by calling it with
   * a listener function as argument.
   *
   * @example
   * item.onDidChange(function(event) { console.log("Event happened: " + event); });
   */
  export interface Event<T> {
    /**
     * A function that represents an event to which you subscribe by calling it with
     * a listener function as argument.
     *
     * @param listener The listener function will be called when the event happens.
     * @param thisArgs The `this`-argument which will be used when calling the event listener.
     * @param disposables An array to which a {@link Disposable} will be added.
     * @return A disposable which unsubscribes the event listener.
     */
    (listener: (e: T) => any, thisArgs?: any, disposables?: Disposable[]): Disposable
  }

  /**
   * An event emitter can be used to create and manage an {@link Event} for others
   * to subscribe to. One emitter always owns one event.
   *
   * Use this class if you want to provide event from within your extension.
   */
  export class EventEmitter<T> {
    /**
     * The event listeners can subscribe to.
     */
    event: Event<T>

    /**
     * Notify all subscribers of the {@link EventEmitter.event event}. Failure
     * of one or more listener will not fail this function call.
     *
     * @param data The event object.
     */
    fire(data: T): void

    /**
     * Dispose this object and free resources.
     */
    dispose(): void
  }

  export interface Wallet {
    id: number
    name: string
    subWallets: SubWallet[]
  }

  export interface SubWallet {
    id: number
    walletId: Wallet['id']
    index: Index
    name?: string // undefined if pseudo index
    chainAccounts: Map<Network['id'], ChainAccount>
  }

  export interface ChainAccount {
    id: number
    walletId: Wallet['id']
    index: Index
    networkKind: NetworkKind
    chainId: ChainId
    address?: string // undefined means no chain account on the specific chain
  }

  export const PSEUDO_INDEX = -1 // pseudo index for single-account wallet
  export type Index = number | typeof PSEUDO_INDEX

  export interface Network {
    id: number
    kind: NetworkKind
    chainId: ChainId
  }

  export enum NetworkKind {
    EVM = 'evm',
  }

  export type ChainId = number | string
}
