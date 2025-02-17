import { createClient } from 'contentful';

export const contentfulClient = createClient({
    space: process.env.GATSBY_CONTENTFUL_SPACE_ID,
    accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
  });
  
