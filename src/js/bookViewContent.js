
import { apiGet_randomBook, apiGet_searchBookISBN } from './apiCalls.js';

class BookViewContent {
    constructor() {
      if (!BookViewContent.instance) {
        this.state = {};
        this.currentBookContent = {};
        this.contentChangeListeners = [];
        BookViewContent.instance = this;
      }
  
      return BookViewContent.instance;
    }

    addContentChangeListener(listener) {
        this.contentChangeListeners.push(listener);
    }

    notifyContentChangeListeners() {
        this.contentChangeListeners.forEach(listener => {
            listener();
        });
    }

    /**
     * get the current book content
     * @returns {Object} the current book content
     */
    getCurrentBookContent() {
        return this.currentBookContent;
    }

    /**
     * set the current book content
     * @param {Object} bookContent the book content to set
     */
    setCurrentBookContent(bookContent) {
        this.currentBookContent = bookContent;
    }

    /**
     * Try to get a random book content from the API
     */
    async setRandomBookContent() {
        return new Promise((resolve, reject) => {
            apiGet_randomBook((data) => {
                this.setCurrentBookContent(data);
                this.notifyContentChangeListeners();
                resolve(true);
            });
        });
    }

    /**
     * Try to get a book content from the API with the given search
     * @param {string} search The search to use
     */
    async setSearchedISBNBookContent(searchISBN) {
        return new Promise((resolve, reject) => {
            apiGet_searchBookISBN(searchISBN, (data) => {
                this.setCurrentBookContent(data);
                this.notifyContentChangeListeners();
                resolve(true);
            });
        });
    }


    getState(key) {
      return this.state[key];
    }
  
    setState(key, value) {
      this.state[key] = value;
    }
  }
  
  const instance = new BookViewContent();
  Object.freeze(instance);
  
  export default instance;