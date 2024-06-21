import { useState } from 'react';
import useRequest from './hooks/useRequest';
function App() {
  const [url, setUrl] = useState('https://react.dev');
  const [data, isLoading, isSuccess, error] = useRequest(url);

  const ShowData = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error !== null) {
      return <div>{error}</div>;
    }
    if (isSuccess) {
      return <div>{data}</div>;
    } else {
      return <div>Failed to fetch {url}</div>;
    }
  };

  return (
    <div>
      <h1>useRequest() hook</h1>
      <div>
        <input
          type='text'
          name='url'
          id='url'
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
      <div>
        <h1>Data</h1>
        <ShowData />
      </div>
    </div>
  );
}

export default App;
