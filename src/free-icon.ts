class FreeIcon {
  public path: string[];
  public svgGroup: string;
  public scale = 1; // scale factor to make it look good in Icon Builder
  public constructor(path: string[], svgGroup: string, scale = 1) {
    this.path = path;
    this.svgGroup = svgGroup;
    this.scale = scale;
  }
}

export default FreeIcon;
