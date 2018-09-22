import Header from "../components/header";
import withMui from "../shared/mui/withMui";
import 'isomorphic-fetch';
import {Card, CardHeader, CardText, RaisedButton} from 'material-ui';
import Link from 'next/link';

const Post = ({post}) => {
  return (
    <div>
      <Header/>
      <Card>
        <CardHeader title={post.title}/>
        <CardText>
          <div>
            {post.content}
          </div>
          <RaisedButton primary>
            <Link href={`/`} as={`/blog`}>
              <a>
                go back
              </a>
            </Link>
          </RaisedButton>
        </CardText>
      </Card>
    </div>
  );
};

Post.getInitialProps = async ({query: {id}}) => {
  const response = await fetch(`${process.env.BLOGGER_URL}/posts/${id}?key=${process.env.API_KEY}`);
  const post = await response.json();
  return {post}
}

export default withMui(Post);