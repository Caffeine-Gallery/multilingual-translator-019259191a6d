export const idlFactory = ({ IDL }) => {
  const Translation = IDL.Record({
    'translated' : IDL.Text,
    'language' : IDL.Text,
    'original' : IDL.Text,
  });
  return IDL.Service({
    'addTranslation' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [], []),
    'getTranslations' : IDL.Func([], [IDL.Vec(Translation)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
