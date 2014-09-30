[git-orm](https://github.com/GitStarInc/git-orm) driver for
[nodegit-http](https://github.com/GitStarInc/nodegit-http) HTTP-server
APIs.  By setting the right headers, you can also read from GitHub's
API servers.

### Usage

```javascript
var driver = require('git-orm-nodegit-http')('http://localhost:3000/');
var git  = require('git-orm');
var Repo = git.Repo(driver);

// ... See git-orm's documentation for how to use the ORM

```

### Passing headers

The constructor also takes a options argument, which can be used to
not only set the URL, but some desired headers:

```javascript
var driver = require('git-orm-nodegit-http')({ url: 'https://api.github.com/'
                                             , headers: {'If-None-Match' : ... });
```
