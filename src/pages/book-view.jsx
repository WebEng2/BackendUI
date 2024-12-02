import React, { useState, useEffect, useRef } from 'react';
import {
  Page,
  Navbar,
  Toolbar,
  Link,
  Block,
  BlockTitle,
  Button,
  f7,
  Card,
  CardContent,
  CardHeader,
  CardFooter
} from 'framework7-react';
import BookViewContent from '../js/bookViewContent';
import { apiGet_searchLibrariesForISBN } from '../js/apiCalls';

function BookView() {
  const [bookContent, setBookContent] = useState(BookViewContent.getCurrentBookContent());
  const [loading, setLoading] = useState(true);
  const [averageColor, setAverageColor] = useState('#f0f0f0');
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const imageRef = useRef(null);

  const [library, setLibrary] = useState([]);

  useEffect(() => {
    if (bookContent && bookContent.isbn) {
      apiGet_searchLibrariesForISBN(bookContent.isbn, (data) => {
        if (data) {
          setLibrary(data.content);
        } else {
          setLibrary([]);
        }
      });
    }
  }, [bookContent]);


  const getAverageColorFallback = () => {
    const colorPalettes = {
      fiction: ['#3E4462', '#6B5B95', '#88B04B'],
      nonfiction: ['#F7786B', '#92A8D1', '#F7CAC9'],
      default: ['#E0E0E0', '#C0C0C0', '#A0A0A0']
    };

    const palette = colorPalettes.default;
    return palette[Math.floor(Math.random() * palette.length)];
  };

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let r = 0, g = 0, b = 0;
        const pixelCount = data.length / 4;

        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }

        r = Math.floor(r / pixelCount);
        g = Math.floor(g / pixelCount);
        b = Math.floor(b / pixelCount);

        setAverageColor(`rgb(${r},${g},${b})`);
      } catch (error) {
        console.warn('Could not extract color, using fallback', error);
        setAverageColor(getAverageColorFallback());
      }
    };

    img.onerror = () => {
      console.warn('Image load failed, using fallback color');
      setAverageColor(getAverageColorFallback());
    };

    const coverImage = bookContent?.coverUrls?.large ||
      bookContent?.coverUrls?.medium ||
      bookContent?.coverUrls?.small ||
      '/images/default_cover.png';

    img.src = coverImage;
  }, [bookContent]);

  BookViewContent.addContentChangeListener(() => {
    setBookContent(BookViewContent.getCurrentBookContent());
    setLoading(false);
  });

  const getRandomBook = () => {
    setLoading(true);
    BookViewContent.setRandomBookContent();
  };

  const fallbackImage = '/images/default_cover.png';
  const getCoverImage = () => {
    try {
      return bookContent.coverUrls
        ? (bookContent.coverUrls.large ||
          bookContent.coverUrls.medium ||
          bookContent.coverUrls.small ||
          bookContent.coverUrls[0] ||
          fallbackImage)
        : fallbackImage;
    } catch (error) {
      console.error('Error loading book cover:', error);
      return fallbackImage;
    }
  };

  const handleCardToggle = (expanded) => {
    setIsCardExpanded(expanded);
  };

  return (
    <Page name="home">
      <Navbar title="Book view" backLink="Back" />
      <Toolbar bottom>
        <Link onClick={() => f7.views.main.router.navigate('/about/')}>About</Link>
      </Toolbar>

      <BlockTitle>
        {bookContent ?
          <>{bookContent.title ? bookContent.title : 'no book title available'}</>
          : 'book is loading'}
      </BlockTitle>

      {bookContent ? (
        <Card
          expandable
          onCardOpen={() => handleCardToggle(true)}
          onCardClose={() => handleCardToggle(false)}
        >
          <CardContent padding={false}>
            <div
              style={{
                backgroundColor: averageColor,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${getCoverImage()})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  maxWidth: '100%',
                  maxHeight: isCardExpanded ? '400px' : '220px',
                  width: '100%',
                  height: isCardExpanded ? '400px' : '220px',
                  transition: 'all 0.3s ease-in-out'
                }}
              />
            </div>

            <Link
              cardClose
              color="white"
              className="card-opened-fade-in"
              style={{ position: 'absolute', right: '15px', top: '15px' }}
              iconF7="xmark_circle_fill"
            />

            <CardHeader style={{ paddingTop: 0, marginTop: 10 }}>
              <Block>
                <div>
                  {bookContent.title ? <>{bookContent.title}</> : <>no title available</>}
                </div>
                <div style={{ fontSize: '0.7em', color: 'gray' }}>
                  {bookContent.authors}
                </div>
              </Block>
            </CardHeader>

            {bookContent.isbn && (
              <Block style={{ fontSize: '1.1em', paddingBottom: '5', marginBottom: '15' }}>
                <Block>
                  <div>ISBN</div>
                  <div style={{ fontSize: '0.8em', color: 'gray' }}>{bookContent.isbn}</div>
                </Block>
                <br />
              </Block>
            )}
            {bookContent.description && (
              <Block style={{ fontSize: '1.1em', paddingBottom: '5', marginBottom: '15' }}>
                <Block>
                  <div>Description</div>
                  <div style={{ fontSize: '0.8em', color: 'gray' }}>{bookContent.description}</div>
                </Block>
                <br />
              </Block>
            )}
            {bookContent.publishDate && (
              <Block style={{ fontSize: '1.1em', paddingBottom: '5', marginBottom: '15' }}>
                <Block>
                  <div>Published</div>
                  <div style={{ fontSize: '0.8em', color: 'gray' }}>{bookContent.publishDate}</div>
                </Block>
                <br />
              </Block>
            )}
            {bookContent.publisher && (
              <Block style={{ fontSize: '1.1em', paddingBottom: '5', marginBottom: '15' }}>
                <Block>
                  <div>Publisher</div>
                  <div style={{ fontSize: '0.8em', color: 'gray' }}>{bookContent.publisher}</div>
                </Block>
                <br />
              </Block>
            )}
            {bookContent.pageCount > 0 && (
              <Block style={{ fontSize: '1.1em', paddingBottom: '5', marginBottom: '15' }}>
                <Block >
                  <div>Pages</div>
                  <div style={{ fontSize: '0.8em', color: 'gray' }}>{bookContent.pageCount}</div>
                </Block>
                <br />
              </Block>
            )}
            {bookContent.language && (
              <Block style={{ fontSize: '1.1em', paddingBottom: '5', marginBottom: '15' }}>
                <Block>
                  <div>Language</div>
                  <div style={{ fontSize: '0.8em', color: 'gray' }}>{bookContent.language}</div>
                </Block>
                <br />
              </Block>
            )}
            {library && library.length > 0 && (
              <Block style={{ fontSize: '1.1em', paddingBottom: '5', marginBottom: '15' }}>
                <Block>
                  <div>Libraries</div>
                  <div style={{ fontSize: '0.8em', color: 'gray' }}>
                    {library.map((lib, index) => (
                      <div key={index}>{lib.name} - {parseFloat(lib.distance.toFixed(1))}km</div>
                    ))}
                  </div>
                </Block>
                <br />
              </Block>
            )}
            {isCardExpanded && (
              <Block style={{ fontSize: '1.1em', paddingBottom: '5', marginBottom: '15' }}>
                <Button fill round large cardClose>
                  Close
                </Button>
                <br />
              </Block>
            )}

          </CardContent>
        </Card>
      ) : (
        <p>book is loading</p>
      )}

      <BlockTitle>More</BlockTitle>
      <Block className='grid grid-cols-2 grid-gap'>
        <Button
          fill
          onClick={getRandomBook}
          preloader={true}
          loading={loading}
          preloaderColor='black'
          tonal={loading}
        >
          get random book
        </Button>
        <Button
          fill
          popupOpen="#book-search"
          preloader={true}
          loading={loading}
          preloaderColor='black'
          tonal={loading}
        >
          search a book
        </Button>
      </Block>
    </Page>
  );
}

export default BookView;