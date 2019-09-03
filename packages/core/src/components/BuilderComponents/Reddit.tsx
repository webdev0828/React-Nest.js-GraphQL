export class Reddit {
  public best() {
    return this.fetch(
      this.redditUrl({
        resource: 'best',
      }),
    );
  }

  public redditUrl(on) {
    let url = 'https://www.reddit.com/';
    if (on.subreddit !== undefined) {
      url += `/${on.subreddit}/`;
    }
    url += `${on.resource}.json`;
    const qs: any[] = [];
    if (on.params) {
      Object.keys(on.params).map(param => {
        if (on.params.hasOwnProperty(param)) {
          qs.push(
            `${encodeURIComponent(param)}=${encodeURIComponent(
              on.params[param],
            )}`,
          );
        }
      });
      url += `?${qs.join('&')}`;
    }
    return url;
  }

  public fetch(url: any) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const response = data.data.children;
        console.log(response);
        return response;
      });
  }
}

export default Reddit;
