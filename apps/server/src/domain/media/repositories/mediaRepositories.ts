import { Media } from "../entities/media";

export interface MediaRepository {
  deleteById(id: string): Promise<void>;
  update(url: string, type: number): Promise<Media>;
  save(media: Media): Promise<Media>;
}
