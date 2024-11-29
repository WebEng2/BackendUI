import React from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Button,
  f7
} from 'framework7-react';
import BookViewContent from '../js/bookViewContent';

const HomePage = () => (
  <Page name="home">
    {/* Top Navbar */}
    <Navbar large sliding={false}>
      <NavTitle>OpenReadMap</NavTitle>
      <NavTitleLarge>OpenReadMap</NavTitleLarge>
    </Navbar>
    {/* Toolbar */}
    <Toolbar bottom>
      <Link onClick={() => f7.views.main.router.navigate('/about/')}>About</Link>
    </Toolbar>
    {/* Page content */}
    <Block>
      <p>find impressive and interesting books around the globe</p>
    </Block>

    <BlockTitle>Fuctions</BlockTitle>
    <Block className='grid grid-cols-2 grid-gap'>
      <Button fill onClick={() => {
        BookViewContent.setRandomBookContent();
        // open book view page
        f7.views.main.router.navigate('/book-view/');
      }}
      >get random book</Button>
      <Button fill popupOpen="#book-search">search a book</Button>
    </Block>
  </Page>
);
export default HomePage;