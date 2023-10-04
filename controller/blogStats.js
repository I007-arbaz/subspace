const _ = require("lodash");

exports.blogstats = async (req, res) => {
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
      throw new Error("Request failed");
    }

    let data = await response.json();

    let json = data.blogs;

    //longest title
    const longestTitle = _.memoize(() =>
      _.maxBy(json, (item) => item.title.length)
    );

    let longestTitleResult = longestTitle()
    if (!longestTitleResult) throw new Error("error fetching longest title");
    // contain privacy
    const titlesContainingPrivacy = _.memoize(() =>
      _.filter(json, (item) => item.title.toLowerCase().includes("privacy"))
    );
    let titlesContainingPrivacyResult = titlesContainingPrivacy()
    if (!titlesContainingPrivacyResult) {
      throw new Error("error fetching privacy titles");
    }
    //unique titles
    const lowercasedData = _.map(json, (item) => ({
      ...item,
      title: item.title.toLowerCase(),
    }));
    const uniqueTitles = _.memoize(() =>
      _.uniqBy(_.map(lowercasedData, "title"))
    );
    let uniqueTitlesResult = uniqueTitles();
    if (!uniqueTitlesResult) throw new Error("error fetching unique titles");
    const object = {};
    object["No. of blogs"] = json.length;
    object["Longest title"] = longestTitleResult.title;
    object["No. of title containing privacy"] = titlesContainingPrivacyResult.length;
    object["Unique blog title"] = uniqueTitlesResult;
    res.json(object);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
