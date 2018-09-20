import Header from "../components/header";
import withMui from "../shared/mui/withMui";
import 'isomorphic-fetch';
import {Card, CardHeader, CardText, RaisedButton} from 'material-ui';
import Link from 'next/link';

const Index = ({posts}) => {
  return (
    <div>
      <Header/>
      {
        posts.map(post => {
          return (
            <Card key={post.id}>
              <CardHeader title={post.title}/>
              <CardText>
                <RaisedButton fullWidth primary>
                  <Link href={`/post?id=${post.id}`} as={`/post?id=${post.id}`}>
                      Click here to view
                  </Link>
                </RaisedButton>
              </CardText>
            </Card>
          )
        })
      }
    </div>
  );
};

Index.getInitialProps = async () => {
  const response = await fetch(`${process.env.BLOGGER_URL}/posts?key=${process.env.API_KEY}`);
  const data = await response.json();
  return {posts: data.items}
}

export default withMui(Index);