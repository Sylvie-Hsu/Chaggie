import Home from "./pages/Home";
import Flow from "./pages/Flow";
import Item from "./pages/Item";
import Post from "./pages/Post";

export default [
  { path: "/", component: Home },
  { path: "/flow/:data", component: Flow },
  { path: "/post", component: Post },
  { path: "/item/:id", component: Item }
];
