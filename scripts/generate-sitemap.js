const { SitemapStream, streamToPromise } = require('sitemap');
    const { createWriteStream } = require('fs');
    const axios = require('axios');

    (async () => {
      const smStream = new SitemapStream({ hostname: 'https://caninecompass.site' });

      const writeStream = createWriteStream('./public/sitemap.xml');
      smStream.pipe(writeStream);

      // Add static pages
      smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
      smStream.write({ url: '/about', changefreq: 'weekly', priority: 0.8 });

      // Add dynamic breed pages
      const breeds = await axios.get('https://api.thedogapi.com/v1/breeds');
      breeds.data.forEach(breed => {
        smStream.write({
          url: `/breeds/${breed.id}`,
          changefreq: 'weekly',
          priority: 0.7
        });
      });

      smStream.end();
      await streamToPromise(smStream);
    })();
