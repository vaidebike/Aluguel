export class DatabaseHandler{
  private static instance: DatabaseHandler;


  public static getInstance(): DatabaseHandler {
    if (!DatabaseHandler.instance) {
      DatabaseHandler.instance = new DatabaseHandler();
    }

    return DatabaseHandler.instance;
  }
}