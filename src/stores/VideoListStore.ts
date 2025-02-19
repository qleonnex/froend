import ListStore from "./ListStore";
import { getUserVideos, VideoContract } from "../services/VideoService";

class VideoListStore extends ListStore<VideoContract> {
  constructor(initData: string) {
    super(initData);
  }

  protected async _fetchItems(limit: number, offset: number) {
    return await getUserVideos(this.initData, limit, offset);
  }
}

export default VideoListStore;
