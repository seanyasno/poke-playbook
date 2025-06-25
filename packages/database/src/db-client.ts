import { PrismaClient } from "@prisma/client";

class DbClient {
  private static _instance: PrismaClient;

  static get instance(): PrismaClient {
    return this._instance ?? (this._instance = this.createInstance());
  }

  public static initialize() {
    return DbClient.instance.$connect();
  }

  private static createInstance() {
    return new PrismaClient();
  }
}

const { instance, initialize } = DbClient;

export { instance as db, initialize as dbInitialize };
