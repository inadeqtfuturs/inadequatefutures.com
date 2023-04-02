async function getGithubRepoInfo(user, selectRepositories = []) {
  if (!user) return null;

  const repositories = await fetch(
    `https://api.github.com/users/${user}/repos`,
    {
      headers: {
        'Authorization': `token ${process.env.GH_TOKEN}`
      }
    }
  )
    .then(resp => resp.json())
    .then(resp => {
      if (resp.message) throw Error;
      if (selectRepositories.length === 0) {
        return resp;
      }
      return resp.filter(r => selectRepositories.includes(r.name));
    })
    .catch(error => {
      throw new Error(error);
    });

  if (!repositories || repositories.length === 0) return null;

  const repositoryInfo = await Promise.all(
    repositories.map(async r => {
      const url = r?.url;
      const { names } = await fetch(
        `${url}/topics`,
        {
          headers: {
            'Accept': 'application/vnd.github.mercy-preview+json',
            'Authorization': `token ${process.env.GH_TOKEN}`
          }
        }
      ).then(resp => resp.json());

      return {
        ...r,
        topics: names
      };
    })
  );

  return repositoryInfo;
}

export default getGithubRepoInfo;
