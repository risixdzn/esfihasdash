import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

const useGetPessoas = (user) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPessoas, setShowPessoas] = useState([]);

  useEffect(() => {
    const getPessoasFromFirebase = async () => {
      setIsLoading(true);
      const pessoasCollection = collection(db, "users", user.uid, "pessoas");
      const pessoasSnapshot = await getDocs(pessoasCollection);
      const pessoasList = pessoasSnapshot.docs.map((doc) => ({
        ...doc.data(),
        key: doc.id,
      }));
      setShowPessoas(pessoasList);
      setIsLoading(false);
    };

    getPessoasFromFirebase();
  }, [user.uid]);

  return { isLoading, showPessoas };
};

export default useGetPessoas;