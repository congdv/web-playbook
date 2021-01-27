# Redux + React + Webpack

## Why React?

Traditionally, to display the web app, the client will request to server and server will calculate and render the web interface and then return it to client. So, every time you change the web page, the client need to request to server and to get the updated interface based on your action on the client.

The issue on this way is user experience because the user expected to happen immediately.

With React, you can create single page web app that client need to load the resource for render the interface once time and make the web app dynamic. The issue comes up is how to keep track the data that was from server. The thing that we called keep track data in the client is actually handle the state in web app. when you get the update data, the coder expected the React will calculate the virtual dom and change it into the browser dom.


The change of subtree will be very fast because React use Js for rendering the virtual dom.

## Webpack
File loader limit

```
In the conf above file-loader is breaking url-loader behavior (probably because I don't clearly specify the output folder) Am I understanding it well ?
When defining both loaders you will have the behaviour of both, which is to encode all files in-place into base64 strings when their size is < 10000 bytes AND to copy all of them into your distribution directory.

You were right to remove the file-loader loader declaration if the behaviour you want is you want is to either encode as base64 when size < 10000 bytes OR copy to distribution folder when size > 10000 bytes.

Because url-loader has a fallback option, and it's default value is file-loader, the second file-loader declaration is unnecessary IF the files being targeted are the same for each loader.

what are the cases you really need file-loader ?
Whenever you want to copy a file to your dist directory and have reference to this file's location in the public path (where static assets will be served from; the publicPath webpack conf. property) within your bundled application. For example if you configured file-loader to copy images and name them as [hash].[ext] you can do:

const img = require('avatar.jpg')
console.log(img) // => /public/[hash].jpg
what are the cases when it's good to do a combination of both (if any) ?
Use both if you have files you always want to copy (file-loader) and files that you may want to encode into your bundle files (url-loader). Be careful not to target the same file types with both loaders, otherwise you may be copying files over that are also being encoded into your bundles with url-loader.

```

## References
https://www.youtube.com/watch?v=fZKaq623y38

https://stackoverflow.com/questions/55159548/is-there-any-reason-to-use-file-loader-when-using-url-loader-with-limit-option

https://canny.io/