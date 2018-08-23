var CryptoJS = require("crypto-js");

class RainhutAPI {

    constructor(privateKey, publicKey) {
      this.privateKey = privateKey;
      this.publicKey = publicKey;
    }

    getTimestamp = () => {
        return Math.floor(new Date() / 1000);
    }
    
    getAuthenticationString = (ts, bookId ) => {
        var strToHash = "ts" + ts + this.publicKey + bookId;
        var authString = CryptoJS.HmacSHA256(
          strToHash,
          this.privateKey
        ).toString();
        return authString;
    }

    createBook = (entries, setup) => {
        var ts = this.getTimestamp()
        var authString = getAuthenticationString(ts, "")
        var body = {entries: entries, setup: setup, auth: authString, pk: this.publicKey, ts: ts}

        try {
            let res = await fetch("https://artapi2.rainhut.com/books/create2", {
                 method: "POST",
                 headers: {
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify(body)
            })
            return res.json()
        }
        catch(e) {
            return {"status": "error", "message": e.message}
        }
    }

    updateBook = (book) => {
        var ts = this.getTimestamp()
        var authString = getAuthenticationString(ts, book.bookId)
        var body = {entries: entries, setup: setup, auth: authString, pk: this.publicKey, ts: ts}

        try {
            let res = await fetch("https://artapi2.rainhut.com/books/update2", {
                 method: "POST",
                 headers: {
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify(body)
            })
            return res.json()
        }
        catch(e) {
            return {"status": "error", "message": e.message}
        }
    }

    uploadBook = (book) => {
        var ts = this.getTimestamp()
        var authString = getAuthenticationString(ts, book.bookId)
        var body = {entries: entries, setup: setup, auth: authString, pk: this.publicKey, ts: ts}

        try {
            let res = await fetch("https://artapi2.rainhut.com/books/upload2", {
                 method: "POST",
                 headers: {
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify(body)
            })
            return res.json()
        }
        catch(e) {
            return {"status": "error", "message": e.message}
        }
    }

}