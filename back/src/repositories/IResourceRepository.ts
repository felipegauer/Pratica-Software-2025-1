export abstract class IResourceRepository {
  abstract findAll(): Promise<any>;
}
