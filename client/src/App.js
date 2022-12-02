import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UpdatePost from './components/UpdatePost';
import NewPost from './components/NewPost';
import AllPosts from './components/AllPosts';
import Error from './components/Error';
import LoginRegister from './components/LoginRegister';
import './App.css';

const App = () => {
  
  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact render={() => <LoginRegister />} />
          <Route path="/" exact render={() => <AllPosts />} />
          <Route path="/new" render={() => <NewPost />} />
          <Route path="/post/edit/:id" render={(pathParams) => <UpdatePost {...pathParams} />} />
          <Route path="/error" render={() => <Error />} />
          <Route path="*" render={() => <Error />} />
        </Switch>
      </BrowserRouter>
    </div>
  )

}


export default App;
