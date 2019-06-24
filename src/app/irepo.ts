export interface IRepo {
id: number;
name: string;
description: string;
}

export class repo implements IRepo{
  private _description: string;
  private _id: number;
  private _name: string;

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
