import { supabase } from '../../supabase';

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function signup({ email, password, username }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        avatar: '',
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData?.session;

  if (!session) return null;

  const { data: userData, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return userData?.user;
}

export async function updateCurrentUser({ password, username, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (username) updateData = { data: { username } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage.from('avatar').upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      username,
      avatar: `https://bzfcrikrctwhhocdbukt.supabase.co/storage/v1/object.public/avatar/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}
