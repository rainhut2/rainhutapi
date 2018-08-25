var CryptoJS = require("crypto-js");
var fetch = require("node-fetch");

class rainhutapi {
  constructor(privateKey, publicKey) {
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  getTimestamp() {
    return Math.floor(new Date() / 1000);
  }

  getAuthenticationString(ts, bookId) {
    var strToHash = "ts" + ts + this.publicKey + bookId;
    var authString = CryptoJS.HmacSHA256(strToHash, this.privateKey).toString();
    return authString;
  }

  createBook(entries, setup, callback) {
    var ts = this.getTimestamp();
    var authString = this.getAuthenticationString(ts, "");
    var body = {
      entries: entries,
      setup: setup,
      auth: authString,
      pk: this.publicKey,
      ts: ts
    };
    fetch("https://artapi2.rainhut.com/books/create2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(callback)
      .catch(function(e) {
        callback({ status: "error", message: e.message });
      });
  }

  updateBook(book, callback) {
    var ts = this.getTimestamp();
    var authString = this.getAuthenticationString(ts, book.bookId);
    book.auth = authString
    book.pk = this.publicKey
    book.ts = ts

    let res = fetch("https://artapi2.rainhut.com/books/update2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(book)
    })
      .then(res => res.json())
      .then(callback)
      .catch(function(e) {
        callback({ status: "error", message: e.message });
      });
  }

  uploadBook(book, callback) {
    var ts = this.getTimestamp();
    var authString = this.getAuthenticationString(ts, book.bookId);
    book.auth = authString
    book.pk = this.publicKey
    book.ts = ts

    let res = fetch("https://artapi2.rainhut.com/books/upload2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(book)
    })
      .then(res => res.json())
      .then(callback)
      .catch(function(e) {
        callback({ status: "error", message: e.message });
      });
  }
}
module.exports = rainhutapi;
