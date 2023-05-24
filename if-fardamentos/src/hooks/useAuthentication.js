import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';

// Configurar o Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBaVaR8z-RiYokLkJ8iq8VtRYbb19LV7OA",
  authDomain: "if-fardamentos.firebaseapp.com",
  projectId: "if-fardamentos",
  storageBucket: "if-fardamentos.appspot.com",
  messagingSenderId: "971797136474",
  appId: "1:971797136474:web:afb94ab1e409cfb9a50463"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // cleanup
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  // register
  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName
      });

      setLoading(false);
      return user;
    } catch (error) {
      console.log(error.message);

      let systemErrorMessage;

      if (error.message.includes('Password')) {
        systemErrorMessage = 'A senha precisa conter ao menos 6 caracteres.';
      } else if (error.message.includes('email-already')) {
        systemErrorMessage = 'E-mail já cadastrado.';
      } else {
        systemErrorMessage = 'Ocorreu um erro, tente novamente mais tarde.';
      }

      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  // logout - sign out
  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  // login - sign in
  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage;
      if (error.message.includes('user-not-found')) {
        systemErrorMessage = 'Usuário não encontrado.';
      } else if (error.message.includes('wrong-password')) {
        systemErrorMessage = 'Senha incorreta.';
      } else {
        systemErrorMessage = 'Ocorreu um erro, tente novamente mais tarde.';
      }

      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login
  };
};