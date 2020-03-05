export default class LinkData {
  public path: string;
  public text: string;
  public isActive: boolean;

  constructor(path: string = "", text: string = "", isActive: boolean = false) {
    this.path = path;
    this.text = text;
    this.isActive = isActive;
  }
}
