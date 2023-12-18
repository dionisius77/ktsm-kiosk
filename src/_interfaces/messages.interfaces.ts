export enum ContentType {
  Text = "Text",
  Audio = "Audio",
  Video = "Video",
}

export interface MessageFirestore {
  id: string;
  title: string;
  branchId: string;
  contentType: ContentType;
  content: string;
  createdAt: Date;
}
