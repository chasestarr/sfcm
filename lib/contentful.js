import * as contentful from 'contentful';
import * as sdk from 'contentful-management';

export function createClient() {
  return contentful.createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  });
}

// definitely unsafe practice to forward these values to
// the frontend... but have not looked into setting up a
// server route yet
export function getConfig() {
  return {
    s: process.env.SPACE_ID,
    t: process.env.ACCESS_TOKEN,
  };
}

// export function uploadFile(s, t, file) {
//   const url = `https://upload.contentful.com/spaces/${s}/uploads`;
//   return fetch(url, {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${t}`,
//       'Content-Type': 'application/octet-stream',
//     },
//     body: file,
//   });
// }

export function uploadFile(s, t, file) {
  const client = sdk.createClient({
    // space: s,
    accessToken: t,
  });

  return client.getSpace(s).then(space => {
    console.log('uploading...');
    return space
      .createUpload({
        file: file,
        contentType: file.type,
        name: file.name,
      })
      .then(upload => {
        console.log('creating asset...');
        return space
          .createAsset({
            fields: {
              title: {
                'en-US': fileName,
              },
              file: {
                'en-US': {
                  fileName: fileName,
                  contentType: contentType,
                  uploadFrom: {
                    sys: {
                      type: 'Link',
                      linkType: 'Upload',
                      id: upload.sys.id,
                    },
                  },
                },
              },
            },
          })
          .then(asset => {
            console.log('prcessing...');
            return asset.processForLocale('en-US', { processingCheckWait: 2000 });
          })
          .then(asset => {
            console.log('publishing...');
            return asset.publish();
          })
          .then(asset => {
            console.log(asset);
            return asset;
          });
      })
      .catch(err => {
        console.log(err);
      });
  });
}
