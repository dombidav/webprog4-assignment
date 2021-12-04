import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage-angular'

/** Handles local storage operations */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  /** Storage strategy */
  #storage: Storage | null = null
  /** Indicates if the storage is initialized or not */
  #ready: boolean = false

  /**
   * @param storage Storage strategy as defined in {@link AppModule}
   */
  constructor(
    private storage: Storage
  ) {
    this.storage.create().then(createdStorage => {
      this.#storage = createdStorage
      this.#ready = true
    })
  }

  /** Get if the storage is initialized or not */
  get isReady(): boolean {
    return this.#ready
  }

  /**
   * Set a key to a value
   *
   * @param key
   * @param value
   */
  public async set(key: string, value: any) {
    await this.waitForStorage()
    await this.#storage?.set(key, value)
  }

  /**
   * Query a value identified by the key from the database
   *
   * @param key
   */
  public async get<T = any>(key: string): Promise<T | null> {
    await this.waitForStorage()
    return this.#storage?.get(key) ?? null
  }

  /**
   * Purge a record from the database
   *
   * @param key
   */
  public async remove<T = any>(key: string): Promise<T | null> {
    await this.waitForStorage()
    return this.#storage?.remove(key)
  }

  /**
   * Wait until the storage was created
   *
   * @example
   * async test() {
   *             await storage.waitForStorage()
   *             console.log('done')
   * }
   */
  public async waitForStorage() {
    while (!this.isReady) // define the condition as you like
      // eslint-disable-next-line no-await-in-loop
      await new Promise(resolve => setTimeout(resolve, 250))
    return this.#storage
  }
}
