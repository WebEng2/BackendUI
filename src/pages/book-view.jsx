import React, { useState } from 'react';
import {
  Page,
  Navbar,
  Toolbar,
  Link,
  Block,
  BlockTitle,
  Button,
  f7
} from 'framework7-react';
import BookViewContent from '../js/bookViewContent';

function BookView() {
  const [bookContent, setBookContent] = useState(BookViewContent.getCurrentBookContent());

  BookViewContent.addContentChangeListener(() => {
    setBookContent(BookViewContent.getCurrentBookContent());
  });

  const getRandomBook = () => {
    BookViewContent.setRandomBookContent();
  };

  return (
        <Page name="home">
        {/* Top Navbar */}
        <Navbar title="Book view" backLink="Back" />
        
        {/* Toolbar */}
            <Toolbar bottom>
            <Link onClick={() => f7.views.main.router.navigate('/about/')}>About</Link>
            </Toolbar>
        {/* Page content */}
        <BlockTitle>Book</BlockTitle>
        <Block className='grid grid-cols-2 grid-gap'>
            {/* Check for every book Content if it is set (title, isbn, description, authors, publishedDate, pageCount, language, categories) */}
            {bookContent ?
            <>
                {bookContent.title ? <p>{bookContent.title}</p> : <p>no title</p>}
                {bookContent.isbn ? <p>{bookContent.isbn}</p> : <p>no isbn</p>}
                {bookContent.description ? <p>{bookContent.description}</p> : <p>no description</p>}
                {bookContent.authors ? <p>{bookContent.authors}</p> : <p>no authors</p>}
                {bookContent.publishedDate ? <p>{bookContent.publishedDate}</p> : <p>no publishedDate</p>}
                {bookContent.pageCount ? <p>{bookContent.pageCount}</p> : <p>no pageCount</p>}
                {bookContent.language ? <p>{bookContent.language}</p> : <p>no language</p>}
                {bookContent.categories ? <p>{bookContent.categories}</p> : <p>no categories</p>}
            </> : <p>no book content</p>
            }
        </Block>

        <BlockTitle>Functions</BlockTitle>
        <Block className='grid grid-cols-2 grid-gap'>
            <Button fill onClick={getRandomBook}>get random book</Button>
            <Button fill popupOpen="#book-search">search a book</Button>
        </Block>
        </Page>
    );
}

export default BookView;