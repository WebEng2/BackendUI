import React, { useState, useEffect, useRef } from 'react';

import {
  f7,
  f7ready,
  App,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Link,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  ListInput,
  ListButton,
  BlockFooter,
  BlockHeader
} from 'framework7-react';
import BookViewContent from '../js/bookViewContent';
import { apiGet_searchBookList } from '../js/apiCalls.js';


import routes from '../js/routes';
import store from '../js/store';

const MyApp = () => {
  // book search popup
  const [searchValue, setSearchValue] = useState('');
  const [foundBooks, setFoundBooks] = useState([]);

  const searchBookList = (search) => {
    apiGet_searchBookList(search, (data) => {
        if (data && data.content) {
            setFoundBooks(data.content);
        } else {
            setFoundBooks([]); // Leeres Array wenn keine Daten
        }
    });
};
  
  // Framework7 Parameters
  const f7params = {
    name: 'OpenReadMap', // App name
      theme: 'auto', // Automatic theme detection
      colors: {
        primary: '#00eadf',
      },
      darkMode: true,


      // App store
      store: store,
      // App routes
      routes: routes,
  };
  const alertLoginData = () => {
    f7.dialog.alert('Username: ' + username + '<br>Password: ' + password, () => {
      f7.loginScreen.close();
    });
  }
  f7ready(() => {


    // Call F7 APIs here
  });

  return (
    <App { ...f7params }>

        {/* Left panel with cover effect*/}
        <Panel left cover dark>
          <View>
            <Page>
              <Navbar title="Left Panel"/>
              <Block>Left panel content goes here</Block>
            </Page>
          </View>
        </Panel>


        {/* Right panel with reveal effect*/}
        <Panel right reveal dark>
          <View>
            <Page>
              <Navbar title="Right Panel"/>
              <Block>Right panel content goes here</Block>
            </Page>
          </View>
        </Panel>


        {/* Your main view, should have "view-main" class */}
        <View main className="safe-areas" url="/" />

      {/* Popup */}
      <Popup id="book-search">
      <View>
        <Page>
          <Navbar title="Popup">
            <NavRight>
              <Link popupClose>Close</Link>
            </NavRight>
          </Navbar>
          <Block>
            <p>Search a book via name or ISBN here.</p>
            <List noHairlinesMd>
              <ListInput
                label="Name or ISBN"
                type="text"
                placeholder="Book name or ISBN"
                value={searchValue}
                onInput={(e) => {
                  setSearchValue(e.target.value);
                  const lastInput = e.target.value;
                  searchBookList(lastInput);
                }}
              />
              <ListButton onClick={() => searchBookList(searchValue)}>Search</ListButton>
            </List>
          </Block>
          <BlockHeader>Search Results</BlockHeader>
          <Block className="search-results-block">
            <List>
              {foundBooks.map((book, index) => (
                // Display Title and ISBN on a clickable list element and set the isbn as Variable if clicked
                <ListItem key={index} title={book.title} subtitle={"ISBN: " + book.isbn} onClick={() => {
                  console.log('clicked on:', book.isbn);
                  BookViewContent.setSearchedISBNBookContent(book.isbn);
                  // close popup
                  f7.popup.close();
                  // open book view page
                  f7.views.main.router.navigate('/book-view/');
                }} />
              ))}
            </List>
          </Block>
        </Page>
      </View>
    </Popup>
    </App>
  )
}
export default MyApp;