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
  BlockHeader,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
  Button,
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
    <App {...f7params}>

      {/* Left panel with cover effect*/}
      <Panel left cover dark>
        <View>
          <Page>
            <Navbar title="Left Panel" />
            <Block>Left panel content goes here</Block>
          </Page>
        </View>
      </Panel>


      {/* Right panel with reveal effect*/}
      <Panel right reveal dark>
        <View>
          <Page>
            <Navbar title="Right Panel" />
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
            <Card >
              <CardContent>Search a book via name or ISBN here.</CardContent>
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
            </Card>
            <BlockHeader>Search Results</BlockHeader>
            <Block style={{ overflowY: 'auto', maxHeight: '260px' }}>

              {foundBooks.map((book, index) => (

                <Button tonal fill key={index} style={{ marginBottom: "10px", height: "80px", display: "block" }} onClick={() => {
                  console.log('clicked on:', book.id);
                  BookViewContent.setSearchedIdBookContent(book.id);
                  // close popup
                  f7.popup.close();
                  // open book view page
                  f7.views.main.router.navigate('/book-view/');
                }}>
                  <div style={{ display: "flex", paddingBottom: 0 }} >
                    {book.title.length > 50 ? book.title.substring(0, 50) + '...' : book.title}
                  </div>
                  <div style={{ fontSize: '0.7em', color: 'gray', display: "flex" }}>
                    ISBN: {book.isbn}
                  </div>
                </Button>
              ))}
            </Block>
          </Page>
        </View>
      </Popup>
    </App>
  )
}
// Add this CSS to make the block scrollable
const styles = {
  '.scrollable-block': {
    maxHeight: '400px',
    overflowY: 'auto',
  },
};

export default MyApp;