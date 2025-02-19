import { makeObservable, override } from "mobx";
import {
  getReferalProfiles,
  ReferalProfileContract,
} from "../services/ReferalService";
import ListStore from "./ListStore";

class FriendListStore extends ListStore<ReferalProfileContract> {
  constructor(initData: string) {
    super(initData);
    makeObservable(this, {
      items: override,
      loading: override,
      offset: override,
      hasMore: override,
      fetchNewItems: override,
    });
  }

  protected async _fetchItems(limit: number, offset: number) {
    console.log(this);
    return await getReferalProfiles(this.initData, limit, offset);
  }
}

export default FriendListStore;
