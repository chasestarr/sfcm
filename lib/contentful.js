import * as contentful from 'contentful';

export function createClient() {
  return contentful.createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  });
}
