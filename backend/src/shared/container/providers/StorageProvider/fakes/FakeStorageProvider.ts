import IStorageProvider from '../models/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
  private strorage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.strorage.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.strorage.findIndex(
      storageFile => storageFile === file,
    );

    this.strorage.splice(findIndex, 1);
  }
}
