import { atom } from "recoil";

export const playState = atom({
  key: "playState",
  default: false,
});

export const currentTrackState = atom({
  key: "currentTrackState",
  default: "",
});
