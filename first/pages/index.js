import Header from "../components/header";
import withMui from "../shared/mui/withMui";
import 'isomorphic-fetch';
import {Card, CardHeader, CardText, RaisedButton} from 'material-ui';
import Link from 'next/link';

// Adding stylig to link is made by stylin <a> inside link in next
const Index = ({posts}) => {
  return (
    <div>
      <style jsx>
        {`
          .post-link {
            color: white;
          }
        `}
      </style>
      <Header/>
      {
        posts.map(post => {
          return (
            <Card key={post.id}>
              <CardHeader title={post.title}/>
              <CardText>
                <RaisedButton primary>
                  <Link href={`/post?id=${post.id}`} as={`/post?id=${post.id}`}>
                    <a className="post-link" style={{
                      textDecoration: 'none',
                      fontSize: '22px',
                    }}>
                      Click here to view
                    </a>
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