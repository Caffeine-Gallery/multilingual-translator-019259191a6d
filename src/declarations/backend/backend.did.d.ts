import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Translation {
  'translated' : string,
  'language' : string,
  'original' : string,
}
export interface _SERVICE {
  'addTranslation' : ActorMethod<[string, string, string], undefined>,
  'getTranslations' : ActorMethod<[], Array<Translation>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
