import { apiGet_randomBook, apiGet_searchBookISBN } from './apiCalls.js';

class BookViewContent {
    constructor() {
        if (!BookViewContent.instance) {
            this._state = {};
            this._currentBookContent = {};
            this._contentChangeListeners = null;
            BookViewContent.instance = this;
        }
        return BookViewContent.instance;
    }

    addContentChangeListener(listener) {
        this._contentChangeListeners = listener;
    }

    notifyContentChangeListeners() {
        this._contentChangeListeners();
        console.log(this._currentBookContent);
    }

    /**
     * get the current book content
     * @returns {Object} the current book content
     */
    getCurrentBookContent() {
        return this._currentBookContent;
    }

    /**
     * set the current book content
     * @param {Object} bookContent the book content to set
     */
    setCurrentBookContent(bookContent) {
        this._currentBookContent = { ...bookContent };  // Kopie erstellen
        this.notifyContentChangeListeners();
    }

    /**
     * Setzt den Buchinhalt basierend auf einer ISBN
     * @param {string} isbn Die ISBN des Buchs
     * @returns {Promise} Promise, das resolved, wenn der Buchinhalt gesetzt wurde
     */
    async setSearchedISBNBookContent(isbn) {
        return new Promise((resolve, reject) => {
            apiGet_searchBookISBN(isbn, (data) => {
                if (data) {
                    this.setCurrentBookContent(data);
                    resolve(true);
                } else {
                    reject(new Error('Kein Buch mit dieser ISBN gefunden'));
                }
            });
        });
    }

    /**
     * Try to get a random book content from the API
     */
    async setRandomBookContent() {
        return new Promise((resolve, reject) => {
            apiGet_randomBook((data) => {
                if (data) {
                    this.setCurrentBookContent(data);
                    resolve(true);
                } else {
                    reject(new Error('No data received'));
                }
            });
        });
    }
}

// Singleton-Instanz erstellen
const instance = new BookViewContent();
export default instance;  // Kein Object.freeze() mehr