import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/get')
      .then(res => res.json())
      .then(data => setTopics(data.topics))
      .catch(err => console.log(err));
  }, []);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const topicName = formData.get('topicName') as string;
    const postName = formData.get('postName') as string;
    const text = formData.get('text') as string;
    const wikipediaArticle = formData.get('wikipediaArticle') as string;
    const timestamp = new Date().toISOString();

    const res = await fetch('http://localhost:3000/save', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({topicName, postName, text, wikipediaArticle, timestamp})
    });
    
    if(res.ok){
      const data = await res.json();
      alert(data.message);
      fetch('http://localhost:3000/get')
      .then(res => res.json())
      .then(data => setTopics(data.topics))
      .catch(err => console.log(err));

    }else {
      alert('Failed to save post');
    }

  }


  return (
    <>
      <h1>Create a post</h1>
        <form className="post-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="topicName">Topic Name:</label>
            <input type="text" id="topicName" name="topicName" required />
          </div>
          <div className="form-group">
            <label htmlFor="postName">Post Name:</label>
            <input type="text" id="postName" name="postName" required />
          </div>
          <div className="form-group">
            <label htmlFor="text">Text:</label>
            <textarea id="text" name="text" required></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="wikipediaArticle">Add a wikipedia article based on a keyword:</label>
            <textarea id="text" name="wikipediaArticle" required></textarea>
          </div>
          
          <input type="submit" value="Submit" />
      </form>


      <h1>Topics</h1>
      {topics.map((topic: any) => (
        <div key={topic._id}>
          <h2>{topic.name}</h2>
          <div className="posts-grid">
            {topic.posts.map((post: any) => (
              <div key={post._id} className="post">
                <h3>{post.name}</h3>
                <p className='postContent'>{post.text}</p>
                <p className='postContent'>{post.wikipediaArticle}</p>
                <p>{new Date(post.timestamp).toLocaleString()}</p>

              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default App
