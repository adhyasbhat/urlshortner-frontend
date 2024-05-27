import React, { useState, useEffect,useRef } from 'react';
import logo from '../../assets/Images/url-logo.png';
import copy from '../../assets/Images/copy.png';
import cut from '../../assets/Images/cut.png';
import './dashboard.css';

function Dashboard() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [urlName, setUrlName] = useState('');
  const [error, setError] = useState('');
  const [urlHistory, setUrlHistory] = useState([]);

  useEffect(() => {
    fetchUrlHistory();
  }, []);

  async function fetchUrlHistory() {
    try {
      const response = await fetch('http://localhost:5000/urls');
      const data = await response.json();
      setUrlHistory(data);
    } catch (error) {
      console.error('Error fetching URL history:', error);
    }
  }

  async function getShortURL() {
    console.log('longUrl', longUrl);
    if (!longUrl.trim()) {
      setError('Please enter a valid URL.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ long_url: longUrl, url_name: urlName }),
      });
      const data = await response.json();
      console.log(data);
      setShortUrl(data.short_url);
      setError('');
      fetchUrlHistory();  // Refresh URL history after shortening a new URL
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while shortening the URL.');
    }
  }
  const textRef = useRef(null);

  const copyText = () => {
    const textToCopy = textRef.current.innerText;
    navigator.clipboard.writeText(textToCopy)
      .then(() => alert('Text copied to clipboard'))
      .catch(error => console.error('Error copying text:', error));
  };
  return (
    <>
      <div className="d-flex m-2">
        <div className="logo">
          <img src={logo} className="logoIcon" alt="Logo" />
        </div>
        <div className="heading d-flex justify-content-center">
          Shorty Link
        </div>
      </div>
      <div className="d-grid justify-content-center">
        <div className="urlDetails d-flex justify-content-center">
          <div>
            <div className="d-flex m-2">
              <div>
                <input
                  type="text"
                  placeholder="Enter URL name (Optional)"
                  className="urlName p-2"
                  value={urlName}
                  onChange={(e) => setUrlName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter URL here"
                  className="url p-2 mx-2"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                />
              </div>
              <div className="cut">
                <img
                  src={cut}
                  alt="Cut"
                  className="cutIcon p-2"
                  onClick={getShortURL}
                />
              </div>
            </div>
            <div className="shortenURL d-flex m-2">
              <div className="shortURLValue me-1">
                <a href={shortUrl} target="_blank" rel="noopener noreferrer" ref={textRef}>
                  {shortUrl}
                </a>
              </div>
              <div className="copy ms-1">
                <img src={copy} alt="Copy" className="copyIcon p-2"onClick={copyText} />
              </div>
            </div>
          </div>
        </div>
        <div className="prevUrl">
          <div className="text-center m-2 heading2">
            Recently Shortened URLs
          </div>
          <div className="urlHistory">
            {urlHistory.map((url, index) => (
              <div key={index} className="urlItem m-3 p-2">
                <div className='url_name'>{url.url_name || 'No Name'}</div>
                <div className='short_url'>
                  <a href={url.short_url} target="_blank" rel="noopener noreferrer">
                    {url.short_url}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
