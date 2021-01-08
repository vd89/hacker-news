import Axios from 'axios';
import { Component } from 'react';
import Error from 'next/error';
import StoryList from '../Components/StoryList';
import Layout from '../Components/Layout';
import Link from 'next/link';

export default class index extends Component {
  static async getInitialProps({ req, res, query }) {
    let stories;
    let page;
    console.log(query);
    try {
      page = Number(query.page) || 1;
      const res = await Axios.get(`https://node-hnapi.herokuapp.com/news?page=${page}`);
      stories = res.data;
    } catch (error) {
      console.log(error);
      stories = [];
    }
    return { stories, page };
  }
  render() {
    const { stories, page } = this.props;
    if (stories.length === 0) {
      return <Error statusCode={503} />;
    }
    return (
      <Layout title='Hacker Next.js' description='The hacker next project with Next.js'>
        <StoryList stories={stories} />
        <footer>
          <Link href={`/?page=${page + 1}`}>
            <a>Next Page ({page + 1}) </a>
          </Link>
        </footer>
        <style jsx>
          {`
            footer {
              padding: 1em;
            }
            footer a {
              font-size: 1rem;
              font-weight: bold;
              text-decoration: none;
              color: black;
            }
            footer a:hover {
              text-decoration: underline;
            }
          `}
        </style>
      </Layout>
    );
  }
}
