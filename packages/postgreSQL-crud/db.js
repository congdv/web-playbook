const { Client } = require('pg');

class Database {
  constructor(config) {
    this._client = new Client(config);
  }

  start() {
    this._client.connect();
    console.log('Connected Successfully');
  }

  stop() {
    this._client.end();
    console.log('Close the connection')
  }

  async execute(query, queryValues) {
    try {
      const result = await this._client.query(query, queryValues);
      return result;
      
    } catch (error) {
      console.log(error);
      return null;
    }

  }

  async transaction(query, queryValues) {
    try {
      await this._client.query('BEGIN')
      const result = await this._client.query(query, queryValues);
      await this._client.query('COMMIT')
      return result;
    } catch (error) {
      console.log(error);
      await this._client.query('ROLLBACK')
      return null;
    }
  }
}

module.exports = Database;