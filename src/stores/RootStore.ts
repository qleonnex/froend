import FriendListStore from "./FriendListStore";
import UserInfoStore from "./UserInfoStore";
import VideoListStore from "./VideoListStore";

class RootStore {
  userStore: UserInfoStore;
  friendStore: FriendListStore;
  videoStore: VideoListStore;
  constructor(initData: string) {
    this.userStore = new UserInfoStore(initData);
    this.userStore.fetchAll();

    this.friendStore = new FriendListStore(initData);
    this.friendStore.fetchNewItems();

    this.videoStore = new VideoListStore(initData);
    this.videoStore.fetchNewItems();
  }
}

export default RootStore;
