export enum MediaTypeKey {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}

export class Media {
  protected constructor(
    protected readonly url: string,
    protected readonly type: MediaTypeKey,
    private createdAt: Date = new Date(),
    private updatedAt: Date = new Date(),
  ) {
    if (!Media.isValidHttpUrl(url)) {
      throw new Error("Invalid URL. Must start with http:// or https://");
    }
  }

  protected static isValidHttpUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  }

  getUrl() {
    return this.url;
  }

  getType() {
    return this.type;
  }
}

export class VideoMedia extends Media {
  private constructor(url: string) {
    super(url, MediaTypeKey.VIDEO);
  }

  static create(props: { url: string }): VideoMedia {
    return new VideoMedia(props.url);
  }
}

export class ImageMedia extends Media {
  private constructor(url: string) {
    super(url, MediaTypeKey.IMAGE);
  }

  static create(props: { url: string }): ImageMedia {
    return new ImageMedia(props.url);
  }
}
