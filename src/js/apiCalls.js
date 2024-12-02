const apiGet_randomBook = async (callbackFunction) => {
    try {
        const response = await fetch('/api-settings.json');
        const settings = await response.json();
        const apiSettings = settings["openReadMapAPI"];
        const callURL = `http://${apiSettings["host"]}:${apiSettings["port"]}/api/books/randominfo`;
        
        const result = await fetch(callURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }
        
        const data = await result.json();
        if (data) {
            callbackFunction(data);
        } else {
            throw new Error('No data received');
        }
    } catch (error) {
        console.error('Error fetching random book:', error);
        callbackFunction(null);
    }
}

const apiGet_searchBookList = async (search, callbackFunction, page = 0, pageSize = 20) => {
    try {
        const response = await fetch('/api-settings.json');
        const settings = await response.json();
        const apiSettings = settings["openReadMapAPI"];
        const callURL = `http://${apiSettings["host"]}:${apiSettings["port"]}/api/books/search?text=${encodeURIComponent(search)}&page=${page}&size=${pageSize}`;
        
        const result = await fetch(callURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors' // Explizit CORS-Modus aktivieren
        });
        
        if (!result.ok) {
            callbackFunction([]);
            return;
        }
        
        const data = await result.json();
        callbackFunction(data);
    } catch (error) {
        console.error('Error searching books:', error);
        callbackFunction([]); // Leeres Array zurückgeben statt null
    }
}

const apiGet_searchBookISBN = async (isbn, callbackFunction, results=10) => {
    try {
        //get api settings from api-settings.json
        const response = await fetch('/api-settings.json');
        const settings = await response.json();
        const apiSettings = settings["openReadMapAPI"];
        const callURL = `http://${apiSettings["host"]}:${apiSettings["port"]}/api/books/searchIsbn?isbn=${isbn}&size=${results}`;
        console.log('Calling API:', callURL);
        
        //fetch data from API
        const result = await fetch(callURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }
        
        const data = await result.json();
        callbackFunction(data);
    } catch (error) {
        console.error('Error searching books:', error);
        callbackFunction(null);
    }
}

const apiGet_searchBookID = async (id, callbackFunction) => {
    try {
        //get api settings from api-settings.json
        const response = await fetch('/api-settings.json');
        const settings = await response.json();
        const apiSettings = settings["openReadMapAPI"];
        const callURL = `http://${apiSettings["host"]}:${apiSettings["port"]}/api/books/${id}/info`;
        console.log('Calling API:', callURL);
        
        //fetch data from API
        const result = await fetch(callURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }
        
        const data = await result.json();
        callbackFunction(data);
    } catch (error) {
        console.error('Error searching books:', error);
        callbackFunction(null);
    }
}

const apiGet_searchLibrariesForISBN = async (isbn, callbackFunction) => {
    try {
        //get api settings from api-settings.json
        const response = await fetch('/api-settings.json');
        const settings = await response.json();
        const apiSettings = settings["openReadMapAPI"];
        const callURL = `http://${apiSettings["host"]}:${apiSettings["port"]}/api/libraries/searchHasISBN?isbn=${isbn}`;
        console.log('Calling API:', callURL);
        
        //fetch data from API
        const result = await fetch(callURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        if (!result.ok) {
            throw new Error(`HTTP error! status: ${result.status}`);
        }
        
        const data = await result.json();
        callbackFunction(data);
    } catch (error) {
        console.error('Error searching libraries:', error);
        callbackFunction(null);
    }
}


export { apiGet_randomBook, apiGet_searchBookList, apiGet_searchBookISBN, apiGet_searchBookID, apiGet_searchLibrariesForISBN };