const _ = require("lodash");

let memoized = (exports.blogSearch = async (req, res) => {
  const query = req.query.query;
  if (!query)
    return res
      .status(400)
      .json({ error: 'Query parameter "query" is required.' });

  try {
    let response = await fetch(
      "https://intent-kit-16.hasura.app/api/rest/blogs",
      {
        headers: {
          "x-hasura-admin-secret":
            "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Response failed");
    }
    let data = await response.json();
    let json = data.blogs;

    // Search method without memoization...

    /* const searchResults = _.filter(json, (item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    if (searchResults.length == 0) { 
      return res.json({response:'No result found'})
    }
    res.json(searchResults); */


    // Search method with memoization...
    const memoizedSearchResults = _.memoize((data) => {
      return _.filter(json, (item) =>
        item.title.toLowerCase().includes(data.toLowerCase())
      );
    });

    const results = memoizedSearchResults(query)
    res.locals.cachedata = results;
    res.json(res.locals.cachedata);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
